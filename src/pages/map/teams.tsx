import Map, { mapClickEvent, mapCursorHover } from '../../components/map/Map';

import mapboxgl from 'mapbox-gl';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextMenu } from '../../components/ContextMenu';
import Page from '../../components/Page';
import { ClaimDrawer } from '../../components/map/ClaimDrawer';
import { MapContextMenu } from '../../components/map/MapContextMenu';
import fetcher from '../../utils/Fetcher';
import getCountryName from '../../utils/ISOCountries';

const MapPage: NextPage = ({ data }: any) => {
	const [opened, setOpened] = useState(false);
	const [state, setState, contextHandler] = useContextMenu({ disableEventPosition: false });
	const [clientPos, setClientPos] = useState<{ lat: number | null; lng: number | null }>({
		lat: null,
		lng: null,
	});
	const [selected, setSelected] = useState<null | string>(null);
	const [map, setMap] = useState<mapboxgl.Map>();
	const { t } = useTranslation('map');
	const router = useRouter();

	const locations: any = {};
	data?.forEach((element: any) =>
		!element.location.includes('glb')
			? element.location.split(', ').map(
					(part: any) =>
						(locations[part.toUpperCase()] = {
							location: getCountryName(part),
							team: element.name,
							tid: element.id,
							ip: element.ip,
							slug: element.slug,
						}),
			  )
			: null,
	);

	return (
		<Page fullWidth title="Map" description="Find the Buildteam building a specific country here.">
			<ClaimDrawer open={opened} setOpen={setOpened} id={selected} map={map} t={t} />

			<MapContextMenu
				contextMenuInfo={state}
				setContextMenuInfo={setState}
				oLat={clientPos.lat}
				oLng={clientPos.lng}
			/>
			<div style={{ height: '96vh', width: '100%', position: 'relative' }}>
				<Map
					onContextMenu={contextHandler}
					themeControls={false}
					onMapLoaded={(map) => {
						setMap(map);

						const worldview = [
							'all',
							['==', ['get', 'disputed'], 'false'],
							['any', ['==', 'all', ['get', 'worldview']], ['in', 'US', ['get', 'worldview']]],
						];

						map.addSource('countries', {
							type: 'vector',
							url: 'mapbox://mapbox.country-boundaries-v1',
						});

						const fillColor = ['match', ['get', 'iso_3166_1']];

						data.forEach((d: any, i: number) => {
							const color = d.color;
							d.location.split(', ').forEach((l: string) => {
								if (l.length == 2 && !fillColor.some((c) => c == l.toUpperCase()))
									fillColor.push(l.toUpperCase(), color);
							});
						});

						fillColor.push('rgba(0, 0, 0, 0)');

						// Add a layer with boundary polygons
						map.addLayer(
							{
								id: 'countries-fill',
								type: 'fill',
								source: 'countries',
								'source-layer': 'country_boundaries',
								paint: {
									//@ts-ignore
									'fill-color': fillColor,
									'fill-opacity': 0.5,
								},
								filter: worldview,
							},
							'admin-1-boundary-bg',
						);

						map.on('mousemove', (e) => {
							setClientPos({ lat: e.lngLat.lat, lng: e.lngLat.lng });
						});

						map.on('mouseenter', 'countries-fill', () => {
							map.getCanvas().style.cursor = 'pointer';
						});

						map.on('mouseleave', 'countries-fill', () => {
							map.getCanvas().style.cursor = '';
						});

						mapClickEvent(map, 'countries-fill', (f) => {
							router.push(`/teams/${locations[f[0].properties.iso_3166_1]?.slug}`);
						});
					}}
					initialStyle={Number.parseInt(router.query.style as string)}
				/>
			</div>
		</Page>
	);
};

export default MapPage;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/buildteams');
	return {
		props: {
			data: res,
			...(await serverSideTranslations(locale, ['common', 'map'])),
		},
	};
}

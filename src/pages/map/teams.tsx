import Map, { mapClickEvent } from '@/components/map/Map';

import { MapContextMenu } from '@/components/map/MapContextMenu';
import { NextPage } from 'next';
import Page from '@/components/Page';
import fetcher from '@/utils/Fetcher';
import getCountryName from '@/utils/ISOCountries';
import mapboxgl from 'mapbox-gl';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useContextMenu } from '@/components/ContextMenu';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MapPage: NextPage = ({ data }: any) => {
	const [state, setState, contextHandler] = useContextMenu({ disableEventPosition: false });
	const [clientPos, setClientPos] = useState<{ lat: number | null; lng: number | null }>({
		lat: null,
		lng: null,
	});
	const [map, setMap] = useState<mapboxgl.Map>();
	const router = useRouter();

	const locations: any = {
		us: {
			location: getCountryName('us'),
			team: 'BTE USA',
			tid: '191c58d7-92ca-4c59-8227-e712f62d8b17',
			ip: 'west.nabte.net; south.nabte.net; midwest.nabte.net; ohpainky.nabte.net',
			slug: 'us',
		},
	};
	data
		?.sort((a: any, b: any) => {
			return a._count?.members - b._count?.members;
		})
		.forEach((element: any) =>
			!element.location.includes('glb') && !element.location.includes('us')
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
								if (l.length == 2 && l != 'us' && !fillColor.some((c) => c == l.toUpperCase()))
									fillColor.push(l.toUpperCase(), color);
							});
						});

						fillColor.push('US', '#9832c7');

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

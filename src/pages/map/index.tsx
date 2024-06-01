import { DynamicClaimDrawer, DynamicMap, DynamicMapContextMenu } from '@/components/dynamic/Map';
import { mapClickEvent, mapCursorHover } from '@/components/map/Map';
import { Button, Group, Loader, rem } from '@mantine/core';
import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconPin, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { useContextMenu } from '@/components/ContextMenu';
import Page from '@/components/Page';
import { searchInOSM } from '@/utils/Fetcher';
import { modals } from '@mantine/modals';
import mapboxgl from 'mapbox-gl';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const MapPage: NextPage = () => {
	const clipboard = useClipboard();
	const [opened, setOpened] = useState(false);
	const [state, setState, contextHandler] = useContextMenu({ disableEventPosition: false });
	const [clientPos, setClientPos] = useState<{ lat: number | null; lng: number | null }>({
		lat: null,
		lng: null,
	});
	const [query, setQuery] = useDebouncedState('', 200);
	const [searchActions, setSearchActions] = useState<any[]>([]);
	const [searchLoading, setSearchLoading] = useState(false);
	const [selected, setSelected] = useState<null | string>(null);
	const [map, setMap] = useState<mapboxgl.Map>();
	const { t } = useTranslation('map');
	const router = useRouter();

	useEffect(() => {
		if (
			/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
				router.query.claim as string,
			)
		) {
			setSelected(router.query.claim as string);
			setOpened(true);
		}
	}, [router.query.claim]);

	useEffect(() => {
		if (router.query.s) {
			spotlight.open();
			router.query.s = undefined;
		}
	}, [router.query.s, router.query]);

	useEffect(() => {
		if (!query) {
			setSearchActions([]);
		}

		const regexForCoords =
			/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
		if (regexForCoords.test(query)) {
			let coords = query
				.replace(' ', '')
				.split(',')
				.map((q) => parseFloat(q));
			setSearchActions([
				{
					label: 'Go to coordinates',
					description: query,
					onTrigger: () =>
						map?.flyTo({
							center: [coords[1], coords[0]],
							zoom: 15,
						}),
					leftSection: <IconPin />,
				},
			]);
			setSearchLoading(false);
			return;
		}

		searchInOSM(query, map).then((res) => {
			setSearchActions(res);
			setSearchLoading(false);
		});
	}, [query, map]);

	return (
		<Page
			fullWidth
			title="Map"
			description="Explore the progress that has been made in the BuildTheEarth Project."
			solidHeader
		>
			<DynamicClaimDrawer open={opened} setOpen={setOpened} id={selected} map={map} t={t} />
			<Spotlight
				filter={(query, actions) => actions}
				actions={searchActions}
				nothingFound="..."
				searchProps={{
					leftSection: searchLoading ? (
						<Loader size={'sm'} />
					) : (
						<IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
					),
					placeholder: 'Search...',
				}}
				onQueryChange={(q) => {
					if (!q || q.length <= 3) {
						setSearchActions([]);
						setSearchLoading(false);
					} else {
						setQuery(q);
						setSearchLoading(true);
					}
				}}
			/>
			<DynamicMapContextMenu
				contextMenuInfo={state}
				setContextMenuInfo={setState}
				oLat={clientPos.lat}
				oLng={clientPos.lng}
			/>
			<div style={{ height: '100vh', width: '100%', position: 'relative' }}>
				<DynamicMap
					src={`${process.env.NEXT_PUBLIC_API_URL}/claims/geojson?active=true`}
					onContextMenu={contextHandler}
					onMapLoaded={(map) => {
						setMap(map);
						map.on('mousemove', (e) => {
							setClientPos({ lat: e.lngLat.lat, lng: e.lngLat.lng });
						});
						mapCursorHover(map, 'claims');
						mapClickEvent(map, 'claims', (f) => {
							if (f.length == 1) {
								setSelected(f[0].properties.id);
								setOpened(true);
								return;
							}
							modals.open({
								title: 'Choose Claim to select',
								centered: true,
								children: (
									<Group justify="center">
										{f.map((c) => (
											<Button
												key={c.properties.id}
												onClick={() => {
													setSelected(c.properties.id);
													setOpened(true);
													modals.closeAll();
												}}
												color={c.properties.finished ? 'green' : 'red'}
											>
												{c.properties.id.split('-')[0]}
											</Button>
										))}
									</Group>
								),
							});
						});
					}}
				/>
			</div>
		</Page>
	);
};

export default MapPage;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'map'])),
		},
	};
}

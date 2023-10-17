import Map, { mapClickEvent, mapCopyCoordinates, mapCursorHover } from '../components/map/Map';
import { useEffect, useState } from 'react';

import { ClaimDrawer } from '../components/map/ClaimDrawer';
import { NextPage } from 'next';
import Page from '../components/Page';
import mapboxgl from 'mapbox-gl';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useClipboard } from '@mantine/hooks';
import { useRouter } from 'next/router';

const MapPage: NextPage = () => {
	const clipboard = useClipboard();
	const [opened, setOpened] = useState(false);
	const [selected, setSelected] = useState<null | string>(null);
	const [map, setMap] = useState<mapboxgl.Map>();
	const router = useRouter();

	useEffect(() => {
		if (/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(router.query.claim as string)) {
			setSelected(router.query.claim as string);
			setOpened(true);
		}
	}, [router.query.claim]);
	return (
		<Page fullWidth>
			<ClaimDrawer open={opened} setOpen={setOpened} id={selected} map={map} />
			<div style={{ height: '96vh', width: '100%' }}>
				<Map
					src={`${process.env.NEXT_PUBLIC_API_URL}/claims/geojson`}
					onMapLoaded={(map) => {
						setMap(map);
						mapCopyCoordinates(map, clipboard);
						mapCursorHover(map, 'claims');
						mapClickEvent(map, 'claims', (f) => {
							setSelected(f.properties.id);
							setOpened(true);
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
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

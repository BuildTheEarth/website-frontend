import Map, { mapClickEvent, mapCopyCoordinates, mapCursorHover } from '../components/map/Map';

import { ClaimDrawer } from '../components/map/ClaimDrawer';
import { NextPage } from 'next';
import Page from '../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useClipboard } from '@mantine/hooks';
import { useState } from 'react';

const MapPage: NextPage = () => {
	const clipboard = useClipboard();
	const [opened, setOpened] = useState(false);
	const [selected, setSelected] = useState(null);
	return (
		<Page fullWidth>
			<ClaimDrawer open={opened} setOpen={setOpened} id={selected} />
			<div style={{ height: '96vh', width: '100%' }}>
				<Map
					src={`${process.env.NEXT_PUBLIC_API_URL}/claims/geojson`}
					onMapLoaded={(map) => {
						mapCopyCoordinates(map, clipboard);
						mapCursorHover(map, 'claims');
						mapClickEvent(map, 'claims', (f) => {
							setSelected(f.properties.id);
							setOpened(true);
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
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

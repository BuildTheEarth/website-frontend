import Map from '../components/map/Map';
import { NextPage } from 'next';
import Page from '../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MapPage: NextPage = () => {
	return (
		<Page fullWidth>
			<div style={{ height: '96vh', width: '100%', marginTop: '60px' }}>
				<Map />
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

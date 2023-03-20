import Header from '../components/Header';
import Map from '../components/map/Map';
import { NextPage } from 'next';
import Page from '../components/Page';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';

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

import { Grid, Text, useMantineTheme } from '@mantine/core';

import { BackgroundCard } from '../../components/Card';
import { NextPage } from 'next';
import Page from '../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GetStarted: NextPage = () => {
	const theme = useMantineTheme();
	const { t } = useTranslation('getstarted');
	const router = useRouter();
	const largeScreen = useMediaQuery('(min-width: 900px)');
	const [focused, setFocused] = useState<number>(1);
	return (
		<Page
			head={{
				title: t('head.title'),
				image: 'https://cdn.buildtheearth.net/static/thumbnails/getstarted.png',
			}}
			title="Participate"
			description="Participate in Building the Earth"
		>
			<p>{t('description')}</p>
			<Grid style={{ height: '50vh' }}>
				<Grid.Col span={{ sm: 6 }} onMouseOver={() => setFocused(1)}>
					<BackgroundCard
						image="https://cdn.buildtheearth.net/static/getstarted/buildteams.webp"
						title={t('visit.title')}
						category={t('visit.subtitle')}
						style={{ height: '100%' }}
						showButton={focused == 1}
						buttonText={t('select')}
					/>
				</Grid.Col>
				<Grid.Col span={{ sm: 6 }} onMouseOver={() => setFocused(2)}>
					<BackgroundCard
						image="https://cdn.buildtheearth.net/static/getstarted/network.webp"
						title={t('build.title')}
						category={t('build.subtitle')}
						style={{ height: '100%' }}
						showButton={focused == 2}
						buttonText={t('select')}
					/>
				</Grid.Col>
			</Grid>

			<Text mt="lg">
				<Text c="red" span inherit pr="sm">
					*
				</Text>
				{t('disclaimer')}
			</Text>
		</Page>
	);
};

export default GetStarted;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'getstarted'])),
		},
	};
}

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
				image: '/images/placeholder.webp',
				large: true,
			}}
			title="Participate"
			description="Participate in Building the Earth"
		>
			<p>{t('description')}</p>
			<Grid style={{ height: '50vh' }}>
				<Grid.Col span={6} onMouseOver={() => setFocused(1)}>
					<BackgroundCard
						image="/images/getstarted/buildteams.webp"
						title="Explore BuildTheEarth"
						category="visiting"
						style={{ height: '100%' }}
						showButton={focused == 1}
						buttonText="Select"
					/>
				</Grid.Col>
				<Grid.Col span={6} onMouseOver={() => setFocused(2)}>
					<BackgroundCard
						image="/images/getstarted/network.webp"
						title="Start Building"
						category="building"
						style={{ height: '100%' }}
						showButton={focused == 2}
						buttonText="Select"
					/>
				</Grid.Col>
			</Grid>

			<Text mt="lg">
				<Text color="red" span inherit pr="sm">
					*
				</Text>
				No cost, no subscription, you can leave/switch at any point
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

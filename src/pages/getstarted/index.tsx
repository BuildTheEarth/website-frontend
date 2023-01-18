import { Alert, Button, Center, Grid, Text, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';

import { AlertCircle } from 'tabler-icons-react';
import { NextPage } from 'next';
import Page from '../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const GetStarted: NextPage = () => {
	const theme = useMantineTheme();
	const { t } = useTranslation('getstarted');
	const router = useRouter();
	const largeScreen = useMediaQuery('(min-width: 900px)');
	const [focused, setFocused] = useState<number | null>(null);
	return (
		<Page
			head={{
				title: t('head.title'),
				image: '/images/placeholder.webp',
				large: true,
			}}
		>
			{' '}
			{/* TODO: yea, i think you know \/ */}
			<Alert icon={<AlertCircle size={16} />} title="Warning" color="red" variant="filled">
				This content is out of date. We are aware of this and will update it soon. Please dont add issues about this.
			</Alert>
			<p>{t('description')}</p>
			<Grid mt="lg" style={{ minHeight: '60vh' }}>
				<Grid.Col
					sm={focused ? (focused === 1 ? 8 : 4) : 6}
					onMouseEnter={() => setFocused(1)}
					style={{
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						background: `url("/images/getstarted/network.webp") center center / cover`,
						transition: 'all 0.2s ease-out',
						padding: 0,
					}}
				>
					<Center style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
						<div style={{ color: '#ffffff', textAlign: 'center' }}>
							<h1>{t('network.title')}</h1>
							<p>{t('network.description')}</p>
							<div style={{ opacity: largeScreen && focused !== 1 ? 0 : 1, transition: 'all 0.2s ease-out' }}>
								<h4>{t('compability')}</h4>
								<p>
									{t('network.compability.java')}
									<br />
									{t('network.compability.bedrock')}
								</p>
								<Button
									variant="outline"
									size="lg"
									style={{
										color: 'white',
										borderColor: 'white',
										borderWidth: 3,
										marginTop: theme.spacing.xl * 1.5,
										marginBottom: theme.spacing.md,
									}}
									onClick={() => router.push('/getstarted/network')}
								>
									{t('network.getStarted')}
								</Button>
							</div>
						</div>
					</Center>
				</Grid.Col>
				<Grid.Col
					sm={focused ? (focused === 2 ? 8 : 4) : 6}
					onMouseEnter={() => setFocused(2)}
					style={{
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						background: `url("/images/getstarted/buildteams.webp") center center / cover`,
						transition: 'all 0.2s ease-out',
						padding: 0,
					}}
				>
					<Center style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
						<div style={{ color: '#ffffff', textAlign: 'center' }}>
							<h1>{t('teams.title')}</h1>
							<p>{t('teams.description')}</p>
							<div style={{ opacity: largeScreen && focused !== 2 ? 0 : 1, transition: 'all 0.2s ease-out' }}>
								<h4>{t('compability')}</h4>
								<p>
									{t('teams.compability.java')}
									<br />
									{t('teams.compability.bedrock')}
								</p>
								<Button
									variant="outline"
									size="lg"
									style={{
										color: 'white',
										borderColor: 'white',
										borderWidth: 3,
										marginTop: theme.spacing.xl * 1.5,
										marginBottom: theme.spacing.md,
									}}
									onClick={() => router.push('/teams')}
								>
									{t('teams.getStarted')}
								</Button>
							</div>
						</div>
					</Center>
				</Grid.Col>
			</Grid>
			<Text mt="lg">
				<Text color="red" span inherit>
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

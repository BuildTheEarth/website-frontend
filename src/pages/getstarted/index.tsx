import { Button, Center, Grid, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';

import { NextPage } from 'next';
import Page from '../../components/Page';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const GetStarted: NextPage = () => {
	const { t } = useTranslation('getstarted');
	const theme = useMantineTheme();
	const router = useRouter();
	const largeScreen = useMediaQuery('(min-width: 900px)');
	const [focused, setFocused] = useState<number | null>(null);
	return (
		<Page
			head={{
				title: t('head'),
				image: '/images/placeholder.png',
				large: true,
			}}
		>
			<p>
				{t('content')}
				<i> something about buildteams beeing on the main network?</i>
			</p>
			<Grid mt="lg" style={{ minHeight: '60vh' }}>
				<Grid.Col
					sm={focused ? (focused === 1 ? 8 : 4) : 6}
					onMouseEnter={() => setFocused(1)}
					style={{
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						background: `url("/images/getstarted/network.png") center center / cover`,
						transition: 'all 0.2s ease-out',
						padding: 0,
					}}
				>
					<Center style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
						<div style={{ color: '#ffffff', textAlign: 'center' }}>
							<h1>{t('network.title')}</h1>
							<p>{t('network.content')}</p>
							<div style={{ opacity: largeScreen && focused !== 1 ? 0 : 1, transition: 'all 0.2s ease-out' }}>
								<h4>{t('compatibility')}</h4>
								<p>
									Java 1.8 - 1.19 <br />
									Bedrock
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
									{t('action')}
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
						background: `url("/images/getstarted/buildteams.png") center center / cover`,
						transition: 'all 0.2s ease-out',
						padding: 0,
					}}
				>
					<Center style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
						<div style={{ color: '#ffffff', textAlign: 'center' }}>
							<h1>{t('teams.title')}</h1>
							<p>{t('teams.content')}</p>
							<div style={{ opacity: largeScreen && focused !== 1 ? 0 : 1, transition: 'all 0.2s ease-out' }}>
								<h4>{t('compatibility')}</h4>
								<p>
									Java 1.8 - 1.19 <br />
									Bedrock
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
									{t('action')}
								</Button>
							</div>
						</div>
					</Center>
				</Grid.Col>
			</Grid>
		</Page>
	);
};

export default GetStarted;

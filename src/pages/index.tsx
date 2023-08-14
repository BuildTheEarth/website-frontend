import {
	ActionIcon,
	BackgroundImage,
	Box,
	Button,
	Center,
	Grid,
	MediaQuery,
	Title,
	useMantineTheme,
} from '@mantine/core';

import { ChevronDown } from 'tabler-icons-react';
import Gallery from '../components/Gallery';
import { NextPage } from 'next';
import Page from '../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Home: NextPage = () => {
	const theme = useMantineTheme();
	const { t } = useTranslation('home');
	const router = useRouter();
	return (
		<Page fullWidth title="Home">
			<BackgroundImage src="/images/home/head.png" style={{ height: '100vh', width: '100%' }} mb="0">
				<Center
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: '#00000044',
						padding: 16,
					}}
				>
					<Title style={{ color: '#ffffff', fontSize: 64 }} align="center" order={1}>
						{t('head.title')}
						<br />
						<Button
							variant="outline"
							size="xl"
							style={{ color: 'white', borderColor: 'white', borderWidth: 3, marginTop: theme.spacing.xl * 1.5 }}
							onClick={() => router.push('/getstarted')}
						>
							{t('head.action')}
						</Button>
					</Title>
				</Center>
				<Center
					style={{
						width: '100%',
						height: '0%',
						position: 'absolute',
						bottom: '5%',
						left: 0,
					}}
				>
					<ActionIcon<'a'>
						styles={{ root: { height: 64, width: 64 } }}
						radius="xs"
						variant="transparent"
						onClick={() => router.push('#more')}
					>
						<ChevronDown size={64} color="white" />
					</ActionIcon>
				</Center>
			</BackgroundImage>
			<Box
				style={{
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					overflow: 'hidden',
				}}
			>
				<Grid>
					<Grid.Col lg={5} style={{ marginTop: 50, marginBottom: 50, minHeight: '30vh' }}>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h1 id="more" style={{ scrollMarginTop: 70 }}>
									{t('mission.title')}
								</h1>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											theme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>{t('mission.content')}</p>
								<Button<'a'> px={theme.spacing.xl * 2} component="a" href="/about" mt="md">
									{t('mission.action')}
								</Button>
							</div>
						</Center>
					</Grid.Col>

					<MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
						<Grid.Col lg={7} style={{ padding: 0 }}>
							<BackgroundImage src="/images/home/mission.webp" style={{ width: '100%', height: '100%' }} />
						</Grid.Col>
					</MediaQuery>

					<Grid.Col sm={12} style={{ padding: 0, margin: 0 }}>
						<Gallery
							style={{ height: '70vh' }}
							images={[
								{
									builder: 'Criffane 14#7255',
									location: 'Krasnodar Park',
									src: 'https://cdn.discordapp.com/attachments/811604280293064714/846615357585752084/image0.jpg',
									country: 'ru',
								},
								{
									builder: 'BTE Germany',
									location: 'Schloss Drachenburg',
									src: 'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
									country: 'de',
								},
								{
									builder: 'mcnoided#4059',
									location: 'Viaduc de Millau',
									src: 'https://cdn.discordapp.com/attachments/811604280293064714/824403619587031070/Capture2.png',
									country: 'fr',
								},
								{
									builder: 'De leted#2098',
									location: 'Wisconsin State Capitol',
									src: 'https://cdn.discordapp.com/attachments/811604280293064714/992899056361799680/Capitol5.png',
									country: 'us',
								},
								{
									builder: 'BTE NYC',
									location: 'Tribeca Seafront, NYC',
									src: 'https://cdn.discordapp.com/attachments/714797791913705472/975523840652378162/seafront_2.png',
									country: 'us',
								},
							]}
						/>
					</Grid.Col>

					<MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
						<Grid.Col lg={7} style={{ padding: 0 }}>
							<BackgroundImage src="/images/home/getstarted.webp" style={{ width: '100%', height: '100%' }} />
						</Grid.Col>
					</MediaQuery>

					<Grid.Col lg={5} style={{ marginTop: 50, marginBottom: 50, minHeight: '30vh' }}>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h1>{t('join.title')}</h1>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											theme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>{t('join.content')}</p>
								<Button<'a'> px={theme.spacing.xl * 2} component="a" href="/getstarted" mt="md">
									{t('join.action')}
								</Button>
							</div>
						</Center>
					</Grid.Col>
				</Grid>
			</Box>
		</Page>
	);
};

export default Home;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'home'])),
		},
	};
}

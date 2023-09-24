import {
	ActionIcon,
	BackgroundImage,
	Badge,
	Box,
	Button,
	Center,
	Grid,
	Group,
	Space,
	Stack,
	Title,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { motion, useScroll, useTransform } from 'framer-motion';

import { ChevronDown } from 'tabler-icons-react';
import Gallery from '../components/Gallery';
import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import Page from '../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Home: NextPage = () => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { scrollY, scrollYProgress } = useScroll();
	const { t } = useTranslation('home');
	const router = useRouter();
	const headBgPosY = useTransform(scrollYProgress, (latest) => `${latest * 5 + 50}%`);
	const missionY = useTransform(scrollYProgress, [0, 0.8], ['45%', '0%']);
	const galleryY = useTransform(scrollYProgress, [0.4, 0.8], ['45%', '0%']);
	return (
		<Page fullWidth title="Home">
			<motion.div
				style={{
					backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					background: `url("https://cdn.buildtheearth.net/static/home/head.webp") center center / cover`,
					backgroundPositionY: headBgPosY,
					width: '100%',
					height: '100vh',
				}}
			>
				<Center
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: '#00000044',
						padding: 16,
					}}
				>
					<Stack>
						<Title style={{ color: '#ffffff', fontSize: 64, textShadow: '0px 0px 28px #000' }} ta="center" order={1}>
							{t('head.title')}
						</Title>
						<Button
							component={Link}
							size="xl"
							radius="xl"
							variant="gradient"
							mt="md"
							style={{
								width: 'fit-content',
								alignSelf: 'center',
							}}
							href="/getstarted"
						>
							{t('head.action')}
						</Button>
					</Stack>
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
					<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<ActionIcon<'a'>
							styles={{ root: { height: 64, width: 64, textShadow: '0px 0px 28px #000' } }}
							radius="xs"
							variant="transparent"
							onClick={() => router.push('#more')}
						>
							<ChevronDown size={64} color="white" />
						</ActionIcon>
					</motion.div>
				</Center>
			</motion.div>
			<Box
				style={{
					background: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					overflow: 'hidden',
				}}
			>
				<Grid>
					<Grid.Col span={{ lg: 5 }} style={{ marginTop: 150, marginBottom: 50, minHeight: '30vh' }}>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h1 id="more" style={{ scrollMarginTop: 70 }}>
									{t('mission.title')}
								</h1>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											scheme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>{t('mission.content')}</p>
								<Button px={'calc(var(--mantine-spacing-xl)*2)'} component={Link} href="/about" mt="md">
									{t('mission.action')}
								</Button>
							</div>
						</Center>
					</Grid.Col>
					<Grid.Col span={{ lg: 7 }} style={{ minHeight: '30vh', position: 'relative' }}>
						<motion.div
							style={{
								backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
								background: `url("https://cdn.buildtheearth.net/static/home/mission.webp") center center / cover`,
								y: missionY,
								marginLeft: '10%',
								width: '70%',
								height: '80%',
								boxShadow: '10px 10px 0px 4px rgba(0,0,0,0.45)',
							}}
						/>
					</Grid.Col>
					<Grid.Col
						span={{ sm: 12 }}
						style={{ marginTop: 5, marginBottom: 25, display: 'flex', justifyContent: 'center' }}
					>
						<motion.div
							style={{
								height: '70vh',
								width: '80%',
								boxShadow: '10px 10px 0px 4px rgba(0,0,0,0.45)',
								y: galleryY,
								overflowY: 'hidden',
							}}
						>
							<Gallery
								style={{
									height: '70vh',
									width: '100%',
								}}
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
						</motion.div>
					</Grid.Col>
					<Grid.Col span={{ lg: 5 }} style={{ marginTop: 150, marginBottom: 150, minHeight: '30vh' }}>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h1 id="more" style={{ scrollMarginTop: 70 }}>
									{t('mission.title')}
								</h1>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											scheme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>{t('mission.content')}</p>
								<Button px={'calc(var(--mantine-spacing-xl)*2)'} component={Link} href="/about" mt="md">
									{t('mission.action')}
								</Button>
							</div>
						</Center>
					</Grid.Col>
					<Grid.Col
						span={{ lg: 7 }}
						style={{ marginTop: 150, marginBottom: 150, minHeight: '30vh', position: 'relative' }}
					>
						<motion.div
							style={{
								backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
								background: `url("https://cdn.buildtheearth.net/static/home/mission.webp") center center / cover`,
								y: missionY,
								marginLeft: '10%',
								width: '60%',
								height: '100%',
								boxShadow: '10px 10px 0px 4px rgba(0,0,0,0.45)',
							}}
						/>
					</Grid.Col>
				</Grid>
			</Box>
			{/* <Box
				style={{
					background: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					overflow: 'hidden',
				}}
			>
				<Grid>
					<Grid.Col span={{ lg: 5 }} style={{ marginTop: 50, marginBottom: 50, minHeight: '30vh' }}>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h1 id="more" style={{ scrollMarginTop: 70 }}>
									{t('mission.title')}
								</h1>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											scheme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>{t('mission.content')}</p>
								<Button px={'calc(var(--mantine-spacing-xl)*2)'} component={Link} href="/about" mt="md">
									{t('mission.action')}
								</Button>
							</div>
						</Center>
					</Grid.Col>
					{/* TODO 
					{/* <MediaQuery smallerThan="lg" styles={{ display: 'none' }}> 
					<Grid.Col span={{ lg: 7 }} style={{ padding: 0 }}>
						<BackgroundImage
							src="https://cdn.buildtheearth.net/static/home/mission.webp"
							style={{ width: '100%', height: '100%' }}
						/>
					</Grid.Col>
					{/* </MediaQuery> 

					<Grid.Col span={{ sm: 12 }} style={{ padding: 0, margin: 0 }}>
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
					{/* TODO 
					{/* <MediaQuery smallerThan="lg" styles={{ display: 'none' }}> 
					<Grid.Col span={{ lg: 7 }} style={{ padding: 0 }}>
						<BackgroundImage
							src="https://cdn.buildtheearth.net/static/home/getstarted.webp"
							style={{ width: '100%', height: '100%' }}
						/>
					</Grid.Col>
					{/* </MediaQuery> 

					<Grid.Col span={{ lg: 5 }} style={{ marginTop: 50, marginBottom: 50, minHeight: '30vh' }}>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h1>{t('join.title')}</h1>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											scheme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>{t('join.content')}</p>
								<Button px={'calc(var(--mantine-spacing-xl)*2)'} component={Link} href="/getstarted" mt="md">
									{t('join.action')}
								</Button>
							</div>
						</Center>
					</Grid.Col>
				</Grid>
			</Box> */}
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

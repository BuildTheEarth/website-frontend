import {
	ActionIcon,
	Box,
	Button,
	Center,
	Grid,
	Stack,
	Title,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'tabler-icons-react';

import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Gallery from '../components/Gallery';
import Page from '../components/Page';
import fetcher from '../utils/Fetcher';

const Home: NextPage = ({ data }: any) => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { scrollYProgress } = useScroll();
	const { t } = useTranslation('home');
	const router = useRouter();
	const headBgPosY = useTransform(scrollYProgress, (latest) => `${latest * 5 + 50}%`);
	const missionY = useTransform(scrollYProgress, [0, 1], ['45%', '0%']);
	const galleryY = useTransform(scrollYProgress, [0, 1], ['45%', '0%']);
	const getstartedY = useTransform(scrollYProgress, [0, 1], ['45%', '0%']);
	return (
		<Page
			fullWidth
			title="The Earth in Minecraft"
			description="Our mission is to fully recreate the entire Earth in Minecraft at a 1:1 scale. Anyone is able to join us and contribute!"
		>
			<motion.div
				style={{
					backgroundColor:
						scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
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
						<Title
							style={{ color: '#ffffff', fontSize: 64, textShadow: '0px 0px 28px #000' }}
							ta="center"
							order={1}
						>
							{t('head.title')}
						</Title>
						<Button
							component={Link}
							size="xl"
							variant="outline"
							color="white"
							mt="md"
							style={{
								width: 'fit-content',
								alignSelf: 'center',
								textShadow: '0px 0px 28px #000',
								borderWidth: '2px',
							}}
							href="/join"
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
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 1 }}
					>
						<ActionIcon
							component={Link}
							styles={{ root: { height: 64, width: 64, textShadow: '0px 0px 28px #000' } }}
							radius="xs"
							variant="transparent"
							href="#more"
							aria-label="View more"
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
					<Grid.Col
						span={{ lg: 5 }}
						style={{ marginTop: 150, marginBottom: 50, minHeight: '30vh' }}
					>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h2 id="more" style={{ scrollMarginTop: 70 }}>
									{t('mission.title')}
								</h2>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											scheme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>{t('mission.content')}</p>
								<Button
									px={'var(--mantine-spacing-xl)'}
									component={Link}
									href="/about"
									mt="md"
									rightSection={<ChevronRight />}
								>
									{t('mission.action')}
								</Button>
							</div>
						</Center>
					</Grid.Col>
					<Grid.Col span={{ lg: 7 }} style={{ minHeight: '30vh', position: 'relative' }}>
						<motion.div
							style={{
								backgroundColor:
									scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
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
								images={data.map((d: any) => ({
									buildTeam: d.buildTeam.name,
									buildTeamId: d.buildTeam.id,
									name: d.title,
									src: `https://cdn.buildtheearth.net/upload/${d.image.name}`,
									icon: d.buildTeam.icon,
									height: d.image.height,
									width: d.image.width,
									hash: d.image.hash,
								}))}
							/>
						</motion.div>
					</Grid.Col>
					<Grid.Col
						span={{ lg: 6 }}
						style={{ minHeight: '30vh', position: 'relative', marginTop: 150 }}
					>
						<motion.div
							style={{
								backgroundColor:
									scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
								background: `url("https://cdn.buildtheearth.net/static/home/getstarted.webp") center center / cover`,
								y: getstartedY,
								marginLeft: '25%',
								width: '65%',
								height: '75%',
								boxShadow: '10px 10px 0px 4px rgba(0,0,0,0.45)',
							}}
						/>
					</Grid.Col>
					<Grid.Col
						span={{ lg: 5 }}
						style={{ marginTop: 150, marginBottom: 50, minHeight: '30vh' }}
					>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h2 id="more" style={{ scrollMarginTop: 70 }}>
									{t('join.title')}
								</h2>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											scheme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>{t('join.content')}</p>
								<Button
									px={'var(--mantine-spacing-xl)'}
									component={Link}
									href="/join"
									mt="md"
									rightSection={<ChevronRight />}
								>
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
	const res = await fetcher('/showcases/random?limit=6');
	return {
		props: { data: res, ...(await serverSideTranslations(locale, ['common', 'home'])) },
		revalidate: 60 * 2, // Every two minutes
	};
}

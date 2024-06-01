import {
	ActionIcon,
	Box,
	Button,
	Center,
	Grid,
	Group,
	Stack,
	Text,
	ThemeIcon,
	Title,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'tabler-icons-react';

import BackgroundImage from '@/components/BackgroundImage';
import Gallery from '@/components/Gallery';
import Page from '@/components/Page';
import fetcher from '@/utils/Fetcher';
import { IconPhoto } from '@tabler/icons-react';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = ({ data, headData }: any) => {
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
			<BackgroundImage
				rootStyle={{
					width: '100%',
					height: '100vh',
				}}
				src={`https://cdn.buildtheearth.net/uploads/${headData[0].image.name}`}
				blurDataURL={headData[0].image.hash}
				sizes="100vw"
				priority
			>
				<Center
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: '#00000066',
						padding: 16,
						position: 'absolute',
						top: 0,
						right: 0,
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
			</BackgroundImage>
			<Group justify="end" mr="xl" mt="md" gap={4}>
				<ThemeIcon variant="transparent" color="dimmed">
					<IconPhoto style={{ width: '70%', height: '70%' }} />
				</ThemeIcon>
				<Text>{headData[0].title + (headData[0].city ? ', ' + headData[0].city : '')}</Text>
			</Group>
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
								<h2 id="more" style={{ scrollMarginTop: 150 }}>
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
								<Group mt="sm" gap={4}>
									<ThemeIcon variant="transparent" color="dimmed" size={'sm'}>
										<IconPhoto style={{ width: '70%', height: '70%' }} />
									</ThemeIcon>
									<Text c="dimmed" fz="sm">
										{headData[1].title + (headData[1].city ? ', ' + headData[1].city : '')}
									</Text>
								</Group>
								<Button
									px={'var(--mantine-spacing-xl)'}
									component={Link}
									href="/about"
									mt="md"
									rightSection={<ChevronRight />}
									w="40%"
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
								y: missionY,
								marginLeft: '10%',
								width: '70%',
								height: '80%',
								boxShadow: 'var(--mantine-shadow-block)',
							}}
						>
							<Image
								alt="Our Mission"
								// src={missionImg}
								src={`https://cdn.buildtheearth.net/uploads/${headData[1].image.name}`}
								style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								width={960}
								height={540}
								blurDataURL={headData[1].image.hash}
								placeholder="blur"
							/>
						</motion.div>
					</Grid.Col>
					<Grid.Col
						span={{ sm: 12 }}
						style={{ marginTop: 5, marginBottom: 25, display: 'flex', justifyContent: 'center' }}
					>
						<motion.div
							style={{
								height: '70vh',
								width: '80%',
								boxShadow: 'var(--mantine-shadow-block)',
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
									name: d.title + (d.city ? ', ' + d.city : ''),
									src: `https://cdn.buildtheearth.net/uploads/${d.image.name}`,
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
								y: getstartedY,
								marginLeft: '25%',
								width: '65%',
								height: '75%',
								boxShadow: 'var(--mantine-shadow-block)',
							}}
						>
							<Image
								alt="Get Started"
								// src={getstartedImg}
								src={`https://cdn.buildtheearth.net/uploads/${headData[2].image.name}`}
								style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								width={960}
								height={540}
								blurDataURL={headData[2].image.hash}
								placeholder="blur"
							/>
						</motion.div>
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
								<Group mt="sm" gap={4}>
									<ThemeIcon variant="transparent" color="dimmed" size="sm">
										<IconPhoto style={{ width: '70%', height: '70%' }} />
									</ThemeIcon>
									<Text c="dimmed" fz="sm">
										{headData[2].title + (headData[2].city ? ', ' + headData[2].city : '')}
									</Text>
								</Group>
								<Button
									px={'var(--mantine-spacing-xl)'}
									component={Link}
									href="/join"
									mt="md"
									rightSection={<ChevronRight />}
									w="40%"
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
	const res2 = await fetcher('/showcases/random?limit=3&approved=true');
	return {
		props: {
			data: res.sort((a: any, b: any) => 0.5 - Math.random()),
			headData: res2.sort((a: any, b: any) => 0.5 - Math.random()),
			...(await serverSideTranslations(locale, ['common', 'home'])),
		},
		revalidate: 60 * 10, // Every 10 minutes
	};
}

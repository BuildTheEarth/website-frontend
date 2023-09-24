import {
	ActionIcon,
	Anchor,
	BackgroundImage,
	Box,
	Button,
	Card,
	Center,
	Container,
	Grid,
	Group,
	Text,
	Title,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { ChevronDown, ChevronRight } from 'tabler-icons-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import Page from '../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const GetStarted: NextPage = () => {
	const { t } = useTranslation('getstarted');
	const scheme = useMantineColorScheme();
	const theme = useMantineTheme();
	const { scrollYProgress } = useScroll();
	const titleOp = useTransform(scrollYProgress, [0, 1], ['0', '1']);
	return (
		<Page fullWidth title="Participate" description="Participate in Building the Earth">
			<div
				style={{
					backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					background: `url("https://cdn.buildtheearth.net/static/thumbnails/getstarted.png") center center / cover`,
					width: '100%',
					height: '95vh',
				}}
			>
				<Center
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: '#00000077',
						padding: 16,
					}}
				>
					<Title style={{ color: '#ffffff', fontSize: 64, textShadow: '0px 0px 28px #000' }} ta="center" order={1}>
						{t('head.title')}
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
					<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<ActionIcon
							component={Link}
							styles={{ root: { height: 64, width: 64, textShadow: '0px 0px 28px #000' } }}
							radius="xs"
							variant="transparent"
							href="#choose"
						>
							<ChevronDown size={64} color="white" />
						</ActionIcon>
					</motion.div>
				</Center>
			</div>
			<Container
				style={{
					background: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					overflow: 'hidden',
					width: '100%',
					minHeight: '100vh',
				}}
				my="xl"
			>
				<motion.h1
					id="choose"
					style={{
						opacity: titleOp,
						margin: 'var(--mantine-spacing-xl) 0px',
						padding: 'var(--mantine-spacing-xl) 0px',
						color: 'var(--mantine-color-white)',
					}}
				>
					{t('head.title')}
				</motion.h1>
				<Grid style={{ width: '100%' }} my="xl" pb="xl" gutter={{ base: 'md', sm: '10%' }}>
					<Grid.Col span={{ xs: 6, base: 9 }}>
						<Card
							padding="xl"
							radius={0}
							style={{ width: '100%', height: '100%', boxShadow: '10px 10px 0px 4px rgba(0,0,0,0.45)' }}
						>
							<Card.Section>
								<BackgroundImage
									src="https://cdn.buildtheearth.net/static/getstarted/visit.webp"
									style={{ height: '25vh' }}
								/>
							</Card.Section>

							<Title order={2} mt="md">
								{t('visit.title')}
							</Title>

							<Text mt="xs" c="dimmed" size="md">
								{t('visit.subtitle')}
							</Text>
							<Button
								component={Link}
								href="/join/visit"
								rightSection={<ChevronRight />}
								px={'var(--mantine-spacing-xl)'}
								mt="md"
								style={{ width: 'fit-content' }}
							>
								{t('visit.button')}
							</Button>
						</Card>
					</Grid.Col>
					<Grid.Col span={{ xs: 6, base: 9 }}>
						<Card
							padding="xl"
							radius={0}
							style={{ width: '100%', height: '100%', boxShadow: '10px 10px 0px 4px rgba(0,0,0,0.45)' }}
						>
							<Card.Section>
								<BackgroundImage
									src="https://cdn.buildtheearth.net/static/getstarted/build.webp"
									style={{ height: '25vh' }}
								/>
							</Card.Section>

							<Title order={2} mt="md">
								{t('build.title')}
							</Title>

							<Text mt="xs" c="dimmed" size="md">
								{t('build.subtitle')}
							</Text>
							<Button
								component={Link}
								href="/join/build"
								rightSection={<ChevronRight />}
								px={'var(--mantine-spacing-xl)'}
								mt="md"
								style={{ width: 'fit-content' }}
							>
								{t('build.button')}
							</Button>
						</Card>
					</Grid.Col>
				</Grid>
				<Text c="dimmed" fs="sm" mt="xl" pt="xl" component={Link} href="https://docs.buildtheearth.net/docs/intro">
					{t('more')}
				</Text>
			</Container>
			{/* <p>{t('description')}</p>
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
			</Text> */}
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

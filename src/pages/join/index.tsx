import {
	ActionIcon,
	Button,
	Card,
	Center,
	Container,
	Grid,
	Text,
	Title,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'tabler-icons-react';

import BackgroundImage from '@/components/BackgroundImage';
import Page from '@/components/Page';
import buildImg from '@/public/images/join/build.webp';
import visitImg from '@/public/images/join/visit.webp';
import thumbnail from '@/public/images/thumbnails/getstarted.png';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const GetStarted: NextPage = () => {
	const { t } = useTranslation('getstarted');
	const scheme = useMantineColorScheme();
	const theme = useMantineTheme();
	const { scrollYProgress } = useScroll();
	const titleOp = useTransform(scrollYProgress, [0, 1], ['0', '1']);
	return (
		<Page fullWidth title="Participate" description="Participate in Building the Earth">
			<BackgroundImage
				rootStyle={{
					width: '100%',
					height: '95vh',
				}}
				src={thumbnail}
				sizes="100vw"
			>
				<div
					style={{
						height: '100%',
						position: 'absolute',
						top: 0,
						right: 0,
						width: '100%',
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
						<Title
							style={{ color: '#ffffff', fontSize: 64, textShadow: '0px 0px 28px #000' }}
							ta="center"
							order={1}
						>
							{t('choose.title')}
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
								href="#more"
							>
								<ChevronDown size={64} color="white" />
							</ActionIcon>
						</motion.div>
					</Center>
				</div>
			</BackgroundImage>
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
					id="more"
					style={{
						opacity: titleOp,
						margin: 'var(--mantine-spacing-xl) 0px',
						padding: 'var(--mantine-spacing-xl) 0px',
						color: 'var(--mantine-color-white)',
					}}
				>
					{t('choose.title')}
				</motion.h1>
				<Grid style={{ width: '100%' }} my="xl" pb="xl" gutter={{ base: 'md', sm: '10%' }}>
					<Grid.Col span={{ xs: 6, base: 9 }}>
						<Card
							padding="xl"
							radius={0}
							style={{
								width: '100%',
								height: '100%',
								boxShadow: 'var(--mantine-shadow-block)',
							}}
						>
							<Card.Section>
								<Image
									alt="Visit us"
									src={visitImg}
									style={{ height: '25vh', width: '100%', objectFit: 'cover' }}
								/>
							</Card.Section>

							<Title order={2} mt="md">
								{t('choose.visit.title')}
							</Title>

							<Text mt="xs" c="dimmed" size="md">
								{t('choose.visit.subtitle')}
							</Text>
							<Button
								component={Link}
								href="/join/visit#more"
								rightSection={<ChevronRight />}
								px={'var(--mantine-spacing-xl)'}
								mt="md"
								style={{ width: 'fit-content' }}
							>
								{t('choose.visit.button')}
							</Button>
						</Card>
					</Grid.Col>
					<Grid.Col span={{ xs: 6, base: 9 }}>
						<Card
							padding="xl"
							radius={0}
							style={{
								width: '100%',
								height: '100%',
								boxShadow: 'var(--mantine-shadow-block)',
							}}
						>
							<Card.Section>
								<Image
									alt="Build with us"
									src={buildImg}
									style={{ height: '25vh', width: '100%', objectFit: 'cover' }}
								/>
							</Card.Section>

							<Title order={2} mt="md">
								{t('choose.build.title')}
							</Title>

							<Text mt="xs" c="dimmed" size="md">
								{t('choose.build.subtitle')}
							</Text>
							<Button
								component={Link}
								href="/join/build#more"
								rightSection={<ChevronRight />}
								px={'var(--mantine-spacing-xl)'}
								mt="md"
								style={{ width: 'fit-content' }}
							>
								{t('choose.build.button')}
							</Button>
						</Card>
					</Grid.Col>
				</Grid>
			</Container>
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

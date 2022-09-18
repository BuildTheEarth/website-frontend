import { ActionIcon, Box, Button, Center, Grid, MediaQuery, Title, useMantineTheme } from '@mantine/core';

import { ChevronDown } from 'tabler-icons-react';
import Gallery from '../components/Gallery';
import { NextPage } from 'next';
import Page from '../components/Page';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
	const theme = useMantineTheme();
	const { t } = useTranslation();
	const router = useRouter();
	return (
		<Page fullWidth>
			<div
				style={{
					width: '100%',
					height: 'calc(100vh - 60px)',
					position: 'relative',
				}}
			>
				<div
					style={{
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						background: `url("/images/placeholder.png")`,
						filter: 'brightness(0.5)',
						width: '100%',
						height: '100%',
						marginTop: 60,
					}}
				></div>
				<Center
					style={{
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 60,
						left: 0,
					}}
				>
					<Title style={{ color: '#ffffff' }} align="center" order={1}>
						Recreating The Earth In Minecraft
						<br />
						<Button
							variant="outline"
							size="xl"
							style={{ color: 'white', borderColor: 'white', borderWidth: 3, marginTop: theme.spacing.xl * 1.5 }}
							onClick={() => router.push('/getstarted')}
						>
							{t('test.test')} Get Started
						</Button>
					</Title>
				</Center>
				<Center
					style={{
						width: '100%',
						height: '0%',
						position: 'absolute',
						bottom: 0,
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
			</div>
			<Box
				style={{
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					marginTop: 60,
					overflow: 'hidden',
				}}
			>
				<Grid>
					<Grid.Col lg={6} style={{ marginTop: 50, marginBottom: 50 }}>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h1 id="more">Our Grand Mission</h1>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											theme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>
									Our mission is to fully recreate the entire Earth in Minecraft at a 1:1 scale. One block in Minecraft
									equates to roughly one meter in the real world, meaning that this project will fully recreate the size
									of our planet. Anyone is able to join us and contribute to the largest and most expansive build
									project to ever have been attempted in Minecraft. Every language, nationality, and regional difference
									is accepted and regarded as our greatest attribute as we continue our journey to unite all of
									Humanity&apos;s greatest achievements into a single Minecraft world.
								</p>
							</div>
						</Center>
					</Grid.Col>

					<MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
						<Grid.Col
							lg={6}
							style={{
								backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
								background: `url("/images/home/mission.png")`,
							}}
						></Grid.Col>
					</MediaQuery>

					<Grid.Col sm={12} style={{ padding: 0, margin: 0 }}>
						<Gallery
							style={{ height: '70vh' }}
							images={[
								{
									builder: 'BTE Germany',
									location: 'Schloss Drachenburg',
									src: 'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
									country: 'de',
								},
								{
									builder: 'De leted#2098',
									location: 'Wisconsin State Capitol',
									src: 'https://cdn.discordapp.com/attachments/811604280293064714/992899056361799680/Capitol5.png',
									country: 'us',
								},
							]}
						/>
					</Grid.Col>

					<MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
						<Grid.Col
							lg={6}
							style={{
								backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
								background: `url("/images/home/getstarted.png")`,
							}}
						></Grid.Col>
					</MediaQuery>

					<Grid.Col lg={6} style={{ marginTop: 50, marginBottom: 50 }}>
						<Center style={{ width: '100%', height: '100%' }}>
							<div style={{ padding: '0px 10%' }}>
								<h1>How You Can Help</h1>
								<div
									style={{
										background: `linear-gradient(90deg, rgba(${
											theme.colorScheme === 'dark' ? '193, 194, 197' : '0, 0, 0'
										},1) 20%, rgba(0,0,0,0) 20%)`,
										height: 2,
									}}
								/>
								<p>
									Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
									labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
									et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
									ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
									dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
									rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
								</p>
								<Button<'a'> px={theme.spacing.xl * 2} component="a" href="/getstarted">
									Get Started
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

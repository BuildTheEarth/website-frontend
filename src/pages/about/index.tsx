import { Blockquote, Button, Center, Container, Grid, Text, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import { ChevronRight } from 'tabler-icons-react';
import Link from 'next/link';
import { NextPage } from 'next';
import Page from '../../components/Page';
import { Youtube } from '@icons-pack/react-simple-icons';
import fetcher from '../../utils/Fetcher';
import { motion } from 'framer-motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: NextPage = () => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	return (
		<Page fullWidth title="About Us">
			<motion.div
				style={{
					backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					background: `url("https://cdn.buildtheearth.net/static/thumbnails/about.webp") center center / cover`,
					width: '100%',
					height: '50vh',
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
					<Title style={{ color: '#ffffff', fontSize: 64, textShadow: '0px 0px 28px #000' }} ta="center" order={1}>
						About us
					</Title>
				</Center>
			</motion.div>
			<Container my="xl" size={'md'}>
				<h1>Our Mission</h1>
				<Grid>
					<Grid.Col span={{ md: 7 }}>
						<Text>Here at Build the Earth, we have one simple goal, to recreate the whole Earth in Minecraft, 1:1 scale. Our project was started by PippenFTS, who created the YouTube video that started it all. With the help of a few mods, the height limit in Minecraft was removed and a version of the world with terrain was created.</Text>
					</Grid.Col>
					<Grid.Col span={{ md: 5 }}>
						<Blockquote m="md" cite="– @miallv14" color="red" icon={<Youtube />} mt="lg" iconSize={40}>
							This was every Minecraft player’s dream since the dawn of Minecraft
						</Blockquote>
					</Grid.Col>
				</Grid>
				<Text>
					Countless hours were spent debating over which projection to use, and whether to change it at all. In the end, it was settled to use a modified version of the Air-ocean projection, which keeps distortion low and preserves scale unlike the equirectangular map projection used before. So far great progress has been made and we hope that one
					day we will be able to recreate the majority of the Earth in Minecraft, 1:1 scale.
				</Text>
				<h1>How does BuildTheEarth work?</h1>
				<Text>
					Isn’t there a height limit in Minecraft? Prior to the existence of the Cubic Chunks Mod, a project like ours couldn’t have existed. Thanks to the release of the Cubic Chunks mod, which changes how Minecraft stores world data, we are now able to have a theoretically infinite build height, therefore allowing the replication of the world on
					a 1:1 scale. In addition, newer versions of Minecraft introduced a greater height limit.
				</Text>
				<h1>Our History and Future</h1>
				<Grid>
					<Grid.Col span={{ md: 7 }}>
						<Text>
							With more than 15 million views, it is safe to say that we’ve amassed a massive response to the call to action. Overnight a staff team was assembled, growing to the hundred-plus staff that we have today, each with their special purpose and role in the project. With over five thousand builders and build teams of all regions on earth,
							we are well on our way to building the Earth. Here at Build the Earth, we don’t have any deadlines for when we want certain places to be built, as we have faith that our builders will complete their plots of land whenever they can.
						</Text>
					</Grid.Col>
					<Grid.Col span={{ md: 5 }}>
						<Blockquote m="md" cite="– @lukastrommer" color="red" icon={<Youtube />} mt="lg" iconSize={40}>
							Imagine you could just go everywhere in your whole life just in minecraft.
						</Blockquote>
					</Grid.Col>
				</Grid>
				<Text>
					There have already been massive leaps and bounds made in construction. Large cities like New York City, London, Paris, and Los Angeles all have teams tirelessly working on them. If you’d like to check out our progress, videos and photographs are available in our Discord server, Youtube, and Instagram. We would love to have more people
					join in on Building The Earth, so if you or your friends can build, join our Discord, and apply for the builder position on our website.
				</Text>
				<Button px={'xl'} mb="xl" component={Link} href="/join" mt="md" rightSection={<ChevronRight />}>
					Join us
				</Button>
			</Container>
		</Page>
	);
};

export default Home;

export async function getStaticProps({ locale }: any) {
	return {
		props: { ...(await serverSideTranslations(locale, ['common', 'home'])) },
	};
}

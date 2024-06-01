import {
	Blockquote,
	Button,
	Center,
	Container,
	Grid,
	Text,
	Title,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';

import BackgroundImage from '@/components/BackgroundImage';
import Page from '@/components/Page';
import thumbnail from '@/public/images/thumbnails/about.webp';
import { Youtube } from '@icons-pack/react-simple-icons';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'tabler-icons-react';

const Home: NextPage = () => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { t } = useTranslation('about');
	return (
		<Page fullWidth title={t('head.title')}>
			<BackgroundImage
				rootStyle={{
					width: '100%',
					height: '50vh',
				}}
				src={thumbnail}
				sizes="100vw"
			>
				<Center
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: '#00000044',
						padding: 16,
						position: 'absolute',
						top: 0,
						right: 0,
					}}
				>
					<Title
						style={{ color: '#ffffff', fontSize: 64, textShadow: '0px 0px 28px #000' }}
						ta="center"
						order={1}
					>
						{t('head.title')}
					</Title>
				</Center>
			</BackgroundImage>
			<Container my="xl" size={'md'}>
				<h1>{t('mission.title')}</h1>
				<Grid>
					<Grid.Col span={{ md: 7 }}>
						<Text>{t('mission.content.1')}</Text>
					</Grid.Col>
					<Grid.Col span={{ md: 5 }}>
						<Blockquote
							m="md"
							cite="– @miallv14"
							color="red"
							icon={<Youtube />}
							mt="lg"
							iconSize={40}
						>
							This was every Minecraft player’s dream since the dawn of Minecraft
						</Blockquote>
					</Grid.Col>
				</Grid>
				<Text>{t('mission.content.2')}</Text>
				<h1>{t('system.title')}</h1>
				<Text>{t('system.content')}</Text>
				<h1>{t('history.title')}</h1>
				<Grid>
					<Grid.Col span={{ md: 7 }}>
						<Text>{t('history.content.1')}</Text>
					</Grid.Col>
					<Grid.Col span={{ md: 5 }}>
						<Blockquote
							m="md"
							cite="– @lukastrommer"
							color="red"
							icon={<Youtube />}
							mt="lg"
							iconSize={40}
						>
							Imagine you could just go everywhere in your whole life just in minecraft.
						</Blockquote>
					</Grid.Col>
				</Grid>
				<Button
					px={'xl'}
					mb="xl"
					component={Link}
					href="/join"
					mt="md"
					rightSection={<ChevronRight />}
				>
					{t('history.action')}
				</Button>
			</Container>
		</Page>
	);
};

export default Home;

export async function getStaticProps({ locale }: any) {
	return {
		props: { ...(await serverSideTranslations(locale, ['common', 'about'])) },
	};
}

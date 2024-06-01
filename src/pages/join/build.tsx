import {
	ActionIcon,
	Avatar,
	Button,
	Center,
	Container,
	Grid,
	Group,
	Stack,
	Text,
	Title,
	Tooltip,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { IconChevronDown, IconChevronLeft } from '@tabler/icons-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import BackgroundImage from '@/components/BackgroundImage';
import Page from '@/components/Page';
import SearchInput from '@/components/SearchInput';
import thumbnail from '@/public/images/join/build.webp';
import fetcher from '@/utils/Fetcher';
import getCountryName from '@/utils/ISOCountries';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Build: NextPage = ({ data }: any) => {
	const { t } = useTranslation('getstarted');
	const scheme = useMantineColorScheme();
	const theme = useMantineTheme();
	const router = useRouter();
	const [search, setSearch] = useState<string | undefined>(undefined);
	const [selected, setSelected] = useState<any>(undefined);
	const { scrollY, scrollYProgress } = useScroll();
	const titleOp = useTransform(scrollY, [0, 500], ['0', '1']);

	return (
		<Page fullWidth title="Visit" description="Visit Building the Earth">
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
							{t('build.title')}
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
								<IconChevronDown size={64} color="white" />
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
					{t('build.title')}
				</motion.h1>
				<p>{t('build.description')}</p>
				<SearchInput onSearch={(search) => setSearch(search)} />
				<Grid mt="xl" pt="xl" gutter={{ base: '3%' }}>
					{data
						?.sort((a: any, b: any) => b._count.members - a._count.members)
						.map((element: any) => ({
							...element,
							location: element.location
								.split(', ')
								.map((e: string) => getCountryName(e))
								.join(', '),
						}))
						.filter(
							(element: any) =>
								element.name.toLowerCase().includes(search?.toLowerCase() || '') ||
								element.location.toLowerCase().includes(search?.toLowerCase() || ''),
						)
						// .slice(0, 8)
						.map((element: any, i: number) => (
							<Grid.Col key={i} span={{ sm: 5.75 }} mb="md" mr="md">
								<Group
									wrap="nowrap"
									style={{
										backgroundColor:
											scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
										borderRadius: 0,
										cursor: 'pointer',
										boxShadow: 'var(--mantine-shadow-block)',
									}}
									p="md"
									onClick={() => router.push(`/teams/${element.slug}/apply`)}
								>
									<Avatar src={element.icon} size={94} radius="md" alt={element.name + ' Logo'} />
									<div>
										<Stack gap={'xs'}>
											<Text fs="xl" fw="bold">
												{element.name}
											</Text>
											{element.location.split(', ').length > 2 ? (
												<Tooltip label={element.location.split(', ').slice(2).join(', ')}>
													<Text size="md" c="dimmed">
														{element.location.split(', ').slice(0, 2).join(', ')} +
														{element.location.split(', ').length - 2}
													</Text>
												</Tooltip>
											) : (
												<Text size="md" c="dimmed">
													{element.location}
												</Text>
											)}
										</Stack>
									</div>
								</Group>
							</Grid.Col>
						))}
				</Grid>
			</Container>
			{selected && (
				<Container
					style={{
						background: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						overflow: 'hidden',
						width: '100%',
						minHeight: '100vh',
					}}
					my="xl"
				>
					<h1
						id="country"
						style={{
							margin: 'var(--mantine-spacing-xl) 0px',
							padding: 'var(--mantine-spacing-xl) 0px',
							color: 'var(--mantine-color-white)',
						}}
					>
						{t('build.country.title', { country: selected.location })}
					</h1>

					<Button mt="xl" component={Link} href="/join#more" leftSection={<IconChevronLeft />}>
						{t('build.back')}
					</Button>
				</Container>
			)}
		</Page>
	);
};

export default Build;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/buildteams');

	return {
		props: { data: res, ...(await serverSideTranslations(locale, ['common', 'getstarted'])) },
		revalidate: 60 * 60 * 24, // Every day
	};
}

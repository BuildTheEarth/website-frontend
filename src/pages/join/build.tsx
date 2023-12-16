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
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { IconChevronDown, IconChevronLeft } from '@tabler/icons';
import { motion, useScroll, useTransform } from 'framer-motion';

import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import SearchInput from '../../components/SearchInput';
import fetcher from '../../utils/Fetcher';
import getCountryName from '../../utils/ISOCountries';

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
			<div
				style={{
					backgroundColor:
						scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					background: `url("https://cdn.buildtheearth.net/static/getstarted/build.webp") center center / cover`,
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
						?.filter((element: any) =>
							element.name?.toLowerCase().includes(search?.toLowerCase() || ''),
						)
						.sort((a: any, b: any) => a.location.localeCompare(b.location))
						.slice(0, 8)
						.map((element: any, i: number) => (
							<Grid.Col key={i} span={{ sm: 5.75 }} mb="md" mr="md">
								<Group
									wrap="nowrap"
									style={{
										backgroundColor:
											scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
										borderRadius: 0,
										cursor: 'pointer',
										boxShadow: '10px 10px 0px 4px rgba(0,0,0,0.45)',
									}}
									p="md"
									onClick={() => router.push(`/teams/${element.id}/apply`)}
								>
									<Avatar src={element.icon} size={94} radius="md" />
									<div>
										<Stack gap={'xs'}>
											<Text fs="xl" fw="bold">
												{element.name}
											</Text>
											<Text size="md">
												{element.location
													.split(', ')
													.slice(0, 3)
													.map((e: string) => getCountryName(e))
													.join(', ')}
											</Text>
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
	};
}

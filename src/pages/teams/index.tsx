import {
	Avatar,
	Badge,
	Grid,
	Group,
	Pagination,
	Text,
	Tooltip,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { Pin, Users } from 'tabler-icons-react';

import Page from '@/components/Page';
import SearchInput from '@/components/SearchInput';
import thumbnail from '@/public/images/thumbnails/teams.png';
import fetcher from '@/utils/Fetcher';
import getCountryName from '@/utils/ISOCountries';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Teams: NextPage = ({ data }: any) => {
	const router = useRouter();
	const { t } = useTranslation('teams');
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const [search, setSearch] = useState<string | undefined>(undefined);
	const [activePage, setPage] = useState(1);
	return (
		<Page
			head={{
				title: t('head.title'),
				image: thumbnail,
			}}
			description="Build Teams work together on a multiplayer server to build cities, regions and sometimes even entire countries for the BuildTheEarth Project"
		>
			<p>
				{t('description')}
				<br />
				<br />
				{t('joining')}
			</p>
			<SearchInput onSearch={(search) => setSearch(search)} />
			<Grid gutter="xl" style={{ marginTop: theme.spacing.xl }}>
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
					.slice(activePage * 8 - 8, activePage * 8)
					.map((element: any, i: number) => (
						<Grid.Col key={`${i}_${element.slug}_bt_list`} span={{ sm: 6 }}>
							<Group
								wrap="nowrap"
								style={{
									backgroundColor:
										scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
									borderRadius: theme.radius.xs,
									cursor: 'pointer',
								}}
								p="md"
								onClick={() => router.push(`/teams/${element.slug}`)}
							>
								<Avatar src={element.icon} size={94} radius="md" alt={element.name + ' Logo'} />
								<div>
									<Group justify="space-between">
										<Text size="lg" fw={500}>
											{element.name}
										</Text>

										{element?.members?.length >= 1 ? (
											<Badge color="green">{t('common:builder')}</Badge>
										) : null}
									</Group>

									<Group wrap="nowrap" gap={10} mt={3}>
										<Pin size={16} />
										{element.location.split(', ').length > 2 ? (
											<Tooltip label={element.location.split(', ').slice(2).join(', ')}>
												<Text size="xs" c="dimmed">
													{element.location.split(', ').slice(0, 2).join(', ')} +
													{element.location.split(', ').length - 2}
												</Text>
											</Tooltip>
										) : (
											<Text size="xs" c="dimmed">
												{element.location}
											</Text>
										)}
									</Group>

									<Group wrap="nowrap" gap={10} mt={5}>
										<Users size={16} />
										<Text size="xs" c="dimmed">
											{t('members', { num: element._count.members })}
										</Text>
									</Group>
								</div>
							</Group>
						</Grid.Col>
					))}
			</Grid>
			<Group justify="center" pt="md">
				<Pagination
					total={Math.ceil(
						data?.filter((element: any) =>
							element.name.toLowerCase().includes(search?.toLowerCase() || ''),
						).length / 8,
					)}
					radius="xs"
					value={activePage}
					onChange={setPage}
					siblings={1}
				/>
			</Group>
		</Page>
	);
};

export default Teams;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/buildteams');

	return {
		props: { data: res, ...(await serverSideTranslations(locale, ['common', 'teams'])) },
		revalidate: 60 * 20, // Every 20 minutes
	};
}

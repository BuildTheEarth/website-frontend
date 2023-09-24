import {
	Avatar,
	Badge,
	Grid,
	Group,
	Pagination,
	Skeleton,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { Pin, Users } from 'tabler-icons-react';

import { NextPage } from 'next';
import Page from '../../components/Page';
import SearchInput from '../../components/SearchInput';
import fetcher from '../../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useUser } from '../../hooks/useUser';

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
				image: 'https://cdn.buildtheearth.net/static/placeholder.webp',
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
					?.filter((element: any) => element.name.toLowerCase().includes(search?.toLowerCase() || ''))
					.slice(activePage * 8 - 8, activePage * 8)
					.map((element: any, i: number) => (
						<Grid.Col key={i} span={{ sm: 6 }}>
							<Group
								wrap="nowrap"
								style={{
									backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
									borderRadius: theme.radius.xs,
									// TODO
									// '&:hover': {
									// 	backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
									// },
									cursor: 'pointer',
								}}
								p="md"
								onClick={() => router.push(`/teams/${element.id}`)}
							>
								<Avatar src={element.icon} size={94} radius="md" />
								<div>
									<Group justify="space-between">
										<Text size="lg" fw={500}>
											{element.name}
										</Text>

										{element?.members?.length >= 1 ? <Badge color="green">Builder</Badge> : null}
									</Group>

									<Group wrap="nowrap" gap={10} mt={3}>
										<Pin size={16} />
										<Text size="xs" c="dimmed">
											{element.location}
										</Text>
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
						data?.filter((element: any) => element.name.toLowerCase().includes(search?.toLowerCase() || '')).length / 8,
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

	return { props: { data: res, ...(await serverSideTranslations(locale, ['common', 'teams'])) } };
}

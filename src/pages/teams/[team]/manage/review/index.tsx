import {
	ActionIcon,
	Badge,
	Group,
	Pagination,
	SimpleGrid,
	Table,
	Tooltip,
	useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconClock, IconQuestionMark, IconX } from '@tabler/icons-react';

import { IconChevronRight } from '@tabler/icons-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import Page from '../../../../../components/Page';
import SettingsTabs from '../../../../../components/SettingsTabs';
import { StatsRing } from '../../../../../components/Stats';
import fetcher from '../../../../../utils/Fetcher';

var vagueTime = require('vague-time');
const Review = ({ team }: any) => {
	const { data } = useSWR(`/buildteams/${team}/applications?slug=true`);
	const [activePage, setPage] = useState(1);
	const [filter, setFilter] = useState<string | undefined>();
	const theme = useMantineTheme();
	return (
		<Page
			smallPadding
			head={{
				title: 'Pending Applications',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/teams.png',
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={[
				'team.settings.edit',
				'team.socials.edit',
				'team.application.edit',
				'team.application.list',
				'team.application.review',
			]}
			loading={!data}
		>
			<SettingsTabs team={team} loading={!data}>
				<h2>Statistics</h2>
				<SimpleGrid cols={2} mb="md">
					<StatsRing
						label="Pending Applications"
						stats={data?.filter((d: any) => d.status == 'SEND').length}
						progress={(data?.filter((d: any) => d.status == 'SEND').length / data?.length) * 100}
						color="orange"
						icon={IconQuestionMark}
						onClick={() => setFilter('SEND')}
						style={{ cursor: 'pointer' }}
					/>
					<StatsRing
						label="Trial Applications"
						stats={data?.filter((d: any) => d.status == 'TRIAL').length}
						progress={(data?.filter((d: any) => d.status == 'TRIAL').length / data?.length) * 100}
						color="teal"
						icon={IconClock}
						onClick={() => setFilter('TRIAL')}
						style={{ cursor: 'pointer' }}
					/>
					<StatsRing
						label="Accepted Applications"
						stats={data?.filter((d: any) => d.status == 'ACCEPTED').length}
						progress={
							(data?.filter((d: any) => d.status == 'ACCEPTED').length / data?.length) * 100
						}
						color="green"
						icon={IconCheck}
						onClick={() => setFilter('ACCEPTED')}
						style={{ cursor: 'pointer' }}
					/>
					<StatsRing
						label="Rejected Applications"
						stats={data?.filter((d: any) => d.status == 'DECLINED').length}
						progress={
							(data?.filter((d: any) => d.status == 'DECLINED').length / data?.length) * 100
						}
						color="red"
						icon={IconX}
						onClick={() => setFilter('DECLINED')}
						style={{ cursor: 'pointer' }}
					/>
				</SimpleGrid>
				<h2>Applications</h2>
				<Table.ScrollContainer minWidth={800}>
					<Table verticalSpacing="sm">
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Id</Table.Th>
								<Table.Th>Status</Table.Th>
								<Table.Th>Trial</Table.Th>
								<Table.Th>Created At</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{data
								?.sort(
									(a: any, b: any) =>
										new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
								)
								.filter((d: any) => d.status == filter || !filter)
								.slice(activePage * 20 - 20, activePage * 20)
								.map((a: any) => (
									<Table.Tr key={a.id}>
										<Table.Td>
											<Tooltip label={a.id}>
												<p>{a.id.split('-')[0]}</p>
											</Tooltip>
										</Table.Td>
										<Table.Td>
											{a.status == 'SEND' ? (
												<Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>
													Needs Review
												</Badge>
											) : a.status == 'ACCEPTED' ? (
												<Badge variant="gradient" gradient={{ from: 'green', to: 'lime' }}>
													Accepted
												</Badge>
											) : a.status == 'TRIAL' ? (
												<Badge variant="gradient" gradient={{ from: 'green', to: 'lime' }}>
													Trial
												</Badge>
											) : (
												<Badge variant="gradient" gradient={{ from: 'red', to: 'orange' }}>
													Rejected
												</Badge>
											)}
										</Table.Td>
										<Table.Td>{a.trial ? 'Yes' : 'No'}</Table.Td>
										<Table.Td>
											<Tooltip
												withinPortal
												label={a.createdAt ? vagueTime.get({ to: new Date(a.createdAt) }) : ''}
												position="top-start"
											>
												<p>{new Date(a.createdAt).toLocaleDateString()} </p>
											</Tooltip>
										</Table.Td>
										<Table.Td>
											<Group gap={0} justify="flex-end">
												<ActionIcon
													variant="subtle"
													component={Link}
													href={`/teams/${team}/manage/review/${a.id}`}
												>
													<IconChevronRight />
												</ActionIcon>
											</Group>
										</Table.Td>
									</Table.Tr>
								))}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
				<Group justify="center" pt="md">
					<Pagination
						my="md"
						total={data?.length >= 1 ? Math.floor(data?.length / 20) : 1}
						radius="xs"
						value={activePage}
						onChange={setPage}
						siblings={1}
					/>
				</Group>
			</SettingsTabs>
		</Page>
	);
};
export default Review;

export async function getStaticProps({ locale, params }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
			team: params.team,
		},
	};
}
export async function getStaticPaths() {
	const res = await fetcher('/buildteams');
	return {
		paths: res.map((team: any) => ({
			params: {
				team: team.slug,
			},
		})),
		fallback: true,
	};
}

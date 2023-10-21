import { ActionIcon, Badge, Group, Table, Tooltip, rem } from '@mantine/core';
import { IconChevronRight, IconTrash } from '@tabler/icons-react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Page from '../../../../../components/Page';
import SettingsTabs from '../../../../../components/SettingsTabs';
import fetcher from '../../../../../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

var vagueTime = require('vague-time');
const Review = ({ team }: any) => {
	const { data } = useSWR(`/buildteams/${team}/applications?review=true`);
	return (
		<Page
			smallPadding
			head={{
				title: 'Pending Applications',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/teams.png',
			}}
			seo={{ nofollow: true, noindex: true }}
		>
			<SettingsTabs team={team} loading={!data}>
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
							{data?.length > 0 ? (
								data?.map((a: any) => (
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
											) : (
												<Badge variant="gradient" gradient={{ from: 'green', to: 'lime' }}>
													Accepted
												</Badge>
											)}
										</Table.Td>
										<Table.Td>{a.trial ? 'Yes' : 'No'}</Table.Td>
										<Table.Td>
											<Tooltip withinPortal label={a.createdAt ? vagueTime.get({ to: new Date(a.createdAt) }) : ''} position="top-start">
												<p>{new Date(a.createdAt).toLocaleDateString()} </p>
											</Tooltip>
										</Table.Td>
										<Table.Td>
											<Group gap={0} justify="flex-end">
												<ActionIcon variant="subtle" component={Link} href={`/teams/${team}/manage/review/${a.id}`}>
													<IconChevronRight />
												</ActionIcon>
											</Group>
										</Table.Td>
									</Table.Tr>
								))
							) : (
								<Table.Tr>
									<Table.Td>
										<p>--------</p>
									</Table.Td>
									<Table.Td>
										<Badge color="gray">None</Badge>
									</Table.Td>
									<Table.Td>--</Table.Td>
									<Table.Td>
										<p>--</p>
									</Table.Td>
									<Table.Td>
										<Group gap={0} justify="flex-end">
											<ActionIcon variant="subtle" disabled>
												<IconChevronRight />
											</ActionIcon>
										</Group>
									</Table.Td>
								</Table.Tr>
							)}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
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
				team: team.id,
			},
		})),
		fallback: true,
	};
}

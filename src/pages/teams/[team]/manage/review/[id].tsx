import { ActionIcon, Alert, Badge, Button, Divider, Grid, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { IconCheck, IconCopy, IconLink, IconUsersGroup, IconX } from '@tabler/icons-react';

import { ApplicationQuestions } from '../../../../../utils/application/ApplicationQuestions';
import { IconUser } from '@tabler/icons';
import Link from 'next/link';
import { NextPage } from 'next';
import Page from '../../../../../components/Page';
import SettingsTabs from '../../../../../components/SettingsTabs';
import fetcher from '../../../../../utils/Fetcher';
import { useClipboard } from '@mantine/hooks';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Apply: NextPage = ({ data: questions, team, id }: any) => {
	const router = useRouter();
	const theme = useMantineTheme();
	const clipboard = useClipboard();
	const { data } = useSWR(`/buildteams/${team}/applications/${id}?includeAnswers=true`);

	return (
		<Page
			head={{
				title: 'Review Application',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/apply.png',
			}}
		>
			<SettingsTabs team={team} loading={!data}>
				{data && (
					<Grid>
						<Grid.Col span={{ md: 6 }} pr="lg">
							<h2>Answers</h2>
							{data?.ApplicationAnswer?.map((a: any, i: number) => {
								const d = a.question;
								const Question = ApplicationQuestions[d.type];
								return <Question key={d.id} {...d} style={{ marginTop: i > 0 && theme.spacing.md }} readonly={true} value={a.answer} />;
							})}
						</Grid.Col>
						<Grid.Col span={{ md: 6 }} pl="lg">
							<h2>Application Details</h2>
							<Stack gap={0}>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Id</Text>
									<Text>{data.id} </Text>
								</Group>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Created At</Text>
									<Text>{new Date(data.createdAt).toLocaleString()} </Text>
								</Group>
								{data.reviewedAt && (
									<>
										<Divider style={{ margin: '0' }} my="sm" />
										<Group justify="space-between">
											<Text>Reviewed At</Text>
											<Text>{new Date(data.reviewedAt).toLocaleString()} </Text>
										</Group>
									</>
								)}
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Trial</Text>
									<Text>{data.trial ? 'Yes' : 'No'} </Text>
								</Group>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Status</Text>
									<Badge variant="gradient">{statusToString(data.status)}</Badge>
								</Group>
							</Stack>
							<h2>Actions</h2>
							{data.status == 'SEND' ? (
								<Group>
									<Button leftSection={<IconCheck />} onClick={() => clipboard.copy(data.userId)} color="green">
										Accept
									</Button>
									<Button leftSection={<IconX />} onClick={() => clipboard.copy(data.userId)} color="red">
										Decline
									</Button>
								</Group>
							) : (
								<Alert title="Reviewer Feedback">{data.reason}</Alert>
							)}
						</Grid.Col>
					</Grid>
				)}
			</SettingsTabs>
		</Page>
	);
};
export default Apply;
export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/buildteams/${params.team}/application/questions`);
	return {
		props: {
			data: res,
			team: params.team,
			id: params.id,
		},
	};
}
export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

function statusToString(status: string) {
	switch (status) {
		case 'SEND':
			return 'Received';
		case 'REVIEWING':
			return 'Under Review';
		case 'ACCEPTED':
			return 'Accepted';
		case 'DECLINED':
			return 'Declined';
		case 'TRIAL':
			return 'Trial Accepted';
		default:
			return 'Unknown';
	}
}

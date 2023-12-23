import {
	Alert,
	Badge,
	Button,
	Divider,
	Grid,
	Group,
	Stack,
	Text,
	Textarea,
	useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import useSWR, { mutate } from 'swr';

import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '../../../../../components/Page';
import SettingsTabs from '../../../../../components/SettingsTabs';
import { useUser } from '../../../../../hooks/useUser';
import { ApplicationQuestions } from '../../../../../utils/application/ApplicationQuestions';
import fetcher from '../../../../../utils/Fetcher';

const Apply: NextPage = ({ team, id }: any) => {
	const theme = useMantineTheme();
	const user = useUser();
	const { data } = useSWR(
		`/buildteams/${team}/applications/${id}?includeAnswers=true&includeUser=true&slug=true`,
	);

	const handleSubmit = (accept: boolean) => {
		const body = { reason: '', status: accept ? (data.trial ? 'TRIAL' : 'ACCEPTED') : 'DECLINED' };

		const continueSubmit = () => {
			fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${team}/applications/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token,
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.errors || res.message) {
						showNotification({
							title: 'Update failed',
							message: res.message,
							color: 'red',
						});
					} else {
						showNotification({
							title: `Application ${accept ? 'accepted' : 'declined'}`,
							message: 'All Data has been saved',
							color: 'green',
							icon: <IconCheck />,
						});
						mutate(
							`/buildteams/${team}/applications/${id}?includeAnswers=true&includeUser=true&slug=true`,
							res,
						);
					}
				});
		};

		if (!accept) {
			modals.openConfirmModal({
				title: 'Decline Application',
				children: (
					<>
						<Text size="sm">Please enter Feedback below.</Text>
						<Textarea
							placeholder="Feedback"
							autosize
							minRows={3}
							mt="md"
							onChange={(e) => (body.reason = e.target.value)}
						/>
					</>
				),
				labels: { confirm: 'Confirm', cancel: 'Cancel' },
				onCancel: () =>
					showNotification({
						message: `Application was not declined.`,
						title: 'Cancelled application',
						color: 'yellow',
					}),
				onConfirm: continueSubmit,
			});
		} else continueSubmit();
	};

	return (
		<Page
			head={{
				title: 'Review Application',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/apply.png',
			}}
			requiredPermissions={['team.application.review']}
			loading={!data}
		>
			<SettingsTabs team={team} loading={!data}>
				{data && (
					<Grid>
						<Grid.Col span={{ md: 6 }} pr="lg">
							<h2>Answers</h2>
							{data?.ApplicationAnswer?.map((a: any, i: number) => {
								const d = a.question;
								const Question = ApplicationQuestions[d.type];
								return (
									<Question
										key={d.id}
										{...d}
										style={{ marginTop: i > 0 && theme.spacing.md }}
										readonly={true}
										value={a.answer}
									/>
								);
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
									<Text>Discord Id</Text>
									<Text>{data?.user?.discordId} </Text>
								</Group>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Minecraft Name</Text>
									<Text>{data?.user?.name} </Text>
								</Group>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Trial</Text>
									<Text>{data.trial ? 'Yes' : 'No'} </Text>
								</Group>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Status</Text>
									<Badge variant="gradient" gradient={statusToGradient(data.status)}>
										{statusToString(data.status)}
									</Badge>
								</Group>
							</Stack>
							{data.status != 'SEND' && (
								<Alert title="Reviewer Feedback" mt="md">
									{data.reason || '-- None provided --'}
								</Alert>
							)}
							<h2>Actions</h2>
							<Group>
								<Button
									leftSection={<IconCheck />}
									onClick={() => handleSubmit(true)}
									color="green"
								>
									Accept
								</Button>
								<Button leftSection={<IconX />} onClick={() => handleSubmit(false)} color="red">
									Decline
								</Button>
							</Group>
							{data.status != 'SEND' && (
								<Alert title="Warning" mt="md" color="orange">
									This Application was already reviewed, changing its Status may revoke permissions
									from the User.
								</Alert>
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
			...(await serverSideTranslations(locale, ['common', 'teams'])),
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
			return 'Rejected';
		case 'TRIAL':
			return 'Trial Accepted';
		default:
			return 'Unknown';
	}
}
function statusToGradient(status: string) {
	switch (status) {
		case 'SEND':
			return undefined;
		case 'REVIEWING':
			return { from: 'orange', to: 'yellow' };
		case 'ACCEPTED':
			return { from: 'green', to: 'lime' };
		case 'DECLINED':
			return { from: 'red', to: 'orange' };
		case 'TRIAL':
			return { from: 'green', to: 'lime' };
		default:
			return undefined;
	}
}

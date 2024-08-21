/* eslint-disable react-hooks/exhaustive-deps */

import {
	ActionIcon,
	Alert,
	Badge,
	Button,
	Code,
	Divider,
	Grid,
	Group,
	Select,
	Stack,
	Text,
	TextInput,
	Tooltip,
	useMantineTheme,
} from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { IconCheck, IconCopy, IconPlaceholder, IconReplace, IconX } from '@tabler/icons-react';
import useSWR, { mutate } from 'swr';

import Page from '@/components/Page';
import SettingsTabs from '@/components/SettingsTabs';
import { useAccessToken } from '@/hooks/useAccessToken';
import thumbnail from '@/public/images/thumbnails/apply.png';
import { ApplicationQuestions } from '@/utils/application/ApplicationQuestions';
import fetcher from '@/utils/Fetcher';
import { useClipboard } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { Markdown } from 'tiptap-markdown';

const Apply: NextPage = ({ team, id }: any) => {
	const theme = useMantineTheme();
	const { accessToken } = useAccessToken();
	const clipboard = useClipboard();
	const { data } = useSWR(
		`/buildteams/${team}/applications/${id}?includeAnswers=true&includeUser=true&slug=true`,
	);
	const { data: templateResponses } = useSWR(`/buildteams/${team}/application/templates?slug=true`);

	const responseEditor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Placeholder.configure({ placeholder: 'This is placeholder' }),
			Markdown,
		],
	});

	useEffect(() => {
		if (data?.status != 'SEND' && responseEditor?.isEmpty) {
			responseEditor.commands.setContent(data.reason);
		}
	}, [data]);

	const handleSubmit = (accept: boolean) => {
		fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${team}/applications/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify({
				reason: responseEditor?.storage.markdown.getMarkdown(),
				status: accept ? (data.trial ? 'TRIAL' : 'ACCEPTED') : 'DECLINED',
			}),
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

	const handleSaveNewTemplate = (name: string) => {
		fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${team}/application/templates?slug=true`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify({
				name,
				content: responseEditor?.storage.markdown.getMarkdown(),
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.errors || res.message) {
					showNotification({
						title: 'Creation failed',
						message: res.message,
						color: 'red',
					});
				} else {
					showNotification({
						title: `Template created`,
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					mutate(`/buildteams/${team}/application/templates?slug=true`);
				}
			});
	};

	return (
		<Page
			head={{
				title: 'Review Application',
				image: thumbnail,
			}}
			requiredPermissions={{
				buildteam: team,
				permissions: ['team.application.review'],
			}}
			loading={!data}
		>
			<SettingsTabs team={team} loading={!data}>
				{data && (
					<Grid>
						<Grid.Col span={{ md: 6 }} pr="lg">
							<h2>Answers</h2>
							{data?.ApplicationAnswer?.sort(
								(a: any, b: any) => a.question.sort - b.question.sort,
							).map((a: any, i: number) => {
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
							<h2>Details</h2>
							<Stack gap={0}>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>ID</Text>
									<Text>{data.id} </Text>
								</Group>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Created At</Text>
									<Code>{new Date(data.createdAt).toLocaleString()} </Code>
								</Group>
								{data.reviewedAt && (
									<>
										<Divider style={{ margin: '0' }} my="sm" />
										<Group justify="space-between">
											<Text>Reviewed At</Text>
											<Code>{new Date(data.reviewedAt).toLocaleString()} </Code>
										</Group>
									</>
								)}
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Discord Name</Text>
									<Tooltip label={'Click to copy ID'}>
										<Group>
											<Text>{data?.user?.username} </Text>
											<ActionIcon
												variant="light"
												color="gray"
												onClick={() => clipboard.copy(data?.user?.discordId)}
											>
												<IconCopy />
											</ActionIcon>
										</Group>
									</Tooltip>
								</Group>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Minecraft Name</Text>
									<Text>{data?.user?.minecraft || '--'}</Text>
								</Group>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Trial</Text>
									<Badge
										variant="gradient"
										gradient={
											data.trial ? { from: 'green', to: 'lime' } : { from: 'red', to: 'orange' }
										}
									>
										{data.trial ? 'Yes' : 'No'}{' '}
									</Badge>
								</Group>
								<Divider style={{ margin: '0' }} my="sm" />
								<Group justify="space-between">
									<Text>Status</Text>
									<Badge variant="gradient" gradient={statusToGradient(data.status)}>
										{statusToString(data.status)}
									</Badge>
								</Group>
								{data.status != 'SEND' && (
									<>
										<Divider style={{ margin: '0' }} my="sm" />
										<Group justify="space-between">
											<Text>Reviewer</Text>
											<Text>{data?.reviewer?.username} </Text>
										</Group>
									</>
								)}
							</Stack>
						</Grid.Col>
						<Grid.Col span={12}>
							<h2>Actions</h2>
							{data.status != 'SEND' && (
								<>
									<Alert title="Warning" color="orange" mb="md">
										This Application was already reviewed, changing its Status may revoke
										permissions from the User. The original Reviewer Response is listed below.
									</Alert>
								</>
							)}

							<RichTextEditor editor={responseEditor} mb="md" mih="200px">
								<RichTextEditor.Toolbar sticky stickyOffset={60}>
									<RichTextEditor.ControlsGroup>
										<InsertReviewTemplateControl templates={templateResponses} />
									</RichTextEditor.ControlsGroup>

									<RichTextEditor.ControlsGroup>
										<RichTextEditor.Bold />
										<RichTextEditor.Italic />
										<RichTextEditor.Underline />
										<RichTextEditor.Strikethrough />
										<RichTextEditor.ClearFormatting />
										<RichTextEditor.Code />
									</RichTextEditor.ControlsGroup>

									<RichTextEditor.ControlsGroup>
										<RichTextEditor.H1 />
										<RichTextEditor.H2 />
										<RichTextEditor.H3 />
										<RichTextEditor.H4 />
									</RichTextEditor.ControlsGroup>

									<RichTextEditor.ControlsGroup>
										<RichTextEditor.Blockquote />
										<RichTextEditor.Hr />
										<RichTextEditor.BulletList />
										<RichTextEditor.OrderedList />
										<RichTextEditor.Subscript />
										<RichTextEditor.Superscript />
									</RichTextEditor.ControlsGroup>

									<RichTextEditor.ControlsGroup>
										<RichTextEditor.Link />
										<RichTextEditor.Unlink />
									</RichTextEditor.ControlsGroup>

									<RichTextEditor.ControlsGroup>
										<RichTextEditor.Undo />
										<RichTextEditor.Redo />
									</RichTextEditor.ControlsGroup>
								</RichTextEditor.Toolbar>

								<RichTextEditor.Content />
							</RichTextEditor>
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
								<Button
									leftSection={<IconReplace />}
									onClick={() => {
										let name = '';
										modals.openConfirmModal({
											title: 'New Template Response',
											centered: true,
											children: (
												<>
													<Text size="sm">
														You need to give the template a name to be able to reference it later.
													</Text>
													<TextInput
														placeholder="My new Template"
														label="Name"
														mt="md"
														onChange={(e) => (name = e.target.value)}
													/>
												</>
											),
											labels: { confirm: 'Create Template', cancel: 'Cancel' },
											onCancel: () =>
												showNotification({
													message: `Template was not declined.`,
													title: 'Cancelled creation',
													color: 'yellow',
												}),
											onConfirm: () => handleSaveNewTemplate(name),
										});
									}}
									variant="outline"
								>
									Save Feedback as Template
								</Button>
							</Group>
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

function InsertReviewTemplateControl({
	templates,
}: {
	templates: { name: string; id: string; content: string }[];
}) {
	const { editor } = useRichTextEditorContext();
	return (
		<RichTextEditor.Control aria-label="Insert response template" title="Insert response template">
			<Select
				size="xs"
				placeholder="Custom Message"
				variant="unstyled"
				leftSection={<IconPlaceholder stroke={1.5} size="1rem" />}
				data={[
					{
						group: 'Response Templates',
						items: templates
							.sort((a: any, b: any) => a.name.localeCompare(b.name))
							.map((t) => ({ label: t.name, value: t.id })),
					},
				]}
				onChange={(_value, option) => {
					if (option) {
						editor?.commands.setContent(
							templates.find((t) => t.id == option.value)?.content || '-',
						);
					} else {
						editor?.commands.setContent('');
					}
				}}
				// renderOption={({ option, checked }) => (
				// 	<Group flex="1" gap="xs">
				// 		{checked && (
				// 			<IconCheck
				// 				style={{ marginInlineStart: 'auto' }}
				// 				stroke={1.5}
				// 				color="currentColor"
				// 				opacity={0.6}
				// 				size={18}
				// 			/>
				// 		)}
				// 		{option && option.label} -d
				// 	</Group>
				// )}
			/>
		</RichTextEditor.Control>
	);
}

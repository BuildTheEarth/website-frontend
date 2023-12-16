import {
	ActionIcon,
	Anchor,
	Button,
	Card,
	Divider,
	Group,
	Menu,
	Modal,
	SegmentedControl,
	Stack,
	Switch,
	Text,
	TextInput,
	Title,
	useMantineTheme,
} from '@mantine/core';
import {
	ApplicationQuestions,
	toReadable,
} from '../../../../utils/application/ApplicationQuestions';
import {
	IconCheck,
	IconChevronDown,
	IconChevronUp,
	IconLetterT,
	IconPlus,
} from '@tabler/icons-react';
import Question, { EditQuestion } from '../../../../components/application/questions/Question';

import Icon from '../../../../components/Icon';
import Link from 'next/link';
import { NextPage } from 'next';
import Page from '../../../../components/Page';
import SettingsTabs from '../../../../components/SettingsTabs';
import fetcher from '../../../../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '../../../../hooks/useUser';
import { v4 as uuidv4 } from 'uuid';

const Apply: NextPage = ({ data: tempData, team }: any) => {
	const [trial, setTrial] = useState(false);
	const theme = useMantineTheme();
	const router = useRouter();
	const user = useUser();
	const [data, setData] = useState(tempData);
	const [editingQuestion, setEditingQuestion] = useState<any>(null);
	const [saveLoading, setSaveLoading] = useState(false);

	const handleUpdateQuestion = (id: string, question: any) => {
		const updatedData = data.map((d: any) => {
			if (d.id === id) {
				return { ...d, ...question };
			}
			return d;
		});
		setData(updatedData);
	};
	const handleAddQuestion = (question: any) => {
		const updatedData = [...data, { ...question }];
		setData(updatedData);
	};
	const handleDeleteQuestion = (id: string) => {
		handleUpdateQuestion(id, { sort: -1 });
	};
	const handleUpdateEditingQuestion = (question: any, additional?: boolean) => {
		if (additional) {
			setEditingQuestion({
				...editingQuestion,
				additionalData: { ...editingQuestion.additionalData, ...question },
			});
		} else {
			setEditingQuestion({ ...editingQuestion, ...question });
		}
	};

	const handleSubmit = async () => {
		setSaveLoading(true);

		setData(reduceSortValues(data));

		if (data.length < 1) {
			showNotification({
				title: 'Settings updated',
				message: 'All Data has been saved',
				color: 'green',
				icon: <IconCheck />,
			});
			setSaveLoading(false);

			return;
		}

		fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${team}/application/questions?slug=true`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					showNotification({
						title: 'Update failed',
						message: res.error,
						color: 'red',
					});
					setSaveLoading(false);
				} else {
					showNotification({
						title: 'Settings updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					setData(res);
					setSaveLoading(false);
				}
			});
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Edit Application Questions',
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
				<Modal
					zIndex={9999}
					opened={editingQuestion != null}
					onClose={() => setEditingQuestion(null)}
					title="Edit Question"
					centered
					size="lg"
				>
					<TextInput
						required
						defaultValue={editingQuestion?.title}
						label="Title"
						description="The question title"
						mb="md"
						onChange={(e) => handleUpdateEditingQuestion({ title: e.target.value })}
					/>
					<Group grow>
						<TextInput
							defaultValue={editingQuestion?.subtitle}
							label="Subtitle"
							description="The question subtitle"
							mb="md"
							onChange={(e) => handleUpdateEditingQuestion({ subtitle: e.target.value })}
						/>
						<TextInput
							defaultValue={editingQuestion?.placeholder}
							label="Placeholder"
							description="The question placeholder"
							mb="md"
							onChange={(e) => handleUpdateEditingQuestion({ placeholder: e.target.value })}
						/>
					</Group>
					<Group grow>
						<Switch
							defaultChecked={editingQuestion?.required}
							label="Required Question"
							description="If this question has to be answered"
							onChange={(e) => handleUpdateEditingQuestion({ required: e.target.checked })}
						/>
						<TextInput
							defaultValue={editingQuestion?.icon}
							label="Icon"
							description="The question icon"
							mb="md"
							onChange={(e) => handleUpdateEditingQuestion({ icon: e.target.value })}
						/>
					</Group>
					{editingQuestion?.type && (
						<EditQuestion
							type={editingQuestion?.type}
							editingQuestion={editingQuestion}
							handleUpdateEditingQuestion={handleUpdateEditingQuestion}
						/>
					)}
					<Text c="dimmed" size="sm" mt="md">
						A list of all Supported Icons can be found at{' '}
						<Anchor component={Link} href="https://tabler-icons.io/" target="_blank">
							tabler-icons
						</Anchor>
					</Text>
					<Button
						mt="md"
						onClick={() => {
							handleUpdateQuestion(editingQuestion?.id, editingQuestion);

							setEditingQuestion(null);
						}}
					>
						Save
					</Button>
					<Button
						variant="outline"
						ml="sm"
						onClick={() => {
							handleDeleteQuestion(editingQuestion?.id);
							setEditingQuestion(null);
						}}
					>
						Delete
					</Button>
					<Divider my="md" label="Example" labelPosition="center" />
					{editingQuestion?.type && <Question {...editingQuestion} />}
				</Modal>
				<Group grow>
					<div>
						<SegmentedControl
							disabled={saveLoading}
							onChange={(value) => {
								setTrial(value === '1');
							}}
							color="blue"
							mb="md"
							styles={{ label: { minWidth: 100 } }}
							data={[
								{ label: 'Builder', value: '0' },
								{ label: 'Trial', value: '1' },
							]}
						/>
					</div>
					<Group justify="flex-end">
						<Button loading={saveLoading} onClick={handleSubmit}>
							Save
						</Button>
						<Menu withinPortal>
							<Menu.Target>
								<Button leftSection={<IconPlus />} pr={12} variant="outline" disabled={saveLoading}>
									Add new Question
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								{Object.keys(ApplicationQuestions).map((q: string, i: number) => {
									const Question = ApplicationQuestions[q];
									const QIcon = Question.icon || IconLetterT;
									return (
										<Menu.Item
											key={i}
											leftSection={<QIcon size="1rem" color={theme.colors.blue[6]} stroke={1.5} />}
											onClick={() => {
												const newQuestion = {
													id: uuidv4(),
													title: 'New Question',
													subtitle: '',
													placeholder: '',
													required: false,
													type: q,
													icon: 'question-mark',
													additionalData: Question.mockdata,
													buildTeamId: router.query.id,
													sort:
														data?.filter((d: any) => d.trial == trial).length > 1
															? data?.filter((d: any) => d.trial == trial)?.slice(-1)[0]?.sort + 1
															: 1,
													trial,
												};
												handleAddQuestion(newQuestion);
												setEditingQuestion(newQuestion);
											}}
											disabled={q.toLowerCase() == 'city' || q.toLowerCase() == 'image'}
										>
											{toReadable(Question)}
										</Menu.Item>
									);
								})}
							</Menu.Dropdown>
						</Menu>
					</Group>
				</Group>
				{data
					?.filter((d: any) => d.trial == trial && d.sort >= 0)
					.sort((a: any, b: any) => a.sort - b.sort)
					.map((d: any, i: any) => (
						<Card key={d.id} withBorder mt={i > 0 ? 'md' : undefined}>
							<Group style={{ display: 'flex' }}>
								<Stack gap={0}>
									<ActionIcon
										variant={i == 0 ? 'transparent' : 'subtle'}
										disabled={i == 0}
										onClick={() => {
											handleUpdateQuestion(d.id, { sort: d.sort - 1 });
										}}
									>
										<IconChevronUp />
									</ActionIcon>
									<ActionIcon
										variant={
											i == data.filter((d: any) => d.trial == trial).length - 1
												? 'transparent'
												: 'subtle'
										}
										disabled={i == data.filter((d: any) => d.trial == trial).length - 1}
										onClick={() => {
											handleUpdateQuestion(d.id, { sort: d.sort + 1 });
										}}
									>
										<IconChevronDown />
									</ActionIcon>
								</Stack>
								<Divider orientation="vertical" />
								<Stack
									gap={0}
									style={{ cursor: 'pointer', flexGrow: 1 }}
									onClick={() => setEditingQuestion(d)}
								>
									<Title order={4} style={{ display: 'flex', alignItems: 'center' }}>
										<Icon name={d.icon} style={{ height: 20, marginRight: 4 }} /> {d.title}
									</Title>
									<Text c="dimmed">{toReadable(ApplicationQuestions[d.type])}</Text>
								</Stack>
							</Group>
						</Card>
					))}
			</SettingsTabs>
		</Page>
	);
};
export default Apply;

export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/buildteams/${params.team}/application/questions?slug=true`);
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
			data: res,
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

function reduceSortValues(data: any[]) {
	const dataTrial = data
		.filter((d) => d.trial == true && d.sort >= 0)
		.sort((a, b) => a.sort - b.sort)
		.map((d, i) => ({ ...d, sort: i }));
	const dataBuilder = data
		.filter((d) => d.trial == false && d.sort >= 0)
		.sort((a, b) => a.sort - b.sort)
		.map((d, i) => ({ ...d, sort: i }));
	return [...dataBuilder, ...dataTrial];
}

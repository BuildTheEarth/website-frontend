import Question, { EditQuestion } from '@/components/application/questions/Question';
import { ApplicationQuestions, toReadable } from '@/utils/application/ApplicationQuestions';
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
	IconCheck,
	IconChevronDown,
	IconChevronUp,
	IconLetterT,
	IconPlus,
} from '@tabler/icons-react';

import Icon from '@/components/Icon';
import Page from '@/components/Page';
import SettingsTabs from '@/components/SettingsTabs';
import { useAccessToken } from '@/hooks/useAccessToken';
import thumbnail from '@/public/images/thumbnails/teams.png';
import fetcher from '@/utils/Fetcher';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Apply: NextPage = ({ data: tempData, team }: any) => {
	const [trial, setTrial] = useState(false);
	const theme = useMantineTheme();
	const router = useRouter();
	const { accessToken } = useAccessToken();
	const [data, setData] = useState(tempData?.filter((d: any) => d?.sort >= 0));
	const [deletedData, setDeletedData] = useState(tempData?.filter((d: any) => d.sort < 0));
	const [editingQuestion, setEditingQuestion] = useState<any>(null);
	const [saveLoading, setSaveLoading] = useState(false);

	const handleUpdateQuestion = (id: string, question: any, skipCalc?: boolean) => {
		const updatedData = data.map((d: any) => {
			if (d.id === id) {
				return { ...d, ...question };
			}
			return d;
		});
		if (skipCalc) {
			setData(updatedData);
		} else {
			recalculate(updatedData);
		}
	};

	const handleMoveUp = (i: number) => {
		if (i > 0 && i < data.length) {
			let updatedData = [...data.filter((d: any) => d.trial == trial)];
			let temp = updatedData[i];
			updatedData.splice(i, 1);
			updatedData.splice(i - 1, 0, temp);
			recalculate([
				...updatedData.map((d: any, i: number) => ({ ...d, sort: i })),
				...data.filter((d: any) => d.trial != trial),
			]);
		}
	};
	const handleMoveDown = (i: number) => {
		if (i >= 0 && i < data.length) {
			let updatedData = [...data.filter((d: any) => d.trial == trial)];
			let temp = updatedData[i];
			updatedData.splice(i, 1);
			updatedData.splice(i + 1, 0, temp);
			recalculate([
				...updatedData.map((d: any, i: number) => ({ ...d, sort: i })),
				...data.filter((d: any) => d.trial != trial),
			]);
		}
	};

	const handleAddQuestion = (question: any) => {
		const updatedData = [...data, { ...question }];
		setData(updatedData);
	};

	const handleDeleteQuestion = (id: string) => {
		setData(data?.filter((d: any) => d.id !== id));
		const d = data.find((d: any) => d.id === id);
		setDeletedData([...deletedData, { ...d, sort: -1 }]);
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

	const recalculate = (d?: any) => {
		if (d) setDeletedData([...deletedData, ...d?.filter((d: any) => d.sort < 0)]);

		setData(reduceSortValues(d ? d?.filter((d: any) => d.sort >= 0) : data));
	};

	const handleSubmit = async () => {
		setSaveLoading(true);

		recalculate();

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
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify([...data, ...deletedData]),
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
					setData(res?.filter((d: any) => d.sort >= 0));
					setDeletedData(res?.filter((d: any) => d.sort < 0));
					setSaveLoading(false);
				}
			});
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Edit Application Questions',
				image: thumbnail,
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={{
				buildteam: team,
				permissions: ['team.application.edit', 'team.application.list'],
			}}
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
							color="cyan"
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
										disabled={i == 0 || d.sort <= 0}
										onClick={() => {
											handleMoveUp(i);
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
											handleMoveDown(i);
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
										<Icon name={d.icon} style={{ height: 20, marginRight: 4 }} />
										{d.sort + 1}. {d.title}
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
		revalidate: 60 * 60, // Every hour
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
		?.filter((d) => d.trial == true && d.sort >= 0)
		.sort((a, b) => a.sort - b.sort)
		.map((d, i) => ({ ...d, sort: i }));
	const dataBuilder = data
		?.filter((d) => d.trial == false && d.sort >= 0)
		.sort((a, b) => a.sort - b.sort)
		.map((d, i) => ({ ...d, sort: i }));
	return [...dataBuilder, ...dataTrial];
}

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
	ApplicationQuestion,
	ApplicationQuestions,
	toReadable,
} from '../../../../utils/application/ApplicationQuestions';
import { IconChevronDown, IconChevronUp, IconLetterT, IconPlus } from '@tabler/icons';
import Question, { EditQuestion } from '../../../../components/application/questions/Question';

import App from 'next/app';
import Icon from '../../../../components/Icon';
import Link from 'next/link';
import { NextPage } from 'next';
import Page from '../../../../components/Page';
import SettingsTabs from '../../../../components/SettingsTabs';
import TextQuestion from '../../../../components/application/questions/TextQuestion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const tempData = [
	{
		id: 'c52c53a9-5334-4055-a75f-53fa5b5d6abc',
		title: 'How are you?',
		subtitle: 'Honestly',
		placeholder: 'Great',
		required: true,
		type: 'SHORT_INPUT',
		icon: 'question-mark',
		additionalData: {},
		buildTeamId: '03c6ff11-0d72-4ed7-9c5d-f75abe03c4d3',
		sort: 0,
		trial: false,
	},
	{
		id: 'cdw5g9-5334-4055-a75f-53fa5b5d6abc',
		title: 'Sorted 1 at beginning',
		subtitle: 'Honestly',
		placeholder: 'Great',
		required: true,
		type: 'SHORT_INPUT',
		icon: 'question-mark',
		additionalData: {},
		buildTeamId: '03c6ff11-0d72-4ed7-9c5d-f75abe03c4d3',
		sort: 1,
		trial: false,
	},
	{
		id: '03bf2fad-c2f6-4044-a8a9-589b76dfbd00',
		title: 'Question two',
		subtitle: 'Answer this',
		placeholder: '',
		required: false,
		type: 'CHECKBOX',
		icon: 'question-mark',
		additionalData: {},
		buildTeamId: '03c6ff11-0d72-4ed7-9c5d-f75abe03c4d3',
		sort: 0,
		trial: true,
	},
];

const Apply: NextPage = () => {
	const [trial, setTrial] = useState(false);
	const theme = useMantineTheme();
	const [data, setData] = useState(tempData);
	const [editingQuestion, setEditingQuestion] = useState<any>(null);
	const [saveLoading, setSaveLoading] = useState(false);

	const handleUpdateQuestion = (id: string, question: any) => {
		const updatedData = data.map((d) => {
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
		const updatedData = data.filter((d) => d.id !== id);
		setData(updatedData);
	};
	const handleUpdateEditingQuestion = (question: any) => {
		setEditingQuestion({ ...editingQuestion, ...question });
	};

	const handleSubmit = async () => {
		setSaveLoading(true);

		// Reduce sort values to lowest possible
		setData(reduceSortValues(data));

		// TODO: put api

		setSaveLoading(false);
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Edit Application Questions',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/teams.png',
			}}
			seo={{ nofollow: true, noindex: true }}
		>
			<SettingsTabs team={'03c6ff11-0d72-4ed7-9c5d-f75abe03c4d3'}>
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
					{editingQuestion?.type && <EditQuestion type={editingQuestion?.type} {...editingQuestion.additionalData} />}
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
													buildTeamId: data[0].buildTeamId,
													sort: data.filter((d) => d.trial == trial).slice(-1)[0].sort + 1,
													trial,
												};
												handleAddQuestion(newQuestion);
												setEditingQuestion(newQuestion);
											}}
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
					.filter((d) => d.trial == trial)
					.sort((a, b) => a.sort - b.sort)
					.map((d, i) => (
						<Card key={d.id} withBorder mt={i > 0 ? 'md' : undefined}>
							<Group style={{ display: 'flex' }}>
								<Stack gap={0}>
									<ActionIcon
										variant={i == 0 ? 'transparent' : undefined}
										disabled={i == 0}
										onClick={() => {
											handleUpdateQuestion(d.id, { sort: d.sort - 1 });
										}}
									>
										<IconChevronUp />
									</ActionIcon>
									<ActionIcon
										variant={i == data.filter((d) => d.trial == trial).length - 1 ? 'transparent' : undefined}
										disabled={i == data.filter((d) => d.trial == trial).length - 1}
										onClick={() => {
											handleUpdateQuestion(d.id, { sort: d.sort + 1 });
										}}
									>
										<IconChevronDown />
									</ActionIcon>
								</Stack>
								<Divider orientation="vertical" />
								<Stack gap={0} style={{ cursor: 'pointer', flexGrow: 1 }} onClick={() => setEditingQuestion(d)}>
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
export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}
export default Apply;

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

function reduceSortValues(data: any[]) {
	const dataTrial = data
		.filter((d) => d.trial == true)
		.sort((a, b) => a.sort - b.sort)
		.map((d, i) => ({ ...d, sort: i }));
	const dataBuilder = data
		.filter((d) => d.trial == false)
		.sort((a, b) => a.sort - b.sort)
		.map((d, i) => ({ ...d, sort: i }));
	return [...dataBuilder, ...dataTrial];
}

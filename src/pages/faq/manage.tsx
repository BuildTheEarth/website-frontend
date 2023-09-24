import { ActionIcon, Button, Group, Input, SimpleGrid, TextInput } from '@mantine/core';
import { IconCheck, IconChevronLeft, IconPlus, IconQuestionMark } from '@tabler/icons';
import useSWR, { mutate } from 'swr';

import { GridButton } from '../../components/GridButton';
import { NextPage } from 'next';
import Page from '../../components/Page';
import RTE from '../../components/RTE';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { v4 as uuidv4 } from 'uuid';

const Faq: NextPage = () => {
	const { data } = useSWR(`/faq`);
	const [loading, setLoading] = useState({ loading: false, error: null });
	const [action, setAction] = useState('Select');
	const user = useUser();
	const form = useForm({ initialValues: { id: '', question: '', answer: '', links: [] } });

	const handleSubmit = (e: any) => {
		setLoading({ loading: true, error: null });
		switch (action) {
			case 'Edit':
				handleEdit(e);
				break;
			case 'Delete':
				handleDelete(e);
				break;
			case 'Add':
				handleAdd(e);
				break;
		}
	};

	const handleEdit = (e: any) => {
		fetch(process.env.NEXT_PUBLIC_API_URL + `/faq/${form.values.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify({
				question: form.values.question,
				answer: form.values.answer,
				links: form.values.links,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					showNotification({
						title: 'Update failed',
						message: res.error,
						color: 'red',
					});
					setLoading({ loading: false, error: res.error });
				} else {
					mutate('/faq');
					showNotification({
						title: 'Question updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					setLoading({ loading: false, error: null });
					form.reset();
					setAction('Select');
				}
			});
	};

	const handleDelete = (e: any) => {
		fetch(process.env.NEXT_PUBLIC_API_URL + `/faq/${form.values.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					showNotification({
						title: 'Delete failed',
						message: res.error,
						color: 'red',
					});
					setLoading({ loading: false, error: res.error });
				} else {
					mutate('/faq');
					showNotification({
						title: 'Delete updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					setLoading({ loading: false, error: null });
					form.reset();
					setAction('Select');
				}
			});
	};

	const handleAdd = (e: any) => {
		fetch(process.env.NEXT_PUBLIC_API_URL + `/faq`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify({
				question: form.values.question,
				answer: form.values.answer,
				links: form.values.links,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					showNotification({
						title: 'Adding failed',
						message: res.error,
						color: 'red',
					});
					setLoading({ loading: false, error: res.error });
				} else {
					mutate('/faq');
					showNotification({
						title: 'Question added',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					setLoading({ loading: false, error: null });
					form.reset();
					setAction('Select');
				}
			});
	};

	return (
		<Page
			head={{
				title: 'Edit FAQ',
				image: 'https://cdn.buildtheearth.net/static/placeholder.webp',
			}}
			seo={{ nofollow: true, noindex: true }}
		>
			{!data ? (
				<></>
			) : action == 'Select' ? (
				<>
					<h2>{action} FAQ Question</h2>
					<SimpleGrid cols={2}>
						{data?.map((q: any) => (
							<GridButton
								text={q.question}
								icon={<IconQuestionMark />}
								key={q.id}
								onClick={() => {
									setAction('Edit');
									form.setValues({
										id: q.id,
										question: q.question,
										answer: q.answer,
										links: q.links,
									});
								}}
							/>
						))}
						<GridButton
							solid
							text={'Add new question'}
							icon={<IconPlus />}
							onClick={() => {
								setAction('Add');
								const uuid = uuidv4();
								form.setFieldValue('id', uuid);
							}}
						/>
					</SimpleGrid>
				</>
			) : (
				<>
					<Group gap={0}>
						<ActionIcon
							onClick={() => {
								form.reset();
								setAction('Select');
							}}
							mr="md"
						>
							<IconChevronLeft />
						</ActionIcon>
						<h2>{action} FAQ Question</h2>
					</Group>
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput
							mt="md"
							placeholder="How can i ... ?"
							label="Question"
							description="Question to display on top"
							required
							{...form.getInputProps('question')}
						/>
						<Input.Wrapper label="Answer" mt="md" required description="Answer to the question">
							<RTE style={{ marginTop: '5px' }} {...form.getInputProps('answer')} />
						</Input.Wrapper>
						{action != 'Add' ? (
							<Group mt="md">
								<Button type="submit" loading={loading.loading}>
									Save changes
								</Button>
								<Button variant="outline" onClick={handleDelete} loading={loading.loading}>
									Delete Question
								</Button>
							</Group>
						) : (
							<Button type="submit" mt="md" loading={loading.loading}>
								Add question
							</Button>
						)}
					</form>
				</>
			)}
		</Page>
	);
};

export default Faq;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'faq'])),
		},
	};
}

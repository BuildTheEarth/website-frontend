import { ActionIcon, Button, Group, Input, SimpleGrid, TextInput } from '@mantine/core';
import { IconChevronLeft, IconPlus, IconQuestionMark } from '@tabler/icons-react';

import { GridButton } from '@/components/GridButton';
import Page from '@/components/Page';
import RTE from '@/components/RTE';
import { useAccessToken } from '@/hooks/useAccessToken';
import thumbnail from '@/public/images/thumbnails/faq.png';
import { handleFetch } from '@/utils/Fetcher';
import { useForm } from '@mantine/form';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';

const Faq: NextPage = () => {
	const { data } = useSWR(`/faq`);
	const [loading, setLoading] = useState({ loading: false, error: '' });
	const [action, setAction] = useState('Select');
	const { accessToken } = useAccessToken();
	const form = useForm({ initialValues: { id: '', question: '', answer: '', links: [] } });

	const handleSubmit = (e: any) => {
		setLoading({ loading: true, error: '' });
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

	const handleEdit = handleFetch(`/faq/${form.values.id}`, {
		method: 'POST',
		bodyParser: () => ({
			question: form.values.question,
			answer: form.values.answer,
			links: form.values.links,
		}),
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
		successNotification: { title: 'Question updated' },
		onError: (res) => {
			setLoading({ loading: false, error: res.message });
		},
		onSuccess: () => {
			setLoading({ loading: false, error: '' });
			form.reset();
			setAction('Select');
		},
	});

	const handleDelete = handleFetch(`/faq/${form.values.id}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
		successNotification: { title: 'Question deleted' },
		onError: (res) => {
			setLoading({ loading: false, error: res.message });
		},
		onSuccess: () => {
			setLoading({ loading: false, error: '' });
			form.reset();
			setAction('Select');
		},
	});
	const handleAdd = handleFetch(`/faq`, {
		method: 'POST',
		bodyParser: () => ({
			question: form.values.question,
			answer: form.values.answer,
			links: form.values.links,
		}),
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
		successNotification: { title: 'Question added' },
		onError: (res) => {
			setLoading({ loading: false, error: res.message });
		},
		onSuccess: () => {
			setLoading({ loading: false, error: '' });
			form.reset();
			setAction('Select');
		},
	});

	return (
		<Page
			head={{
				title: 'Edit FAQ',
				image: thumbnail,
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={{ permissions: ['faq.edit', 'faq.remove', 'faq.add'] }}
			loading={!data}
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

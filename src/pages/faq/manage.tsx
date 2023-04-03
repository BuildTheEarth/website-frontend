import {
	Accordion,
	ActionIcon,
	Button,
	Divider,
	Flex,
	Group,
	Input,
	MultiSelect,
	Select,
	SimpleGrid,
	Skeleton,
	Text,
	TextInput,
	useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconChevronLeft, IconEdit, IconQuestionMark } from '@tabler/icons';
import React, { useState } from 'react';

import { GridButton } from '../../components/GridButton';
import { NextPage } from 'next';
import Page from '../../components/Page';
import RTE from '../../components/RTE';
import sanitizeHtml from 'sanitize-html';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';
import { useUser } from '../../hooks/useUser';

const Faq: NextPage = () => {
	const { data } = useSWR(`/faq`);
	const user = useUser();
	const form = useForm({ initialValues: { id: '', question: '', answer: '', links: [] } });

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
				} else {
					showNotification({
						title: 'Question updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
				}
			});
	};

	return (
		<Page
			head={{
				title: 'Edit FAQ',
				image: '/images/placeholder.webp',
				large: true,
			}}
		>
			{!data ? (
				<></>
			) : form.values.id == '' ? (
				<>
					<h2>Select Question to Edit</h2>
					<SimpleGrid cols={3}>
						{data?.map((q: any) => (
							<GridButton
								text={q.question}
								icon={<IconQuestionMark />}
								key={q.id}
								onClick={() => {
									form.setValues({
										id: q.id,
										question: q.question,
										answer: q.answer,
										links: q.links,
									});
								}}
							/>
						))}
					</SimpleGrid>
				</>
			) : (
				<>
					<Group spacing={0}>
						<ActionIcon onClick={() => form.reset()}>
							<IconChevronLeft />
						</ActionIcon>
						<h2>Edit FAQ Question</h2>
					</Group>
					<form onSubmit={form.onSubmit(handleEdit)}>
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
						<Button type="submit" mt="md">
							Save changes
						</Button>
					</form>
				</>
			)}
			<Divider my="md" />
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

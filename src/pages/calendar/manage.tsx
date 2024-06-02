import { Button, NumberInput, Textarea, TextInput } from '@mantine/core';

import Page from '@/components/Page';
import { useAccessToken } from '@/hooks/useAccessToken';
import thumbnail from '@/public/images/thumbnails/faq.png';
import { handleFetch } from '@/utils/Fetcher';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Calendar: NextPage = () => {
	const { accessToken } = useAccessToken();
	const handleAdd = handleFetch(`/calendar?slug=true`, {
		method: 'POST',
		bodyParser: () => ({
			...form.values,
		}),
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
		successNotification: { title: 'Event added' },
		onError: (res) => {},
		onSuccess: () => {
			form.reset();
		},
	});
	const form = useForm({
		initialValues: {
			name: null,
			description: null,
			discordLink: null,
			start: new Date().toISOString(),
			end: new Date().toISOString(),
			city: null,
			country: null,
			buildTeam: null,
		},
		validate: {
			start: (value) => (value ? null : 'Start date is required'),
			end: (value) => (value ? null : 'End date is required'),
			name: (value) => (value ? null : 'Name is required'),
			description: (value) => (value ? null : 'Description is required'),
		},
	});

	const handleSelectDate = (date: Date) => {
		const isSelected =
			form.values.start === date.toISOString()
				? 'start'
				: form.values.end === date.toISOString()
					? 'end'
					: null;

		if (!isSelected) {
			if (date.getTime() < new Date(form.values.start).getTime())
				form.setFieldValue('start', date.toISOString());
			else form.setFieldValue('end', date.toISOString());
			return;
		}

		if (isSelected === 'start') {
			form.setFieldValue('end', date.toISOString());
		}
		if (isSelected === 'end') {
			form.setFieldValue('start', date.toISOString());
		}
	};

	return (
		<Page
			head={{
				title: 'Edit Calendar',
				image: thumbnail,
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={{ permissions: ['calendar.manage'] }}
		>
			<form onSubmit={form.onSubmit(handleAdd)}>
				<h2>Add Calendar Event</h2>
				<TextInput
					label="Event Name"
					{...form.getInputProps('name')}
					required
					placeholder="The Great Event"
					maw="40%"
				/>
				<TextInput
					mt="md"
					label="BuildTeam (Slug)"
					{...form.getInputProps('buildTeam')}
					maw="40%"
					placeholder="de"
				/>
				<TextInput
					mt="md"
					label="City"
					{...form.getInputProps('city')}
					maw="40%"
					placeholder="Berlin"
				/>
				<TextInput
					mt="md"
					label="Country"
					{...form.getInputProps('country')}
					placeholder="Germany"
					maw="40%"
				/>
				<TextInput
					mt="md"
					label="Discord Link"
					required
					{...form.getInputProps('discordLink')}
					placeholder="https://..."
					maw="40%"
				/>
				<Textarea
					mt="md"
					label="Description"
					rows={5}
					{...form.getInputProps('description')}
					maw="40%"
					required
					placeholder="We are building..."
				/>
				<DateInput
					mt="md"
					value={new Date(form.values.start)}
					onChange={(v) => form.setFieldValue('start', v?.toISOString() || '')}
					label="Start Date"
					maw="40%"
					required
				/>
				<DateInput
					mt="md"
					value={new Date(form.values.end)}
					onChange={(v) => form.setFieldValue('end', v?.toISOString() || '')}
					label="End Date"
					maw="40%"
					required
				/>
				<NumberInput
					disabled
					mt="md"
					readOnly
					value={
						Math.floor(
							(new Date(form.values.end).getTime() - new Date(form.values.start).getTime()) /
								(1000 * 3600 * 24),
						) + 1
					}
					maw="40%"
					label="Event length"
				/>
				<Button mt="xl" type="submit" leftSection={<IconPlus />} maw="40%" fullWidth>
					Add Event
				</Button>
			</form>
		</Page>
	);
};

export default Calendar;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

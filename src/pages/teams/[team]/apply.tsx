import { Alert, Button, SegmentedControl, Skeleton, useMantineTheme } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import useSWR, { mutate } from 'swr';

import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import sanitize from 'sanitize-html';
import Page from '../../../components/Page';
import { useUser } from '../../../hooks/useUser';
import fetcher from '../../../utils/Fetcher';
import { ApplicationQuestions } from '../../../utils/application/ApplicationQuestions';

const Apply: NextPage = ({ data, buildteam }: any) => {
	const router = useRouter();
	const team = router.query.team;
	const theme = useMantineTheme();
	const user = useUser();
	const { data: pastApplications } = useSWR(`/buildteams/${buildteam?.id}/applications/user/${user.user?.id}`);
	const { t } = useTranslation('teams');
	const [loading, setLoading] = useState(false);
	const [trial, setTrial] = useState(false);
	const form = useForm({
		validate: generateValidation(data?.filter((d: any) => d.trial == trial)),
	});

	const handleSubmit = (e: any) => {
		setLoading(true);
		fetch(
			process.env.NEXT_PUBLIC_API_URL +
				`/buildteams/${team}/apply${trial ? '?trial=true&slug=true' : ''}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token,
				},
				body: JSON.stringify(e),
			},
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.errors || res.message) {
					showNotification({
						title: t('apply.messages.error'),
						message: res.message,
						color: 'red',
					});
					setLoading(false);
				} else {
					showNotification({
						title: t('apply.messages.success.title'),
						message: t('apply.messages.success.description'),
						color: 'green',
						icon: <IconCheck />,
					});
					setLoading(false);
					mutate(`/buildteams/${buildteam?.id}/applications/user/${user.user?.id}`);
				}
			});
	};

	return (
		<Page
			head={{
				title: t('apply.title', { team: buildteam?.name || 'BTE' }),
				image: 'https://cdn.buildtheearth.net/static/thumbnails/apply.png',
			}}
			title={buildteam?.name}
			description={buildteam?.about}
		>
			{!(data && buildteam && pastApplications) ? (
				new Array(6).fill(0).map((_, idx) => {
					return <Skeleton height={50} my={'md'} key={idx} />;
				})
			) : (
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<div dangerouslySetInnerHTML={{ __html: sanitize(buildteam?.about) }} />
					{!pastApplications?.some((a: any) => a.status == 'SEND' || a.status == 'REVIEWING' || a.status == 'ACCEPTED') ? (
						<>
							{buildteam?.allowTrial && (
								<>
									<Alert mb="md" icon={<IconAlertCircle size="1rem" />} title={t('apply.trial.title')}>
										{t('apply.trial.description')}
									</Alert>
									<SegmentedControl
										onChange={(value) => {
											setTrial(value === '1');
										}}
										color="blue"
										mb="md"
										styles={{ label: { minWidth: 100 } }}
										disabled={loading}
										data={[
											{ label: t('builder', { ns: 'common' }), value: '0' },
											{ label: t('trial', { ns: 'common' }), value: '1' },
										]}
									/>
								</>
							)}
							{data
								?.filter((d: any) => d.trial == trial)
								.map((d: any, i: number) => {
									const Question = ApplicationQuestions[d.type];
									return <Question key={d.id} {...d} style={{ marginTop: i > 0 && theme.spacing.md, maxWidth: '55%' }} onChange={(v: any) => form.setFieldValue(d.id, v)} error={form.errors[d.id]} disabled={loading} />;
								})}
							<Button type="submit" variant="filled" color="blue" mt="md" loading={loading}>
								{t('common:button.apply')}
							</Button>
							<Button variant="outline" color="blue" ml="md" mt="md" onClick={() => router.back()} disabled={loading}>
								{t('common:button.cancel')}
							</Button>
						</>
					) : (
						<>
							{pastApplications.some((a: any) => a.status == 'SEND' || a.status == 'REVIEWING') && (
								<>
									<Alert title={t('apply.duplicate.pending.title')} color="yellow" icon={<IconAlertCircle size="1rem" />} mt="md">
										{t('apply.duplicate.pending.description', { date: new Date(pastApplications[0].createdAt).toLocaleDateString() })}
									</Alert>
								</>
							)}
							{pastApplications
								.filter((a: any) => a.status == 'ACCEPTED')
								.map((a: any, i: number) => (
									<Alert title={t('apply.duplicate.accepted.title')} color="green" icon={<IconAlertCircle size="1rem" />} mt="md" key={i}>
										{t('apply.duplicate.accepted.description', { date: new Date(pastApplications[0].createdAt).toLocaleDateString() })}
									</Alert>
								))}
							<Button leftSection={<IconChevronLeft />} mt="md" onClick={() => router.back()}>
								{t('common:button.back')}
							</Button>
						</>
					)}
				</form>
			)}
		</Page>
	);
};
export default Apply;
export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/buildteams/${params.team}/application/questions?slug=true`);
	const res2 = await fetcher(`/buildteams/${params.team}?slug=true`);
	return {
		props: {
			data: res,
			buildteam: res2,
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

function generateValidation(data: any[]) {
	let val: any = {};
	data?.forEach((d) => {
		if (d.type.toLowerCase() != 'text') {
			val[d.id] = (v: any) => (v != null && v != undefined ? ApplicationQuestions[d.type].validation(d)(v) : d.required ? 'Required' : undefined);
		}
	});
	return val;
}

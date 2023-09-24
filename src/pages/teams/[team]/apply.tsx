import { Alert, Button, SegmentedControl, Skeleton, useMantineTheme } from '@mantine/core';

import { ApplicationQuestions } from '../../../utils/application/ApplicationQuestions';
import { IconAlertCircle } from '@tabler/icons';
import { NextPage } from 'next';
import Page from '../../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Apply: NextPage = () => {
	const router = useRouter();
	const team = router.query.team;
	const theme = useMantineTheme();
	const { t } = useTranslation('teams');
	const { data: buildteam } = useSWR(`/buildteams/${team}`);
	const { data } = useSWR(`/buildteams/${team}/application/questions`);
	const [trial, setTrial] = useState(false);
	/*const form = useForm({
		initialValues: generateInitialValues(data),
		validate: generateValidation(data),
	});*/
	return (
		<Page
			head={{
				title: t('apply.title', { team: buildteam?.name || 'BTE' }),
				image: 'https://cdn.buildtheearth.net/static/thumbnails/apply.png',
			}}
			title={buildteam?.name}
			description={buildteam?.about}
		>
			{!(data && buildteam)
				? new Array(6).fill(0).map((_, idx) => {
						return <Skeleton height={50} my={'md'} key={idx} />;
				  })
				: !data?.errors && (
						<form>
							<p>{buildteam?.about}</p>
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
									return (
										<Question key={d.id} {...d} style={{ marginTop: i > 0 && theme.spacing.xl, maxWidth: '55%' }} />
									);
								})}
							<Button type="submit" variant="filled" color="blue" mt="md">
								{t('button.apply', { ns: 'common' })}
							</Button>
							<Button type="submit" variant="outline" color="blue" ml="md" mt="md" onClick={() => router.back()}>
								{t('button.cancel', { ns: 'common' })}
							</Button>
						</form>
				  )}
		</Page>
	);
};
export default Apply;
export async function getStaticProps({ locale }: any) {
	return {
		props: {
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

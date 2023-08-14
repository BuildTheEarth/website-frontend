import { Alert, Button, SegmentedControl, Skeleton, useMantineTheme } from '@mantine/core';

import { ApplicationQuestions } from '../../../utils/application/ApplicationQuestions';
import { IconAlertCircle } from '@tabler/icons';
import { NextPage } from 'next';
import Page from '../../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';

const Apply: NextPage = () => {
	const router = useRouter();
	const team = router.query.team;
	const theme = useMantineTheme();
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
				title: `Join ${buildteam?.name || 'BTE'}`,
				image: '/images/placeholder.webp',
				large: true,
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
									<Alert mb="md" icon={<IconAlertCircle size="1rem" />} title="Trial Application">
										This buildteam supports trial applications. You can apply as trial when selecting the button below.
									</Alert>
									<SegmentedControl
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
								Apply
							</Button>
							<Button type="submit" variant="outline" color="blue" ml="md" mt="md" onClick={() => router.back()}>
								Cancel
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

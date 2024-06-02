import {
	Switch,
	Table,
	Text,
	Tooltip,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';

import Page from '@/components/Page';
import { AdminSettingsTabs } from '@/components/SettingsTabs';
import { useUser } from '@/hooks/useUser';
import thumbnail from '@/public/images/thumbnails/teams.png';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

var vagueTime = require('vague-time');
const Settings = ({ data: tempData }: any) => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const user = useUser();
	const { data } = useSWR('/admin/cron');

	return (
		<Page
			smallPadding
			head={{
				title: 'Cron Jobs',
				image: thumbnail,
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={{ permissions: ['admin.admin'] }}
			loading={!data}
		>
			<AdminSettingsTabs loading={!data}>
				<Table>
					<Table.Thead>
						<Table.Th>Name</Table.Th>
						<Table.Th>Running</Table.Th>
						<Table.Th>Next Run</Table.Th>
						<Table.Th>Cron String</Table.Th>
					</Table.Thead>
					<Table.Tbody>
						{data?.map((job: any) => (
							<Table.Tr key={job.id}>
								<Table.Td>{job.id}</Table.Td>
								<Table.Td>
									<Switch readOnly checked={job.running} />
								</Table.Td>
								<Table.Td>
									<Tooltip
										label={
											job.nextExecution ? vagueTime.get({ to: new Date(job.nextExecution) }) : ''
										}
									>
										<Text>{new Date(job.nextExecution).toLocaleString()}</Text>
									</Tooltip>
								</Table.Td>
								<Table.Td>{job.cronTime}</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</AdminSettingsTabs>
		</Page>
	);
};

export default Settings;
export async function getStaticProps({ locale, params }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}

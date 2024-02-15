import {
	Badge,
	Button,
	Checkbox,
	Group,
	Paper,
	Progress,
	Switch,
	Table,
	Text,
	Title,
	Tooltip,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import useSWR, { mutate } from 'swr';

import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import thumbnail from '../../../public/images/thumbnails/teams.png';
import Page from '../../components/Page';
import { swrFetcher } from '../../components/SWRSetup';
import { AdminSettingsTabs } from '../../components/SettingsTabs';
import { useUser } from '../../hooks/useUser';
import fetcher from '../../utils/Fetcher';

var vagueTime = require('vague-time');
const Settings = ({ data: tempData }: any) => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const session = useSession();
	const user = useUser();
	const { data: progress } = useSWR('/admin/progress', swrFetcher(session), {
		refreshInterval: 5000,
		revalidateOnFocus: true,
		refreshWhenHidden: false,
		refreshWhenOffline: false,
	});
	const [skipExistingBuildings, setSkipExistingBuildings] = useState(false);
	const [skipExistingAddresses, setSkipExistingAddresses] = useState(false);

	const handleCalculateBuildings = () => {
		fetch(
			process.env.NEXT_PUBLIC_API_URL +
				`/admin/claims/buildings?skipExisting=${skipExistingBuildings}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token,
				},
			},
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					showNotification({
						title: 'Starting failed',
						message: res.error,
						color: 'red',
					});
				} else {
					showNotification({
						title: 'Started',
						message: `Indexing ${res.count} claims`,
						color: 'green',
						icon: <IconCheck />,
					});
					mutate('/admin/progress');
				}
			});
	};
	const handleCalculateAddresses = () => {
		fetch(
			process.env.NEXT_PUBLIC_API_URL +
				`/admin/claims/addresses?skipExisting=${skipExistingAddresses}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token,
				},
			},
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					showNotification({
						title: 'Starting failed',
						message: res.error,
						color: 'red',
					});
				} else {
					showNotification({
						title: 'Started',
						message: `Indexing ${res.count} claims`,
						color: 'green',
						icon: <IconCheck />,
					});
					mutate('/admin/progress');
				}
			});
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Cron Jobs',
				image: thumbnail,
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={['admin.admin']}
		>
			<AdminSettingsTabs>
				{progress?.buildings && (
					<Paper withBorder radius={'md'} p={'xl'}>
						<Group>
							<Title order={2}>Buildings</Title>
						</Group>

						<Button mt="md" loading={progress > 0} onClick={handleCalculateBuildings}>
							Update Building Index
						</Button>
						<Checkbox
							label={'Skip already indexed claims (building count > 0)'}
							mt={'md'}
							checked={skipExistingBuildings}
							onChange={(v) => setSkipExistingBuildings(v.target.checked)}
						/>
						<Tooltip label={progress.buildings.done + '/' + progress.buildings.total}>
							<Progress
								value={(progress.buildings.done / progress.buildings.total) * 100}
								mt="md"
								animated
								radius="xl"
								size="xl"
							/>
						</Tooltip>
					</Paper>
				)}
				{progress?.addresses && (
					<Paper withBorder radius={'md'} p={'xl'} mt="md">
						<Group>
							<Title order={2}>Adresses (OSM)</Title>
						</Group>

						<Button mt="md" loading={progress > 0} onClick={handleCalculateAddresses}>
							Update OSM Index
						</Button>
						<Checkbox
							label={'Skip already indexed claims (osmName != " ")'}
							mt={'md'}
							checked={skipExistingAddresses}
							onChange={(v) => setSkipExistingAddresses(v.target.checked)}
						/>
						<Tooltip label={progress.addresses.done + '/' + progress.addresses.total}>
							<Progress
								value={(progress.addresses.done / progress.addresses.total) * 100}
								mt="md"
								animated
								radius="xl"
								size="xl"
							/>
						</Tooltip>
					</Paper>
				)}
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

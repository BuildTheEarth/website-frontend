import { ActionIcon, AspectRatio, Group, Table, Text, Tooltip, rem } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';

import Page from '../../../../components/Page';
import SettingsTabs from '../../../../components/SettingsTabs';
import fetcher from '../../../../utils/Fetcher';
import { modals } from '@mantine/modals';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useUser } from '../../../../hooks/useUser';

var vagueTime = require('vague-time');

const Settings = () => {
	const user = useUser();
	const router = useRouter();
	const { data } = useSWR(`/buildteams/${router.query.team}/showcases`);

	const handleDeleteImage = (image: any) => {
		modals.openConfirmModal({
			title: `Delete Showcase Image`,
			centered: true,
			children: (
				<Text>
					Are you sure you want to delete the showcase image of <b>{image.title}</b> from the team? This action cannot
					be undone.
				</Text>
			),
			labels: { confirm: 'Delete Image', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			onCancel: () =>
				showNotification({
					message: `Showcase image was not deleted.`,
					title: 'Cancelled Image removal',
					color: 'yellow',
				}),
			onConfirm: () => {
				// fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${router.query.team}/members`, {
				// 	method: 'DELETE',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 		Authorization: 'Bearer ' + user.token,
				// 	},
				// 	body: JSON.stringify({ user: member.id }),
				// })
				// 	.then((res) => res.json())
				// 	.then((res) => {
				// 		setHasUpdated(true);
				// 		if (res.errors) {
				// 			showNotification({
				// 				title: 'Update failed',
				// 				message: res.error,
				// 				color: 'red',
				// 			});
				// 		} else {
				// 			showNotification({
				// 				title: 'Builder removed',
				// 				message: 'All Data has been saved',
				// 				color: 'green',
				// 			});
				// 			mutate(`/buildteams/${router.query.team}/members`);
				// 		}
				// 	});
			},
		});
	};
	const handleEditImage = (image: any) => {};
	const handleAddImage = () => {};

	return (
		<Page
			smallPadding
			head={{
				title: 'Showcase Images',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/teams.png',
			}}
			seo={{ nofollow: true, noindex: true }}
		>
			<SettingsTabs team={router.query.team?.toString() || ''} loading={!data}>
				<Table.ScrollContainer minWidth={800}>
					<Table verticalSpacing="sm">
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Title</Table.Th>
								<Table.Th>Image</Table.Th>
								<Table.Th>Created</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{data?.map((s: any) => (
								<Table.Tr key={s.id}>
									<Table.Td>{s.title}</Table.Td>
									<Table.Td>
										<AspectRatio ratio={16 / 9}>
											<img src={`https://cdn.buildtheearth.net/upload/${s.image.name}`} alt={s.title} />
										</AspectRatio>
									</Table.Td>
									<Table.Td>
										<Tooltip withinPortal label={new Date(s.createdAt).toLocaleDateString()} position="top-start">
											<p>{s.createdAt ? vagueTime.get({ to: new Date(s.createdAt) }) : ''}</p>
										</Tooltip>
									</Table.Td>
									<Table.Td>
										<Group gap={0} justify="flex-end">
											<ActionIcon variant="subtle" color="gray" onClick={() => handleEditImage(s)}>
												<IconPencil style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
											</ActionIcon>
											<ActionIcon variant="subtle" color="red" onClick={() => handleDeleteImage(s)}>
												<IconTrash style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
											</ActionIcon>
										</Group>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</SettingsTabs>
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

export async function getStaticPaths() {
	const res = await fetcher('/buildteams');
	return {
		paths: res.map((team: any) => ({
			params: {
				team: team.id,
			},
		})),
		fallback: true,
	};
}

import {
	ActionIcon,
	Badge,
	Button,
	Checkbox,
	Group, rem, ScrollAreaAutosize,
	Stack,
	Table,
	Text,
	TextInput,
	Title
} from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import useSWR, { mutate } from 'swr';

import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Page from '../../../../components/Page';
import SearchInput from '../../../../components/SearchInput';
import SettingsTabs from '../../../../components/SettingsTabs';
import { UsersTable } from '../../../../components/UsersTable';
import { useUser } from '../../../../hooks/useUser';
import fetcher from '../../../../utils/Fetcher';

const Settings = () => {
	const user = useUser();
	const router = useRouter();
	const [hasUpdated, setHasUpdated] = useState(false);
	const [filter, setFilter] = useState('');
	const { data: builders } = useSWR(`/buildteams/${router.query.team}/members?slug=true`);
	const { data: managers, isLoading: loadingManagers } = useSWR(
		`/buildteams/${router.query.team}/managers?slug=true`,
	);
	const { data: permissions } = useSWR(`/permissions`);

	const handleRemoveBuilder = (member: any) => {
		modals.openConfirmModal({
			title: `Remove ${capitalize(member.username)}`,
			centered: true,
			children: (
				<Text>
					Are you sure you want to remove {capitalize(member.username)} from the team? This action
					cannot be undone, the user needs to reapply.
				</Text>
			),
			labels: { confirm: 'Remove Builder', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			onCancel: () =>
				showNotification({
					message: `${capitalize(member.username)} was not removed from the team.`,
					title: 'Cancelled Builder removal',
					color: 'yellow',
				}),
			onConfirm: () => {
				fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${router.query.team}/members`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + user.token,
					},
					body: JSON.stringify({ user: member.id }),
				})
					.then((res) => res.json())
					.then((res) => {
						setHasUpdated(true);
						if (res.errors) {
							showNotification({
								title: 'Update failed',
								message: res.error,
								color: 'red',
							});
						} else {
							showNotification({
								title: 'Builder removed',
								message: 'All Data has been saved',
								color: 'green',
							});
							mutate(`/buildteams/${router.query.team}/members`);
						}
					});
			},
		});
	};
	const handleAddManager = () => {
		let id = '';
		modals.open({
			title: 'Add a new Manager',
			onClose: () => (hasUpdated ? mutate(`/buildteams/${router.query.team}/managers`) : null),
			children: (
				<>
					<TextInput
						label="ID"
						description="The ID of the User"
						placeholder={user.user.id}
						onChange={(e) => (id = e.target.value)}
					/>
					<Button mt="md" onClick={() => handleEditManager({ id, username: id })}>
						Next
					</Button>
				</>
			),
			centered: true,
		});
	};
	const handleEditManager = (member: any) => {
		modals.open({
			title: `Manage ${capitalize(member.username)}´s permission`,
			onClose: () => mutate(`/buildteams/${router.query.team}/managers`),
			children: (
				<ScrollAreaAutosize mah={'80vh'}>
					<Text fw="bold" mb="md">
						Permissions:
						<Text c="yellow" inherit span ml="sm">
							{member.permissions?.length || 0}
						</Text>
					</Text>
					<Stack>
						{permissions?.map((permission: any) => {
							if (permission.global) return;

							let memberHasPermission = member.permissions?.some(
								(p: any) => p.permissionId == permission.id,
							);
							return (
								<Checkbox
									label={permission.description}
									description={permission.id}
									key={permission.id}
									defaultChecked={memberHasPermission}
									onChange={(e) => {
										// memberHasPermission = !memberHasPermission;
										if (e.target.checked) {
											editPermission(permission.id, true, member);
										} else {
											editPermission(permission.id, false, member);
										}
									}}
									color={memberHasPermission ? 'green' : 'yellow'}
								/>
							);
						})}
					</Stack>
				</ScrollAreaAutosize>
			),
			centered: true,
		});
	};
	const handleRemoveManager = (member: any) => {
		modals.openConfirmModal({
			title: `Remove ${capitalize(member.username)}´s Permissions`,
			centered: true,
			children: (
				<Text>
					Are you sure you want to remove {capitalize(member.username)}´s Permissions? This action
					cannot be undone.
				</Text>
			),
			labels: { confirm: 'Remove Permissions', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			onCancel: () =>
				showNotification({
					message: `${capitalize(member.username)} was not removed from the team.`,
					title: 'Cancelled Member removal',
					color: 'yellow',
				}),
			onConfirm: () => {
				fetch(
					process.env.NEXT_PUBLIC_API_URL +
						`/users/${member.id}/permissions?buildteam=${router.query.team}`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + user.token,
						},
						body: JSON.stringify({
							permissions: member.permissions.map((p: any) => p.permissionId),
						}),
					},
				)
					.then((res) => res.json())
					.then((res) => {
						setHasUpdated(true);
						if (res.errors) {
							showNotification({
								title: 'Update failed',
								message: res.error,
								color: 'red',
							});
						} else {
							showNotification({
								title: 'Permissions updated',
								message: 'All Data has been saved',
								color: 'green',
							});
							mutate(`/buildteams/${router.query.team}/managers`);
						}
					});
			},
		});
	};
	const editPermission = (permission: string, add: boolean, member: any) => {
		fetch(
			process.env.NEXT_PUBLIC_API_URL +
				`/users/${member.id}/permissions?buildteam=${router.query.team}`,
			{
				method: add ? 'POST' : 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token,
				},
				body: JSON.stringify({ permission }),
			},
		)
			.then((res) => res.json())
			.then((res) => {
				setHasUpdated(true);
				if (res.errors) {
					showNotification({
						title: 'Update failed',
						message: res.error,
						color: 'red',
					});
				} else {
					showNotification({
						title: 'Permissions updated',
						message: 'All Data has been saved',
						color: 'green',
					});
				}
			});
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Members',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/teams.png',
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={[
				'team.settings.edit',
				'team.socials.edit',
				'team.application.edit',
				'team.application.list',
				'team.application.review',
			]}
			loading={!(builders && managers)}
		>
			<SettingsTabs team={router.query.team?.toString() || ''} loading={!(builders && managers)}>
				<SearchInput onSearch={setFilter} inputProps={{ placeholder: 'Filter...' }} />
				<Title order={3} mt="md">
					Builders
				</Title>
				<UsersTable
					loading={!builders}
					data={
						builders
							? builders.filter((b: any) =>
									b.username? b.username?.toLowerCase().includes(filter.toLowerCase()):true,
							  )
							: []
					}
					actions={(data) => (
						<Group gap={0} justify="flex-end">
							<ActionIcon
								variant="subtle"
								color="red"
								onClick={() => handleRemoveBuilder(data)}
								loading={loadingManagers}
							>
								<IconTrash style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
							</ActionIcon>
						</Group>
					)}
				/>
				<Group justify={'space-between'}>
					<Stack gap={0}>
						<Title order={3} mt="md">
							Managers
						</Title>
						<Text c="dimmed" size="xs">
							Users with special Permissions for this Team
						</Text>
					</Stack>
					<Button leftSection={<IconPlus />} onClick={() => handleAddManager()} ml="md">
						Add User
					</Button>
				</Group>
				<UsersTable
					loading={!managers}
					data={
						managers
							? managers.filter((b: any) => b.username.toLowerCase().includes(filter.toLowerCase()))
							: []
					}
					actions={(data) => (
						<Group gap={0} justify="flex-end">
							<ActionIcon
								variant="subtle"
								color="gray"
								onClick={() => handleEditManager(data)}
								loading={loadingManagers}
							>
								<IconPencil style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
							</ActionIcon>
							<ActionIcon
								variant="subtle"
								color="red"
								onClick={() => handleRemoveManager(data)}
								loading={loadingManagers}
							>
								<IconTrash style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
							</ActionIcon>
						</Group>
					)}
					extraHead={<Table.Th>Permissions</Table.Th>}
					extraContent={(data) => (
						<Table.Td>
							<Badge
								color="yellow"
								variant="light"
								style={{ cursor: 'pointer' }}
								onClick={() => handleEditManager(data)}
							>
								{data.permissions.length}
							</Badge>
						</Table.Td>
					)}
				/>
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
				team: team.slug,
			},
		})),
		fallback: true,
	};
}

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

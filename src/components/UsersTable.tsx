import { Avatar, Group, Skeleton, Table, Text, Tooltip } from '@mantine/core';
import { IconUserQuestion } from '@tabler/icons-react';

var vagueTime = require('vague-time');
const rolesData = ['Manager', 'Collaborator', 'Contractor'];

interface UsersTableProps {
	data: any[];
	extraHead?: any;
	loading?: boolean;
	extraContent?: (data: any) => any;
	actions?: (data: any) => any;
}

export function UsersTable({
	data,
	actions,
	extraHead,
	extraContent,
	loading = false,
}: UsersTableProps) {
	const rows = !loading ? (
		data.map((user) => (
			<Table.Tr key={user.id}>
				<Table.Td>
					<Group gap="sm">
						<Avatar
							size={40}
							radius={40}
							color={user.enabled ? 'green' : 'red'}
							alt={user?.username + ' Avatar'}
						>
							{user.username ? user?.username?.charAt(0).toUpperCase() : <IconUserQuestion />}
						</Avatar>
						<div>
							<Text fz="sm" fw={500}>
								{user.username || 'No username provided'}
							</Text>
							<Text fz="xs" c="dimmed">
								{user.id}
							</Text>
						</div>
					</Group>
				</Table.Td>
				{extraContent ? extraContent(user) : null}
				<Table.Td>
					<Tooltip
						withinPortal
						label={
							user.createdTimestamp
								? new Date(user.createdTimestamp).toLocaleDateString()
								: 'The user did not sign in to the new website yet.'
						}
						position="top-start"
					>
						<p>
							{user.createdTimestamp
								? vagueTime.get({ to: new Date(user.createdTimestamp) })
								: 'Not yet'}
						</p>
					</Tooltip>
				</Table.Td>

				<Table.Td>{actions && actions(user)}</Table.Td>
			</Table.Tr>
		))
	) : (
		<Table.Tr>
			<Table.Td>
				<Group gap="sm">
					<Skeleton height={40} circle />
					<div style={{ width: '81%' }}>
						<Skeleton height={12} radius="xl" width={'50%'} />
						<Skeleton height={10} radius="xl" width={'100%'} mt="xs" />
					</div>
				</Group>
			</Table.Td>
			<Table.Td>
				<Skeleton height={12} radius="xl" width={'50%'} />
			</Table.Td>
		</Table.Tr>
	);

	return (
		<Table.ScrollContainer minWidth={800}>
			<Table verticalSpacing="sm">
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Member</Table.Th>
						{extraHead}
						<Table.Th>Registered</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
}

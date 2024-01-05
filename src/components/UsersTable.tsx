import { Avatar, Badge, Group, Skeleton, Table, Text, Tooltip } from '@mantine/core';

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
						<Avatar size={40} radius={40} color={user.enabled ? 'green' : 'red'}>
							{user?.username?.charAt(0).toUpperCase()}
						</Avatar>
						<div>
							<Text fz="sm" fw={500}>
								{user.username}
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
						label={new Date(user.createdTimestamp).toLocaleDateString()}
						position="top-start"
					>
						<p>
							{user.createdTimestamp ? vagueTime.get({ to: new Date(user.createdTimestamp) }) : ''}
						</p>
					</Tooltip>
				</Table.Td>
				<Table.Td>
					{user.emailVerified ? (
						<Badge color="green" variant="light">
							Verified
						</Badge>
					) : (
						<Badge color="red" variant="light">
							Unverified
						</Badge>
					)}
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
			<Table.Td>
				<Skeleton visible width={'fit-content'} radius="xl">
					<Badge color="green" variant="light">
						Verified
					</Badge>
				</Skeleton>
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
						<Table.Th>Status</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
}
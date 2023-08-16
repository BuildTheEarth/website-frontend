import { Box, LoadingOverlay, Tabs, useMantineTheme } from '@mantine/core';
import { IconDashboard, IconEyeglass, IconSearch, IconSend, IconSettings, IconUsers } from '@tabler/icons';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useUser } from '../hooks/useUser';

const SettingsTabs = ({ children, team }: { children: any; team: string }) => {
	const theme = useMantineTheme();
	const user = useUser();
	const session = useSession();
	const router = useRouter();
	return (
		<>
			<Tabs
				defaultValue="settings"
				variant="outline"
				value={router.pathname.split('/manage/')[1]}
				onTabChange={(value) =>
					value == 'quit'
						? router.push(`/teams/${router.query.team}`)
						: router.push(`/teams/${router.query.team}/manage/${value}`)
				}
			>
				<Tabs.List>
					<Tabs.Tab
						value="settings"
						icon={<IconSettings size="0.8rem" />}
						disabled={!user.hasPermissions(['team.socials.edit', 'team.settings.edit'], team)}
					>
						Settings
					</Tabs.Tab>
					<Tabs.Tab
						value="apply"
						icon={<IconSend size="0.8rem" />}
						disabled={!user.hasPermission('team.application.edit', team)}
					>
						Application Questions
					</Tabs.Tab>
					<Tabs.Tab
						value="members"
						icon={<IconUsers size="0.8rem" />}
						disabled={!user.hasPermissions(['permission.add', 'permission.remove'], team)}
					>
						Members
					</Tabs.Tab>
					<Tabs.Tab
						value="members"
						icon={<IconUsers size="0.8rem" />}
						disabled={!user.hasPermission('team.socials.edit', team)}
					>
						Showcase Images
					</Tabs.Tab>
					<Tabs.Tab
						value="review"
						icon={<IconSearch size="0.8rem" />}
						disabled={!user.hasPermissions(['team.application.review', 'team.application.list'], team)}
					>
						Review
					</Tabs.Tab>
					<Tabs.Tab value="quit" icon={<IconDashboard size="0.8rem" />}>
						Build Team Page
					</Tabs.Tab>
				</Tabs.List>
			</Tabs>
			<Box
				sx={(theme) => ({
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
					padding: `${theme.spacing.xs * 3}px`,
					paddingTop: theme.spacing.md,
					height: '100%',
					position: 'relative',
				})}
			>
				<LoadingOverlay visible={user.isLoading} overlayBlur={4} />
				{children}
			</Box>
		</>
	);
};

export default SettingsTabs;

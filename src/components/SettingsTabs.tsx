import {
	Box,
	LoadingOverlay,
	Paper,
	Tabs,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { IconDashboard, IconSearch, IconSend, IconSettings, IconUsers } from '@tabler/icons';

import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useUser } from '../hooks/useUser';

const SettingsTabs = ({
	children,
	team,
	loading = false,
}: {
	children: any;
	team: string;
	loading?: boolean;
}) => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const user = useUser();
	const session = useSession();
	const router = useRouter();
	const mobileLayout = useMediaQuery('(max-width: 1600px)');
	return (
		<>
			<Paper
				p="lg"
				radius={0}
				style={
					!mobileLayout
						? {
								position: 'absolute',
								left: -220,
								top: 'var(--mantine-spacing-xl)',
								maxWidth: '300px',
								overflow: 'hidden',
						  }
						: {}
				}
			>
				<Tabs
					defaultValue="settings"
					variant="pills"
					orientation={!mobileLayout ? 'vertical' : 'horizontal'}
					value={router.pathname.split('/manage/')[1]}
					onChange={(value) =>
						value == 'quit'
							? router.push(`/teams/${router.query.team}`)
							: router.push(`/teams/${router.query.team}/manage/${value}`)
					}
					style={{ width: '100%' }}
				>
					<Tabs.List>
						<Tabs.Tab
							value="settings"
							leftSection={<IconSettings size="0.8rem" />}
							disabled={!user.hasPermissions(['team.socials.edit', 'team.settings.edit'], team)}
						>
							Settings
						</Tabs.Tab>
						<Tabs.Tab
							value="apply"
							leftSection={<IconSend size="0.8rem" />}
							disabled={!user.hasPermission('team.application.edit', team)}
						>
							Application Questions
						</Tabs.Tab>
						<Tabs.Tab
							value="members"
							leftSection={<IconUsers size="0.8rem" />}
							disabled={!user.hasPermissions(['permission.add', 'permission.remove'], team)}
						>
							Members
						</Tabs.Tab>
						<Tabs.Tab
							value="images"
							leftSection={<IconUsers size="0.8rem" />}
							disabled={!user.hasPermission('team.showcases.edit', team)}
						>
							Showcase Images
						</Tabs.Tab>
						<Tabs.Tab
							value="review"
							leftSection={<IconSearch size="0.8rem" />}
							disabled={
								!user.hasPermissions(['team.application.review', 'team.application.list'], team)
							}
						>
							Review
						</Tabs.Tab>
						<Tabs.Tab value="quit" leftSection={<IconDashboard size="0.8rem" />}>
							Team Page
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>
			</Paper>
			<Box
				style={(theme) => ({
					// backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
					padding: 'calc(var(--mantine-spacing-xs) * 3)',
					paddingTop: theme.spacing.md,
					height: '100%',
					position: 'relative',
				})}
			>
				<LoadingOverlay visible={user.isLoading && loading} overlayProps={{ blur: 4 }} />
				{children}
			</Box>
		</>
	);
};

export default SettingsTabs;

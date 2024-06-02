import {
	Box,
	LoadingOverlay,
	Paper,
	Tabs,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import {
	IconClock,
	IconDashboard,
	IconHome,
	IconPhoto,
	IconPolygon,
	IconSearch,
	IconSend,
	IconSettings,
	IconUsers,
} from '@tabler/icons-react';

import { usePermissions } from '@/hooks/usePermissions';
import { useMediaQuery } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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
	const permissions = usePermissions();
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
							disabled={!permissions.hasAny(['team.socials.edit', 'team.settings.edit'], team)}
						>
							Settings
						</Tabs.Tab>
						<Tabs.Tab
							value="apply"
							leftSection={<IconSend size="0.8rem" />}
							disabled={!permissions.has('team.application.edit', team)}
						>
							Application Questions
						</Tabs.Tab>
						<Tabs.Tab
							value="members"
							leftSection={<IconUsers size="0.8rem" />}
							disabled={!permissions.hasAny(['permission.add', 'permission.remove'], team)}
						>
							Members
						</Tabs.Tab>
						<Tabs.Tab
							value="claims"
							leftSection={<IconPolygon size="0.8rem" />}
							disabled={!permissions.hasAny(['team.claim.list'], team)}
						>
							Claims
						</Tabs.Tab>
						<Tabs.Tab
							value="images"
							leftSection={<IconPhoto size="0.8rem" />}
							disabled={!permissions.has('team.showcases.edit', team)}
						>
							Showcase Images
						</Tabs.Tab>
						<Tabs.Tab
							value="review"
							leftSection={<IconSearch size="0.8rem" />}
							disabled={
								!permissions.hasAny(['team.application.review', 'team.application.list'], team)
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
				<LoadingOverlay visible={permissions.isLoading && loading} overlayProps={{ blur: 4 }} />
				{children}
			</Box>
		</>
	);
};

export const AdminSettingsTabs = ({
	children,
	loading = false,
}: {
	children: any;
	loading?: boolean;
}) => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const permissions = usePermissions();
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
								left: -110,
								top: 'var(--mantine-spacing-xl)',
								maxWidth: '300px',
								overflow: 'hidden',
							}
						: {}
				}
			>
				<Tabs
					defaultValue="cron"
					variant="pills"
					orientation={!mobileLayout ? 'vertical' : 'horizontal'}
					value={router.pathname.split('admin/')[1]}
					onChange={(value) =>
						value == 'quit' ? router.push(`/`) : router.push(`/admin/${value}`)
					}
					style={{ width: '100%' }}
				>
					<Tabs.List>
						<Tabs.Tab
							value="cron"
							leftSection={<IconClock size="0.8rem" />}
							disabled={!permissions.hasAny(['admin.admin'])}
						>
							Cron
						</Tabs.Tab>
						<Tabs.Tab
							value="claims"
							leftSection={<IconPolygon size="0.8rem" />}
							disabled={!permissions.hasAny(['admin.admin'])}
						>
							Claims
						</Tabs.Tab>
						<Tabs.Tab
							value="images"
							leftSection={<IconPolygon size="0.8rem" />}
							disabled={!permissions.hasAny(['team.claim.list'])}
						>
							Claim Images
						</Tabs.Tab>

						<Tabs.Tab value="quit" leftSection={<IconHome size="0.8rem" />}>
							Quit
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
				<LoadingOverlay visible={permissions.isLoading && loading} overlayProps={{ blur: 4 }} />
				{children}
			</Box>
		</>
	);
};

export default SettingsTabs;

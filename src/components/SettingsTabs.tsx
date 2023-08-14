import { Box, Tabs, useMantineTheme } from '@mantine/core';
import { IconDashboard, IconEyeglass, IconSearch, IconSend, IconSettings, IconUsers } from '@tabler/icons';

import { useRouter } from 'next/router';

const SettingsTabs = ({ children }: { children: any }) => {
	const theme = useMantineTheme();
	const router = useRouter();
	return (
		<>
			<Tabs
				defaultValue="settings"
				variant="outline"
				value={router.pathname.split('/manage/')[1]}
				onTabChange={(value) => router.push(`/teams/${router.query.team}/manage/${value}`)}
			>
				<Tabs.List>
					<Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
						Settings
					</Tabs.Tab>
					<Tabs.Tab value="apply" icon={<IconSend size="0.8rem" />}>
						Application Questions
					</Tabs.Tab>
					<Tabs.Tab value="members" icon={<IconUsers size="0.8rem" />}>
						Members
					</Tabs.Tab>
					<Tabs.Tab value="members" icon={<IconUsers size="0.8rem" />}>
						Showcase Images
					</Tabs.Tab>
					<Tabs.Tab value="review" icon={<IconSearch size="0.8rem" />}>
						Review
					</Tabs.Tab>
					<Tabs.Tab
						value="quit"
						icon={<IconDashboard size="0.8rem" />}
						onClick={() => router.push(`/teams/${router.query.team}`)}
					>
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
				})}
			>
				{children}
			</Box>
		</>
	);
};

export default SettingsTabs;

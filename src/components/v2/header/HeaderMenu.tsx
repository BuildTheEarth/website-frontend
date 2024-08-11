import { Menu, MenuDropdown, MenuItem, MenuTarget, useMantineColorScheme } from '@mantine/core';
import {
	IconCalendar,
	IconDashboard,
	IconFileSearch,
	IconLogout,
	IconMap,
	IconMoonStars,
	IconSearch,
	IconSettings,
	IconSun,
	IconUser,
} from '@tabler/icons-react';

import { usePermissions } from '@/hooks/usePermissions';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const HeaderMenu = ({ children, t }: { children: any; t: (key: string) => string }) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const permissions = usePermissions();

	return (
		<Menu>
			<MenuTarget>{children}</MenuTarget>
			<MenuDropdown style={{ zIndex: 1000 }}>
				<MenuItem component={Link} href="/me" leftSection={<IconUser size={14} />}>
					My BuildTheEarth
				</MenuItem>
				<Menu.Item component={Link} href="/map/edit" leftSection={<IconMap size={14} />}>
					Claim Map
				</Menu.Item>
				<Menu.Item
					component={Link}
					href="/me/settings/general"
					leftSection={<IconSettings size={14} />}
				>
					Settings
				</Menu.Item>
				<Menu.Divider />
				<Menu.Label>Quick Actions</Menu.Label>
				<Menu.Item
					leftSection={colorScheme === 'dark' ? <IconMoonStars size={14} /> : <IconSun size={14} />}
					onClick={() => toggleColorScheme()}
				>
					{t(`user.theme.${colorScheme}`)}
				</Menu.Item>
				<Menu.Item leftSection={<IconSearch size={14} />} component={Link} href="/map?s=true">
					Search Claims...
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item leftSection={<IconFileSearch size={14} />} component={Link} href="/me/review">
					Review Applications
				</Menu.Item>
				{permissions.has('admin.admin') && (
					<Menu.Item leftSection={<IconDashboard size={14} />} component={Link} href="/admin/cron">
						Administration
					</Menu.Item>
				)}
				{permissions.has('calendar.manage') && (
					<Menu.Item leftSection={<IconCalendar size={14} />} component={Link} href="/calendar">
						Event Calendar
					</Menu.Item>
				)}
				<Menu.Divider />
				<Menu.Item
					leftSection={<IconLogout size={14} />}
					color="red"
					onClick={() => {
						window.localStorage.removeItem('auth-permission-state');
						signOut();
					}}
				>
					{t('auth.signout')}
				</Menu.Item>
			</MenuDropdown>
		</Menu>
	);
};

export default HeaderMenu;

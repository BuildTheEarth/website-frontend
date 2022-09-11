import '/node_modules/flag-icons/css/flag-icons.min.css';

import { Group, useMantineColorScheme, Menu, UnstyledButton, createStyles } from '@mantine/core';

import { ChevronDown } from 'tabler-icons-react';
import { useLocalStorage } from '@mantine/hooks';
import { useState } from 'react';

const data = [
	{ label: 'Light', code: 'light' },
	{ label: 'Dark', code: 'dark' },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
	control: {
		width: 200,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 15px',
		borderRadius: theme.radius.sm,
		border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
		transition: 'background-color 150ms ease',
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[opened ? 5 : 6] : opened ? theme.colors.gray[0] : theme.white,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
		},
	},

	label: {
		fontWeight: 500,
		fontSize: theme.fontSizes.sm,
	},

	icon: {
		transition: 'transform 150ms ease',
		transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
	},
}));

export function ThemeSwitcher() {
	const [opened, setOpened] = useState(false);
	const { classes } = useStyles({ opened });
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const [selected, setSelected] = useLocalStorage({
		key: 'theme',
		defaultValue: colorScheme,
		serialize: (value: any) => {
			return value.code;
		},
		deserialize: (localStorageValue) => {
			return data.find((e) => e.code == localStorageValue);
		},
	});
	const items = data.map((item) => (
		<Menu.Item
			onClick={() => {toggleColorScheme(item.code); setSelected(item)}}
			key={item.label}
		>
			{item.label}
		</Menu.Item>
	));

	return (
		<Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="sm" width="target">
			<Menu.Target>
				<UnstyledButton className={classes.control}>
					<Group spacing="xs">
						<span className={classes.label}>{selected.label}</span>
					</Group>
					<ChevronDown size={16} className={classes.icon} />
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>{items}</Menu.Dropdown>
		</Menu>
	);
}

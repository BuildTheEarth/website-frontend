import '/node_modules/flag-icons/css/flag-icons.min.css';

import { Group, Image, Menu, UnstyledButton, createStyles } from '@mantine/core';

import { ChevronDown } from 'tabler-icons-react';
import { useLocalStorage } from '@mantine/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const data = [
	{ label: 'English', code: 'gb' },
	{ label: 'Deutsch', code: 'de' },
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

export function LanguageSwitcher() {
	const [opened, setOpened] = useState(false);
	const { t, i18n } = useTranslation();
	const { classes } = useStyles({ opened });

	const [selected, setSelected] = useLocalStorage({
		key: 'lang',
		defaultValue: 'gb',
		serialize: (value: any) => {
			return value.code;
		},
		deserialize: (localStorageValue) => {
			return data.find((e) => e.code == localStorageValue);
		},
	});

	const changeLanguage = (i18n: any, lang: { label: string; code: string }) => {
		setSelected(lang);
		i18n.changeLanguage(lang.code);
	};

	const items = data.map((item) => (
		<Menu.Item
			icon={<span className={`fi fi-${item.code} fis`} style={{ height: 18, width: 18, borderRadius: '50%' }}></span>}
			onClick={() => changeLanguage(i18n, item)}
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
						<span
							className={`fi fi-${selected.code} fis`}
							style={{ height: 22, width: 22, borderRadius: '50%' }}
						></span>
						<span className={classes.label}>{selected.label}</span>
					</Group>
					<ChevronDown size={16} className={classes.icon} />
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>{items}</Menu.Dropdown>
		</Menu>
	);
}

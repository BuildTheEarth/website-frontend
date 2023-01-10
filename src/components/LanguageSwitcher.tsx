import '/node_modules/flag-icons/css/flag-icons.min.css';

import { Group, Image, Menu, UnstyledButton, createStyles } from '@mantine/core';

import { ChevronDown } from 'tabler-icons-react';
import { loadLanguages } from 'i18next';
import { useLocalStorage } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export const languages = [
	{ label: 'English', code: 'en', flag: 'gb' },
	{ label: 'German', code: 'de', flag: 'de' },
	{ label: 'Dutch', code: 'nl', flag: 'nl' },
	{ label: 'French', code: 'fr', flag: 'fr' },
	{ label: 'Spanish', code: 'es', flag: 'es' },
	{ label: 'Russian', code: 'ru', flag: 'ru' },
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
	const { t } = useTranslation();
	const router = useRouter();
	const { classes } = useStyles({ opened });

	const [selected, setSelected] = useState(languages.find((l: any) => l.code == (router.locale || 'en')));
	console.log(router.locale);
	const changeLanguage = (lang: { label: string; code: string; flag: string }) => {
		setSelected(lang);
		const { pathname, asPath, query } = router;
		console.log(pathname, asPath, query);
		router.push(pathname, pathname, { locale: lang.code });
	};

	const items = languages.map((item) => (
		<Menu.Item
			icon={<span className={`fi fi-${item.flag} fis`} style={{ height: 18, width: 18, borderRadius: '50%' }}></span>}
			onClick={() => changeLanguage(item)}
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
							className={`fi fi-${selected && selected.flag} fis`}
							style={{ height: 22, width: 22, borderRadius: '50%' }}
						></span>
						<span className={classes.label}>{selected && selected.label}</span>
					</Group>
					<ChevronDown size={16} className={classes.icon} />
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>{items}</Menu.Dropdown>
		</Menu>
	);
}

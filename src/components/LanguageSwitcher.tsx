import '/node_modules/flag-icons/css/flag-icons.min.css';

import { Group, Menu, UnstyledButton } from '@mantine/core';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ChevronDown } from 'tabler-icons-react';
import classes from '../styles/components/LanguageSwitcher.module.css';

export const languages = [
	{ label: 'English', code: 'en', flag: 'gb' },
	{ label: 'Deutsch', code: 'de', flag: 'de' },
	{ label: 'Nederlands', code: 'nl', flag: 'nl' },
	{ label: 'Français', code: 'fr', flag: 'fr' },
	{ label: 'Norsk', code: 'no', flag: 'no' },
	{ label: 'русский', code: 'ru', flag: 'ru' },
	{ label: '中文', code: 'zh', flag: 'cn' },
];

export function LanguageSwitcher({ className }: { className?: string }) {
	const [opened, setOpened] = useState(false);
	const { t } = useTranslation();
	const router = useRouter();

	const [selected, setSelected] = useState(
		languages.find((l: any) => l.code == (router.locale || 'en')),
	);
	const changeLanguage = (lang: { label: string; code: string; flag: string }) => {
		setSelected(lang);
		const { pathname, asPath, query } = router;
		router.push({ pathname, query }, asPath, { locale: lang.code });
	};

	const items = languages.map((item) => (
		<Menu.Item
			leftSection={
				<span
					className={`fi fi-${item.flag} fis`}
					style={{ height: 18, width: 18, borderRadius: '50%' }}
				></span>
			}
			onClick={() => changeLanguage(item)}
			key={item.label}
		>
			{item.label}
		</Menu.Item>
	));

	return (
		<Menu
			onOpen={() => setOpened(true)}
			onClose={() => setOpened(false)}
			radius="sm"
			width="target"
		>
			<Menu.Target>
				<UnstyledButton className={`${classes.control} ${className}`} data-opened={opened}>
					<Group gap="xs">
						<span
							className={`fi fi-${selected && selected.flag} fis`}
							style={{ height: 22, width: 22, borderRadius: '50%' }}
						></span>
						<span className={classes.label}>{selected && selected.label}</span>
					</Group>
					<ChevronDown size={16} className={classes.icon} data-opened={opened} />
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>{items}</Menu.Dropdown>
		</Menu>
	);
}

import { ActionIcon, Anchor, Box, Group, Text } from '@mantine/core';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import classes from '@/styles/components/v2/Footer.module.css';
import { Discord } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
	links: { link: string; translation: string }[];
	style?: React.CSSProperties;
}

export default function Footer({ links, style }: FooterProps) {
	const { t } = useTranslation();

	const items = links.map((link) => (
		<Anchor component={Link} c="dimmed" key={link.translation} href={link.link} size="sm">
			{t(`links.${link.translation}`)}
		</Anchor>
	));

	return (
		<Box className={classes.root} style={style}>
			<Box className={classes.container}>
				<Text style={{ fontSize: '14px' }} c="dimmed" variant="text" className={classes.copyright}>
					{t('copyright', { year: new Date().getFullYear() })}
				</Text>
				<Group className={classes.links}>
					{items}
					<ActionIcon
						component={Link}
						href="http://go.buildtheearth.net/dc"
						variant="transparent"
						aria-label="Discord"
						target="_blank"
					>
						<Discord />
					</ActionIcon>
					<LanguageSwitcher className={classes.language} />
				</Group>
				<Anchor<'a'>
					style={{ fontSize: '14px' }}
					c="dimmed"
					variant="text"
					className={classes.copyright2}
				>
					{t('copyright', { year: new Date().getFullYear() })}
				</Anchor>
			</Box>
		</Box>
	);
}

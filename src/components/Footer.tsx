import { ActionIcon, Anchor, Container, Group } from '@mantine/core';

import { Discord } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import classes from '../styles/components/Footer.module.css';
import { LanguageSwitcher } from './LanguageSwitcher';

interface FooterSimpleProps {
	links: { link: string; translation: string }[];
	style?: React.CSSProperties;
}

export default function Footer({ links, style }: FooterSimpleProps) {
	const { t } = useTranslation();
	const items = links.map((link) => (
		<Anchor component={Link} c="dimmed" key={link.translation} href={link.link} size="sm">
			{t(`links.${link.translation}`)}
		</Anchor>
	));

	return (
		<div className={classes.footer} style={style}>
			<Container className={classes.inner} size="xl">
				<Anchor<'a'>
					style={{ fontSize: '14px' }}
					c="dimmed"
					variant="text"
					className={classes.copyright1}
				>
					{t('copyright', { year: new Date().getFullYear() })}
				</Anchor>
				<Group className={classes.links}>
					<Group justify="center" className={classes.links}>
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
					</Group>
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
			</Container>
		</div>
	);
}

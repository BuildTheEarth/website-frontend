import { Anchor, Container, Group, Menu, createStyles } from '@mantine/core';

import { LanguageSwitcher } from './LanguageSwitcher';
import React from 'react';

const useStyles = createStyles((theme) => ({
	footer: {
		borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#ffffff',
	},

	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: theme.spacing.sm,
		paddingBottom: theme.spacing.sm,

		[theme.fn.smallerThan('xs')]: {
			flexDirection: 'column',
		},
	},

	links: {
		[theme.fn.smallerThan('xs')]: {
			marginTop: theme.spacing.md,
		},
	},
}));

interface FooterSimpleProps {
	links: { link: string; label: string }[];
	style?: React.CSSProperties;
}

export default function Footer({ links, style }: FooterSimpleProps) {
	const { classes } = useStyles();
	const items = links.map((link) => (
		<Anchor<'a'> color="dimmed" key={link.label} href={link.link} size="sm">
			{link.label}
		</Anchor>
	));

	return (
		<div className={classes.footer} style={style}>
			<Container className={classes.inner} size={'xl'}>
				<Anchor<'a'> color="dimmed" variant="text">
					&copy; {new Date().getFullYear()} BuildTheEarth
				</Anchor>
				<Group className={classes.links}>
					{items}
					<LanguageSwitcher />
				</Group>
			</Container>
		</div>
	);
}

import { Text, UnstyledButton, createStyles } from '@mantine/core';

import React from 'react';

const useStyles = createStyles((theme) => ({
	button: {
		paddingTop: theme.spacing.sm,
		paddingBottom: theme.spacing.sm,
		paddingLeft: theme.spacing.xl,
		paddingRight: theme.spacing.xl,
		border: `2px solid ${theme.colors.gray[8]}`,
		borderRadius: theme.radius.md,
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing.md,
		flexDirection: 'row',
		'&:hover': {
			backgroundColor: theme.colors.gray[8],
		},
	},
}));
export const GridButton = ({ icon, text, onClick }: { icon: any; text: string; onClick?: () => void }) => {
	const { classes } = useStyles();

	return (
		<UnstyledButton className={classes.button} onClick={onClick}>
			{icon}
			<Text>{text}</Text>
		</UnstyledButton>
	);
};

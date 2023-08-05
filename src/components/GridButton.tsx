import { Text, UnstyledButton, createStyles } from '@mantine/core';

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
export const GridButton = ({
	icon,
	text,
	onClick,
	solid,
}: {
	icon: any;
	text: string;
	onClick?: () => void;
	solid?: boolean;
}) => {
	const { classes, theme } = useStyles();

	return (
		<UnstyledButton
			className={classes.button}
			onClick={onClick}
			style={{ backgroundColor: solid ? theme.colors.gray[8] : undefined }}
		>
			{icon}
			<Text>{text}</Text>
		</UnstyledButton>
	);
};

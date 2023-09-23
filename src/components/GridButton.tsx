import { Text, UnstyledButton } from '@mantine/core';

import classes from '../styles/components/GridButton.module.css';

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
	return (
		<UnstyledButton
			className={classes.button}
			onClick={onClick}
			style={{ backgroundColor: solid ? 'var(--mantine-color-gray-8)' : undefined }}
		>
			{icon}
			<Text truncate="end">{text}</Text>
		</UnstyledButton>
	);
};

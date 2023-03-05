import { useMantineTheme } from '@mantine/core';

/* eslint-disable jsx-a11y/alt-text */
const Icon = ({ icon, ...rest }: any) => {
	const theme = useMantineTheme();
	return (
		<img
			src={'/icons/' + icon + '.svg'}
			style={{ filter: theme.colorScheme == 'dark' ? 'invert(100%)' : '' }}
			{...rest}
		/>
	);
};

export default Icon;

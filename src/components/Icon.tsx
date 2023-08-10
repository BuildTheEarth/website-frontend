import { useMantineTheme } from '@mantine/core';

/* eslint-disable jsx-a11y/alt-text */
const Icon = ({ name, ...rest }: any) => {
	const theme = useMantineTheme();
	return (
		<img
			src={'/icons/' + name + '.svg'}
			{...rest}
			style={{ filter: theme.colorScheme == 'dark' ? 'invert(100%)' : '', ...rest.style }}
		/>
	);
};

export default Icon;

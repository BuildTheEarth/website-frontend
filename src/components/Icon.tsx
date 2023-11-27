import { useMantineColorScheme } from '@mantine/core';

/* eslint-disable jsx-a11y/alt-text */
const Icon = ({ name, ...rest }: any) => {
	const scheme = useMantineColorScheme();
	return name != '' ? (
		<img
			src={'/icons/' + name + '.svg'}
			{...rest}
			style={{ filter: scheme.colorScheme == 'dark' ? 'invert(100%)' : '', ...rest.style }}
		/>
	) : (
		<></>
	);
};

export default Icon;

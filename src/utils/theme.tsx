import { createTheme } from '@mantine/core';

const theme = createTheme({
	fontFamily:
		'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
	breakpoints: {
		xs: '36em',
		sm: '48em',
		md: '62em',
		lg: '75em',
		xl: '88em',
	},
	primaryColor: 'buildtheearth',
	primaryShade: 6,
	colors: {
		buildtheearth: [
			'#f0f1fa',
			'#dddeee',
			'#b7b9dd',
			'#8f93cf',
			'#6e72c2',
			'#595dba',
			'#4e53b7',
			'#3f44a2',
			'#373d91',
			'#2d3380',
		],
		dark: [
			'#d1d1d2',
			'#a2a3a5',
			'#76777a',
			'#4c4e51',
			'#26292d',
			'#1f2024',
			'#1a1b1e',
			'#121315',
			'#0e0f10',
			'#0b0c0d',
		],
		// OLD MANTINE
		// dark: [
		// 	'#C1C2C5',
		// 	'#A6A7AB',
		// 	'#909296',
		// 	'#5c5f66',
		// 	'#373A40',
		// 	'#2C2E33',
		// 	'#25262b',
		// 	'#1A1B1E',
		// 	'#141517',
		// 	'#101113',
		// ],
	},

	autoContrast: true,
	luminanceThreshold: 0.33,
});

export default theme;

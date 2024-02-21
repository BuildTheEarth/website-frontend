import { Head, Html, Main, NextScript } from 'next/document';

import { ColorSchemeScript } from '@mantine/core';
import { createGetInitialProps } from '@mantine/next';

export const getInitialProps = createGetInitialProps();

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<ColorSchemeScript defaultColorScheme="auto" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

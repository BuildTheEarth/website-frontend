import '../styles/globals.css';
import '../styles/nprogress.css';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useEffect } from 'react';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import {RouterTransition} from "../components/RouterTransition";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

  const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'scheme',
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	// TODO: Font
	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<title>Build The Earth</title>
				<link href="https://api.mapbox.com/mapbox-gl-js/v0.54.1/mapbox-gl.css" rel="stylesheet" />
			</Head>
			<SWRConfig
				value={{
					refreshInterval: 0,
					fetcher: (resource: string, init: any) => fetch(resource, init).then((res) => res.json()),
					shouldRetryOnError: false,
					revalidateIfStale: false,
					revalidateOnFocus: false,
					revalidateOnReconnect: false,
				}}
			>
				<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
					<MantineProvider theme={{
						colorScheme,
						fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
						colors: {
							['blue']: ['#0076ff', '#0076ff', '#0076ff', '#0076ff', '#0076ff', '#0076ff', '#0076ff', '#0076ff', '#0076ff', '#0076ff']
						}
					}} withGlobalStyles withNormalizeCSS>
						<RouterTransition />
						<Component {...pageProps} />
					</MantineProvider>
				</ColorSchemeProvider>
			</SWRConfig>
		</SessionProvider>
	);
}

export default MyApp;

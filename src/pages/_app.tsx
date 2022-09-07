import '../styles/globals.css';
import '../styles/nprogress.css';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useEffect } from 'react';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import NProgress from 'nprogress';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());
	}, []);

	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'scheme',
		defaultValue: 'light',
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
					<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
						<Component {...pageProps} />
					</MantineProvider>
				</ColorSchemeProvider>
			</SWRConfig>
		</SessionProvider>
	);
}

export default MyApp;

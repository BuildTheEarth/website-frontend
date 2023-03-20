import '../styles/globals.css';
import '../styles/nprogress.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RouterTransition } from '../components/RouterTransition';
import { SWRConfig } from 'swr';
import SWRProvider from '../components/SWRProvider';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'scheme',
		defaultValue: preferredColorScheme,
		getInitialValueInEffect: true,
	});

	const [accessToken, setAccessToken] = useLocalStorage<string>({
		key: 'accessToken',
		defaultValue: '',
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	// TODO: Font
	return (
		<SessionProvider session={pageProps.session}>
			<SWRProvider>
				<Head>
					<title>Build The Earth</title>
				</Head>
				<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
					<MantineProvider
						theme={{
							colorScheme,
							fontFamily:
								'"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
						}}
						withGlobalStyles
						withNormalizeCSS
					>
						<RouterTransition />
						<Component {...pageProps} />
					</MantineProvider>
				</ColorSchemeProvider>
			</SWRProvider>
		</SessionProvider>
	);
}

export default appWithTranslation(MyApp);

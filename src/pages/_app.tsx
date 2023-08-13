import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/globals.css';
import '../styles/nprogress.css';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { NotificationsProvider } from '@mantine/notifications';
import { RouterTransition } from '../components/RouterTransition';
import SWRSetup from '../components/SWRSetup';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import defaultSeo from '../../next-seo.config';
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
			<DefaultSeo {...defaultSeo} />
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
					<NotificationsProvider>
						<SWRSetup
							content={
								<>
									<RouterTransition />
									<Component {...pageProps} />
								</>
							}
						></SWRSetup>
					</NotificationsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</SessionProvider>
	);
}

export default appWithTranslation(MyApp);

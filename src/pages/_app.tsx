import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/tiptap/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { RouterTransition } from '../components/RouterTransition';
import SWRSetup from '../components/SWRSetup';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import defaultSeo from '../../next-seo.config';
import { useLocalStorage } from '@mantine/hooks';

function MyApp({ Component, pageProps }: AppProps) {
	const [accessToken, setAccessToken] = useLocalStorage<string>({
		key: 'accessToken',
		defaultValue: '',
	});

	return (
		<SessionProvider session={pageProps.session}>
			<DefaultSeo {...defaultSeo} />
			<MantineProvider
				defaultColorScheme="dark"
				theme={{
					fontFamily:
						'"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
					breakpoints: {
						xs: '36em',
						sm: '48em',
						md: '62em',
						lg: '75em',
						xl: '88em',
					},
				}}
			>
				<ModalsProvider>
					<Notifications />
					<SWRSetup
						content={
							<>
								<RouterTransition />
								<Component {...pageProps} />
							</>
						}
					/>
				</ModalsProvider>
			</MantineProvider>
		</SessionProvider>
	);
}

export default appWithTranslation(MyApp);

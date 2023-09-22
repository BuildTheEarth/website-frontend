import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/globals.css';
import '../styles/nprogress.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';

import { useHotkeys, useLocalStorage } from '@mantine/hooks';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { RouterTransition } from '../components/RouterTransition';
import SWRSetup from '../components/SWRSetup';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import defaultSeo from '../../next-seo.config';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const [accessToken, setAccessToken] = useLocalStorage<string>({
		key: 'accessToken',
		defaultValue: '',
	});

	// TODO: Font
	return (
		<SessionProvider session={pageProps.session}>
			<DefaultSeo {...defaultSeo} />
			<MantineProvider
				theme={{
					fontFamily:
						'"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
				}}
			>
				<Notifications />
				<SWRSetup
					content={
						<>
							<RouterTransition />
							<Component {...pageProps} />
						</>
					}
				></SWRSetup>
			</MantineProvider>
		</SessionProvider>
	);
}

export default appWithTranslation(MyApp);

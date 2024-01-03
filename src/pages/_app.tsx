import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/globals.css';

import { MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import defaultSeo from '../../next-seo.config';
import CookieBanner from '../components/CookieBanner';
import { RouterTransition } from '../components/RouterTransition';
import SWRSetup from '../components/SWRSetup';

function MyApp({ Component, pageProps }: AppProps) {
	const [accessToken, setAccessToken] = useLocalStorage<string>({
		key: 'accessToken',
		defaultValue: '',
	});

	useEffect(() => {
		//@ts-ignore
		var _mtm = (window._mtm = window._mtm || []);
		_mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
		(function () {
			var d = document,
				g = d.createElement('script'),
				s = d.getElementsByTagName('script')[0];
			g.async = true;
			g.src = 'https://analytics.buildtheearth.net/js/container_PcCg1Bla.js';
			s.parentNode?.insertBefore(g, s);
		})();
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
					<CookieBanner />
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

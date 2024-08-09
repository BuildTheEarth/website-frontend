import '@/styles/globals.css';
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

import CookieBanner from '@/components/CookieBanner';
import { RouterTransition } from '@/components/RouterTransition';
import SWRSetup from '@/components/SWRSetup';
import theme from '@/utils/theme';
import { MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import defaultSeo from 'next-seo.config';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { useEffect } from 'react';

export const interFont = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});
export const minecraftFont = localFont({
	src: '../../public/fonts/Minecraft.ttf',
	weight: '100 900',
	display: 'swap',
	style: 'normal',
});

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
		<>
			<style jsx global>{`
				html {
					--font-inter: ${interFont.style.fontFamily};
					--font-minecraft: ${minecraftFont.style.fontFamily};
				}
			`}</style>
			<SessionProvider session={pageProps.session}>
				<DefaultSeo {...defaultSeo} />
				<MantineProvider defaultColorScheme="dark" theme={theme}>
					<ModalsProvider>
						<Notifications />
						<CookieBanner />
						<SWRSetup>
							<RouterTransition />
							<Component {...pageProps} />
						</SWRSetup>
					</ModalsProvider>
				</MantineProvider>
			</SessionProvider>
		</>
	);
}

export default appWithTranslation(MyApp);

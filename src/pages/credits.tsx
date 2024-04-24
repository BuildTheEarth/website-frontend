import { Anchor, Container } from '@mantine/core';

import thumbnail from '@/public/images/thumbnails/contact.png';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Page from '../components/Page';

const Credits = () => {
	return (
		<Page fullWidth head={{ title: 'Credits', image: thumbnail }}>
			<Container w="80vw" style={{ listStyleType: 'none' }}>
				<h1>BuildTheEarth Website</h1>

				<p>
					Work on the BuildTheEarth Website is public at{' '}
					<Anchor component={Link} href={'https://github.com/BuildTheEarth/website-node-backend'}>
						BuildTheEarth/website-node-backend
					</Anchor>{' '}
					and{' '}
					<Anchor component={Link} href={'https://github.com/BuildTheEarth/website-frontend'}>
						BuildTheEarth/website-frontend
					</Anchor>
					. We believe in transparency and would like you to contribute to this project aswell.
					<br />
					Special Thanks goes to these people:
				</p>
				<h2>Github Contributors</h2>
				<ol style={{ listStyleType: 'none' }}>
					<li>Nudelsuppe42: Frontend Programming</li>
					<li>Nachwahl: Backend Programming, API</li>
					<li>XboxBedrock: Deployment</li>
					<li>Cinnazeyy: Initial Design Ideas</li>
					<li>Coppertine: Initial Core Structure</li>
				</ol>
				<h2>Inspiration</h2>
				<ol style={{ listStyleType: 'none' }}>
					<li>
						Original Website:{' '}
						<Anchor component={Link} href={'https://github.com/BuildTheEarth/bte-website'}>
							BuildTheEarth/bte-website
						</Anchor>
						{' © '}
						<Anchor component={Link} href={'https://github.com/Xesau'}>
							Xesau
						</Anchor>
					</li>
					<li>
						Colors and Components:{' '}
						<Anchor component={Link} href={'https://mantine.dev'}>
							https://mantine.dev
						</Anchor>
					</li>
					<li>
						Design Requirements:{' '}
						<Anchor component={Link} href={'https://github.com/BuildTheEarth/bte-website'}>
							https://github.com/BuildTheEarth/bte-website
						</Anchor>
					</li>
					<li>
						Interactive Map:{' '}
						<Anchor component={Link} href={'https://map.bte-germany.de/'}>
							https://map.bte-germany.de
						</Anchor>
					</li>
				</ol>
				<h2>Used Packages</h2>
				<ol style={{ listStyleType: 'none' }}>
					<li>@aws-sdk/client-s3</li>
					<li>@bte-germany/terraconvert</li>
					<li>@keycloak/keycloak-admin-client</li>
					<li>@prisma/client</li>
					<li>@turf/helpers</li>
					<li>@turf/turf</li>
					<li>blurhash</li>
					<li>body-parser</li>
					<li>cors</li>
					<li>cron</li>
					<li>dotenv</li>
					<li>express</li>
					<li>express-prom-bundle</li>
					<li>express-session</li>
					<li>express-validator</li>
					<li>express-yup-middleware</li>
					<li>jsonwebtoken</li>
					<li>keycloak-connect</li>
					<li>mariadb</li>
					<li>minimatch</li>
					<li>multer</li>
					<li>mysql</li>
					<li>prom-client</li>
					<li>reflect-metadata</li>
					<li>rfdc</li>
					<li>sharp</li>
					<li>uuid</li>
					<li>winston</li>
					<li>yup</li>
					<li>@emotion/react</li>
					<li>@emotion/server</li>
					<li>@icons-pack/react-simple-icons</li>
					<li>@mantine/carousel</li>
					<li>@mantine/core</li>
					<li>@mantine/dates</li>
					<li>@mantine/dropzone</li>
					<li>@mantine/form</li>
					<li>@mantine/hooks</li>
					<li>@mantine/modals</li>
					<li>@mantine/next</li>
					<li>@mantine/notifications</li>
					<li>@mantine/nprogress</li>
					<li>@mantine/prism</li>
					<li>@mantine/rte</li>
					<li>@mantine/spotlight</li>
					<li>@mantine/tiptap</li>
					<li>@mapbox/mapbox-gl-draw</li>
					<li>@next/bundle-analyzer</li>
					<li>@react-three/drei</li>
					<li>@react-three/fiber</li>
					<li>@tabler/icons-react</li>
					<li>@tiptap/extension-highlight</li>
					<li>@tiptap/extension-link</li>
					<li>@tiptap/extension-subscript</li>
					<li>@tiptap/extension-superscript</li>
					<li>@tiptap/extension-text-align</li>
					<li>@tiptap/extension-underline</li>
					<li>@tiptap/pm</li>
					<li>@tiptap/react</li>
					<li>@tiptap/starter-kit</li>
					<li>@types/mapbox__mapbox-gl-draw</li>
					<li>@types/sanitize-html</li>
					<li>axios</li>
					<li>clsx</li>
					<li>cookies-next</li>
					<li>dayjs</li>
					<li>embla-carousel-react</li>
					<li>eslint-import-resolver-webpack</li>
					<li>flag-icons</li>
					<li>framer-motion</li>
					<li>geolib</li>
					<li>i18next</li>
					<li>keycloak-j</li>
					<li>mantine-contextmenu</li>
					<li>mapbox-gl</li>
					<li>mapbox-gl-style-switcher</li>
					<li>next</li>
					<li>next-auth</li>
					<li>next-i18next</li>
					<li>next-seo</li>
					<li>oauth-pkce</li>
					<li>react</li>
					<li>react-dom</li>
					<li>react-i18next</li>
					<li>react-map-gl</li>
					<li>sanitize-html</li>
					<li>swr</li>
					<li>tabler-icons-react</li>
					<li>three</li>
					<li>vague-time</li>
				</ol>
				<p>
					A list of packages and their licenses can be found at{' '}
					<Anchor component={Link} href={'https://buildtheearth.net/licenses.txt'}>
						https://buildtheearth.net/licenses.txt
					</Anchor>{' '}
					and their respective github websites.
				</p>
			</Container>
		</Page>
	);
};

export default Credits;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

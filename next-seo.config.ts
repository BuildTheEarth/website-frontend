import { DefaultSeoProps } from 'next-seo';

const defaultSeo: DefaultSeoProps = {
	titleTemplate: '%s | BuildTheEarth',
	defaultTitle: 'BuildTheEarth',
	description: 'Recreating The Whole Earth In Minecraft',
	themeColor: '#1C7ED6',
	twitter: {
		cardType: 'summary_large_image',
	},
	openGraph: {
		type: 'website',
		description: 'Recreating The Whole Earth In Minecraft',
		siteName: 'BuildTheEarth',
	},
};

export default defaultSeo;

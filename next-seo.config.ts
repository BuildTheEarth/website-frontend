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
		images: [
			{
				url: 'https://cdn.buildtheearth.net/static/preview.webp',
				width: 1920,
				height: 1080,
				alt: 'BuildTheEarth - Building the Earth in Minecraft',
			},
		],
	},
};

export default defaultSeo;

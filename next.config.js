const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['cdn.discordapp.com', 'i.imgur.com', 'cdn.buildtheearth.net'],
	},
	// compiler: {
	// 	styledComponents: true,
	// },
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'zh'], // 'de', 'es', 'fr', 'ru', 'nl',
	},
	output: 'standalone',
	async redirects() {
		return [
			{
				source: '/sitemap',
				destination: '/sitemap.xml',
				permanent: false,
			},
			{
				source: '/teams/map',
				destination: '/map/teams',
				permanent: true,
			},
			{
				source: '/buildteams/:id*',
				destination: '/teams/:id*',
				permanent: true,
			},
			{
				source: '/buildteams',
				destination: '/teams',
				permanent: true,
			},
			{
				source: '/discord',
				destination: 'https://discord.gg/buildtheearth-net-690908396404080650',
				permanent: true,
			},
			{
				source: '/docs',
				destination: 'https://docs.buildtheearth.net',
				permanent: true,
			},

			{
				source: '/visit',
				destination: '/join/visit',
				permanent: true,
			},
			{
				source: '/build',
				destination: '/join/build',
				permanent: true,
			},
			{
				source: '/getstarted',
				destination: '/join',
				permanent: true,
			},
			{
				source: '/getstarted/:id*',
				destination: '/join/:id*',
				permanent: true,
			},
		];
	},
};

module.exports = withBundleAnalyzer(nextConfig);

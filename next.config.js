const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.buildtheearth.net',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '**.discordapp.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '**.discord.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'i.imgur.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	// compiler: {
	// 	styledComponents: true,
	// },
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'zh'], // 'de', 'es', 'fr', 'ru', 'nl',
	},
	output: 'standalone',
	poweredByHeader: false,
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

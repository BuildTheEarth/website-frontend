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
};

module.exports = withBundleAnalyzer(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['cdn.discordapp.com'],
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'de'],
	},
	output: 'standalone',
};

module.exports = nextConfig

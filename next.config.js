/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['cdn.discordapp.com', "i.imgur.com"],
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'de', 'es', 'fr', 'ru', 'nl']
	},
	output: 'standalone',
};

module.exports = nextConfig

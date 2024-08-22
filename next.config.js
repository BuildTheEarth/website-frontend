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
		locales: ['en', 'de', 'fr', 'nl', 'no', 'ru', 'zh'],
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
				destination: 'http://go.buildtheearth.net/dc',
				permanent: true,
			},
			{
				source: '/status',
				destination: 'https://status.buildtheearth.net',
				permanent: true,
			},
			{
				source: '/translate',
				destination: 'https://crowdin.com/project/buildtheearth-website',
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


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: "buildtheearth",
    project: "main-website",
    sentryUrl: "https://sentry.buildtheearth.net/",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: false,
  }
);

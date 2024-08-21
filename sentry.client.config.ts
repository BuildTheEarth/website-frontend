import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1,
	debug: false,
	replaysOnErrorSampleRate: 1.0,
	replaysSessionSampleRate: 0.05,
	maxBreadcrumbs: 10,
	integrations: [
		Sentry.replayIntegration({
			// Additional Replay configuration goes in here, for example:
			maskAllText: true,
			blockAllMedia: true,
		}),
	],
	environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
});

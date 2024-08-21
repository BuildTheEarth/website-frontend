import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	maxBreadcrumbs: 5,
	tracesSampleRate: 1,
	debug: false,
	environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
});

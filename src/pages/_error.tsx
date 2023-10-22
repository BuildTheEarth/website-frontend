import { Button, Center, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import Page from '../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function ErrorPage(props: any) {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { t } = useTranslation('errors');
	const code = props.code || props.statuscode;
	const router = useRouter();
	return (
		<Page fullWidth>
			<div
				style={{
					width: '100%',
					position: 'relative',
				}}
			>
				<div
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						background: `url("https://cdn.buildtheearth.net/static/thumbnails/error.png")`,
						filter: 'brightness(0.5)',
						width: '100%',
						height: 'calc(100vh - 60px)',
					}}
				></div>
				<Center
					style={{
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
					}}
				>
					<div>
						<Title style={{ color: '#ffffff', fontSize: 220, userSelect: 'none' }} ta="center" order={1}>
							{code}
						</Title>
						<Title style={{ color: '#ffffff' }} ta="center" order={1}>
							{errors[code].title}
						</Title>
						<Title style={{ color: theme.colors.gray[4] }} ta="center" order={3}>
							{errors[code].message}
							<br />
							<Button
								variant="outline"
								size="xl"
								style={{
									color: 'white',
									borderColor: 'white',
									borderWidth: 3,
									marginTop: 'calc(var(--mantine-spacing-xl)*1.5)',
								}}
								onClick={() => router.back()}
							>
								{t('button.back', { ns: 'common' })}
							</Button>
						</Title>
					</div>
				</Center>
			</div>
			<div></div>
		</Page>
	);
}
export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'errors'])),
		},
	};
}
export default ErrorPage;

const errors: any = {
	fallback: {
		title: 'Something went wrong',
		message: 'Please try again later.',
	},
	'301': {
		title: 'Moved Permanently',
		message: 'The page you requested has been permanently moved to a different URL. Please try again with the new URL.',
	},
	'400': {
		title: 'Bad Request',
		message: 'Please reload the page and check for a working internet connection.',
	},
	'401': {
		title: 'Unauthorized',
		message: 'You are not allowed to access this page.',
	},
	'403': {
		title: 'Forbidden',
		message: 'You are not allowed to access this page.',
	},
	'404': {
		title: 'While we are busy building the earth, we have not yet built this page.',
		message: "We can't find the page you're looking for. Please check the URL and try again.",
	},
	'405': {
		title: 'Method Not Allowed',
		message: 'The method used to access this page is not allowed. Please try again with a GET method.',
	},
	'408': {
		title: 'Request Timeout',
		message: 'The page you are looking for is taking too long to load. Please try again later.',
	},
	'418': {
		title: '🫖',
		message: 'Please get comfortable with the tea and try again.',
	},
	'429': {
		title: 'Too Many Requests',
		message: 'You are trying to access this page too often. Please try again later.',
	},
	'500': {
		code: '500',
		title: 'Internal Server Error',
		message: "We're having some issues with our server, please try again later.",
	},
	'501': {
		title: 'Not Implemented',
		message: 'Your browser does not support features our website requires. Please update your browser.',
	},
	'502': {
		title: 'Bad Gateway',
		message: 'Our servers are overloaded at the given time, please try again later.',
	},
	'503': {
		title: 'Service Unavailable',
		message: 'Our servers are overloaded at the given time, please try again later.',
	},
	'508': {
		title: 'Loop Detected',
		message: 'We detected a loop. Please try again later.',
	},
};

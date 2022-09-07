import { Button, Center, Title, useMantineTheme } from '@mantine/core';

import Page from '../components/Page';
import { useRouter } from 'next/router';

const errors = [
	{
		code: 300,
		title: 'Multiple Choices',
		message: 'You requested a page that has too many options to choose from. Pleas try again with a different page.',
	},
	{
		code: 301,
		title: 'Moved Permanently',
		message: 'The page you requested has been permanently moved to a different URL. Please try again with the new URL.',
	},
	{
		code: 400,
		title: 'Bad Request',
		message: 'Please reload the page and check for a working internet connection.',
	},
	{
		code: 401,
		title: 'Unauthorized',
		message: 'You are not allowed to access this page.',
	},
	{
		code: 403,
		title: 'Forbidden',
		message: 'You are not allowed to access this page.',
	},
	{
		code: 404,
		title: 'Not Found',
		message: "We can't find the page you're looking for. Please check the URL and try again.",
	},
	{
		code: 405,
		title: 'Method Not Allowed',
		message: 'The method used to access this page is not allowed. Please try again with a GET method.',
	},
	{
		code: 408,
		title: 'Request Timeout',
		message: 'The page you are looking for is taking too long to load. Please try again later.',
	},
	{
		code: 418,
		title: '🫖',
		message: 'Please get comfortable with the Tea and try again.',
	},
	{
		code: 429,
		title: 'Too Many Requests',
		message: 'You are trying to access this page too often. Please try again later.',
	},
	{
		code: 500,
		title: 'Internal Server Error',
		message: "We're having some issues with our server, please try again later.",
	},
	{
		code: 501,
		title: 'Not Implemented',
		message: 'Your browser does not support features our website requires. Please update your browser.',
	},
	{
		code: 502,
		title: 'Bad Gateway',
		message: 'Our servers are overloaded at the given time, please try again later.',
	},
	{
		code: 503,
		title: 'Service Unavailable',
		message: 'Our servers are overloaded at the given time, please try again later.',
	},
	{
		code: 508,
		title: 'Loop Detected',
		message: 'We detected a loop. Please try again later.',
	},
];

function ErrorPage(props: any) {
	const theme = useMantineTheme();
	const code = props.code || props.statuscode;
	const status = errors.find((e) => e.code === code) || {
		code: code,
		title: 'You found a Error we dont even know of! (' + code + ')',
		message: props.error.message || 'Something went wrong, please try again later and contact us.',
	};
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
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						background: `url("/images/placeholder.png")`,
						filter: 'brightness(0.5)',
						width: '100%',
						height: 'calc(100vh - 60px)',
						marginTop: 60,
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
						<Title style={{ color: '#ffffff', fontSize: 220 }} align="center" order={1}>
							{status.code}
						</Title>
						<Title style={{ color: '#ffffff' }} align="center" order={1}>
							{status.title}
						</Title>
						<Title style={{ color: theme.colors.gray[4] }} align="center" order={3}>
							{status.message}
							<br />
							<Button
								variant="outline"
								size="xl"
								style={{ color: 'white', borderColor: 'white', borderWidth: 3, marginTop: theme.spacing.xl * 1.5 }}
								onClick={() => router.back()}
							>
								Go Back
							</Button>
						</Title>
					</div>
				</Center>
			</div>
			<div></div>
		</Page>
	);
}
export function getServerSideProps({ res, err }: any) {
	if (new Date().getDate() === 1 && new Date().getMonth() === 4) {
		res.statusCode = 418;
	}

	return {
		props: {
			code: res.statusCode,
		},
	};
}
export default ErrorPage;

import {
	Button,
	Center,
	Loader,
	Title,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';

import Page from '@/components/Page';
import thumbnail from '@/public/images/thumbnails/error.png';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';

function ErrorPage(props: any) {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { t } = useTranslation('common');
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
				<Image
					src={thumbnail}
					alt="Error Image"
					style={{
						filter: 'brightness(0.5)',
						width: '100%',
						height: '100vh',
						objectFit: 'cover',
					}}
				/>
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
						{code == 1 ? (
							<Title ta="center" order={1}>
								<Loader color="white" size="xl" />
							</Title>
						) : (
							<Title
								style={{ color: '#ffffff', fontSize: 220, userSelect: 'none' }}
								ta="center"
								order={1}
							>
								{code}
							</Title>
						)}
						<Title style={{ color: '#ffffff' }} ta="center" order={1}>
							{errors[code]?.title || errors[500].title}
						</Title>
						<Title style={{ color: theme.colors.gray[4] }} ta="center" order={3}>
							{errors[code]?.message || errors[500].message}
							<br />
							{code != 1 && (
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
									{t('button.back')}
								</Button>
							)}
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
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
export default ErrorPage;

const errors: any = {
	'1': {
		title: 'Loading data',
		message: 'You will be redirected shortly',
	},
	'301': {
		title: 'Moved Permanently',
		message:
			'The page you requested has been permanently moved to a different URL. Please try again with the new URL.',
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
		message:
			'The method used to access this page is not allowed. Please try again with a GET method.',
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
		message:
			'Your browser does not support features our website requires. Please update your browser.',
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

import { Button, Text, useMantineTheme } from '@mantine/core';

import Page from '@/components/Page';
import thumbnail from '@/public/images/placeholder.webp';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const SignIn: NextPage = () => {
	const router = useRouter();
	const theme = useMantineTheme();
	if (router.query.error) {
		console.error('Sign In Error: ', router.query.error, ' Please report to BuildTheEarth');
	}
	return (
		<Page
			head={{
				title: 'Sign in',
				image: thumbnail,
			}}
			seo={{ nofollow: true, noindex: true }}
		>
			<h2>Sign in to BuildTheEarth</h2>
			<p>
				To access this page you need to sign in with your BuildTheEarth Account. <br />
			</p>

			{router.query.error && (
				<p style={{ color: theme.colors.red[6] }}>An error occurred, please try again later.</p>
			)}

			<Button onClick={() => signIn('keycloak')}>Sign in</Button>

			{router.query.callbackUrl && (
				<Text size="sm" c="dimmed" mt="sm">
					After Login you will be redirected to {router.query.callbackUrl}
				</Text>
			)}
		</Page>
	);
};

export default SignIn;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

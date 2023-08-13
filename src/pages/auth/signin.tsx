import { Button, useMantineTheme } from '@mantine/core';

import { NextPage } from 'next';
import Page from '../../components/Page';
import { signIn } from 'next-auth/react';
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
				image: '/images/placeholder.webp',
				large: true,
			}}
			seo={{ nofollow: true, noindex: true }}
		>
			<h2>Sign in to BuildTheEarth</h2>
			<p>
				On your My BuildTheEarth page, you can apply to join a Build Team or request to be verified as solo builder and
				work on projects yourself. <br />
				It is also the place where you can upload your world when you have finished. To access your page, you need to
				Sign in. <br />
			</p>
			{router.query.error && <p style={{ color: theme.colors.red[6] }}>An error occurred, please try again later.</p>}
			<Button onClick={() => signIn('keycloak')}>Sign in</Button>
		</Page>
	);
};

export default SignIn;

import { Button, useMantineTheme } from '@mantine/core';

import { NextPage } from 'next';
import Page from '../../components/Page';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const SignIn: NextPage = () => {
	const { t } = useTranslation('signin');
	const router = useRouter();
	const theme = useMantineTheme();
	if (router.query.error) {
		console.error('Sign In Error: ', router.query.error, ' Please report to BuildTheEarth');
	}
	return (
		<Page
			head={{
				title: t('head'),
				image: '/images/placeholder.png',
				large: true,
			}}
		>
			<h2>{t('title')}</h2>
			<p>{t('content')}</p>
			{router.query.error && <p style={{ color: theme.colors.red[6] }}>An error occurred, please try again later.</p>}
			<Button onClick={() => signIn('keycloak')}>{t('action')}</Button>
		</Page>
	);
};

export default SignIn;

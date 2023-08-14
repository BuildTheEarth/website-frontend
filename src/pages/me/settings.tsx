import { Badge, Code, Text, Title } from '@mantine/core';

import { NextPage } from 'next';
import Page from '../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';

const Settings: NextPage = () => {
	const { data: session } = useSession();
	return session?.user ? (
		<Page
			head={{
				title: 'Account Settings',
				image: '/images/placeholder.webp',
			}}
		>
			<h2>
				Token Information <Badge color="red">For testing purposes only</Badge>
			</h2>
			<h3>Times</h3>
			<Text>
				Expiry Time: <Code>{new Date(session.user.exp * 1000).toLocaleString()}</Code>
			</Text>
			<Text>
				Issued at: <Code>{new Date(session.user.iat * 1000).toLocaleString()}</Code>
			</Text>
			<Text>
				Auth time: <Code>{new Date(session.user.auth_time * 1000).toLocaleString()}</Code>
			</Text>
			<h3>IDs</h3>
			<Text>
				JWT Id: <Code>{session.user.jti}</Code>
			</Text>
			<Text>
				Sub: <Code>{session.user.sub}</Code>
			</Text>
			<Text>
				SID: <Code>{session.user.sid}</Code>
			</Text>
			<Text>
				ID: <Code>{session.user.id}</Code>
			</Text>
			<h3>Issuer</h3>
			<Text>
				Issuer URL: <Code>{session.user.iss}</Code>
			</Text>
			<Text>
				Realm: <Code>{session.user.iss.split('/').at(-1)}</Code>
			</Text>
			<Text>
				Audience: <Code>{session.user.aud}</Code>
			</Text>
			<Text>
				Authorized Parties: <Code>{session.user.azp}</Code>
			</Text>
			<h3>User Details</h3>
			<Text>
				Email: <Code>{session.user.email}</Code>
			</Text>
			<Text>
				Name: <Code>{session.user.name}</Code>
			</Text>
			<Text>
				Preferred Username: <Code>{session.user.preferred_username}</Code>
			</Text>
			<Text>
				Username: <Code>{session.user.username}</Code>
			</Text>
			<Text>
				First Name: <Code>{session.user.given_name}</Code>
			</Text>
			<Text>
				Last Name: <Code>{session.user.family_name}</Code>
			</Text>
			<h3>Other</h3>
			<Text>
				Session State: <Code>{session.user.session_state}</Code>
			</Text>
			<Text>
				At Hash: <Code>{session.user.at_hash}</Code>
			</Text>
			<Text>
				Locale: <Code>{session.user.locale}</Code>
			</Text>
			<Text>
				Access Token: <Code style={{ wordBreak: 'break-all' }}>{session.accessToken}</Code>
			</Text>
		</Page>
	) : (
		<Page>
			<Title>You are not logged in</Title>
			<Text>You need to be logged in to view this page.</Text>
		</Page>
	);
};

export default Settings;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

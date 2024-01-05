import NextAuth, { NextAuthOptions } from 'next-auth';

import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

const refreshAccessToken = async (token: JWT) => {
	try {
		if (Date.now() > token.refreshTokenExpired) throw Error;
		const details = {
			client_id: process.env.KEYCLOAK_ID,
			client_secret: process.env.KEYCLOAK_SECRET,
			grant_type: 'refresh_token',
			refresh_token: token.refreshToken,
		};
		const formBody: string[] = [];
		Object.entries(details).forEach(([key, value]: [string, any]) => {
			const encodedKey = encodeURIComponent(key);
			const encodedValue = encodeURIComponent(value);
			formBody.push(encodedKey + '=' + encodedValue);
		});
		const formData = formBody.join('&');
		const url = `${process.env.KEYCLOAK_URL}/protocol/openid-connect/token`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			body: formData,
		});
		const refreshedTokens = await response.json();
		if (!response.ok) throw refreshedTokens;
		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpired: Date.now() + (refreshedTokens.expires_in - 15) * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
			refreshTokenExpired: Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
		};
	} catch (error) {
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
};

export const nextAuthConfig: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		KeycloakProvider({
			clientId: process.env.KEYCLOAK_ID || '',
			clientSecret: process.env.KEYCLOAK_SECRET || '',
			issuer: process.env.KEYCLOAK_URL || '',
			profile: (profile) => {
				return {
					...profile,
					username: profile.preferred_username,
					id: profile.sub,
				};
			},
		}),
	],
	callbacks: {
		signIn: async ({ user, account }) => {
			if (account && user) {
				return true;
			} else {
				// TODO : Add unauthorized page
				return '/unauthorized';
			}
		},
		jwt: async ({ token, account, user }: any) => {
			// Initial sign in
			if (account && user) {
				// Add access_token, refresh_token and expirations to the token right after signin
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.accessTokenExpired = Date.now() + (account.expires_in - 15) * 1000;
				token.refreshTokenExpired = Date.now() + (account.refresh_expires_in - 15) * 1000;
				token.user = user;
				return token;
			}
			// Return previous token if the access token has not expired yet
			if (Date.now() < token.accessTokenExpired) return token;

			// Access token has expired, try to update it
			return refreshAccessToken(token);
		},
		session: async ({ session, token }: any) => {
			if (token) {
				session.user = token.user;
				session.error = token.error;
				session.accessToken = token.accessToken;
			}
			return session;
		},
	},
	pages: {
		signIn: '/auth/signin',
	},
};

export default NextAuth(nextAuthConfig);

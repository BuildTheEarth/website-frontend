import { useSession } from 'next-auth/react';

export const useAccessToken = () => {
	const session = useSession();

	const token = {
		accessToken: session.data?.accessToken,
		isLoggedIn: session.status === 'authenticated',
		isLoading: session.status === 'loading',
	};
	return token;
};

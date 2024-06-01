import useSWR, { mutate } from 'swr';

import { useSession } from 'next-auth/react';

export const useUser = () => {
	const { data, isLoading } = useSWR('/account');
	const session = useSession();

	const user = {
		user: data,
		token: session.data?.accessToken,
		isLoggedIn: session.status === 'authenticated',
		isLoading: session.status === 'loading' || isLoading,
		refresh: () => mutate('/account'),
	};
	return user;
};

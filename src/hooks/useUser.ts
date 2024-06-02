import useSWR, { mutate } from 'swr';

import { useSession } from 'next-auth/react';

export const useUser = () => {
	const { data } = useSWR('/account');

	const user = {
		user: data,
		refresh: () => mutate('/account'),
	};
	return user;
};

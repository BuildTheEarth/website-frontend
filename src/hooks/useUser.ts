import useSWR, { mutate } from 'swr';

export const useUser = () => {
	const { data } = useSWR('/account');

	const user = {
		user: data,
		refresh: () => mutate('/account'),
	};
	return user;
};

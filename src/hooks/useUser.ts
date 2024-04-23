import useSWR, { mutate } from 'swr';

import { useSession } from 'next-auth/react';

export const useUser = () => {
	const { data, isLoading } = useSWR('/account');
	const session = useSession();

	const user = {
		user: data,
		token: session.data?.accessToken,
		isLoggedIn: session.status === 'authenticated',
		isLoading: session.status === 'loading' && isLoading,
		refresh: () => mutate('/account'),
		hasPermission: (p: string, buildteam?: string) => {
			return user.hasPermissions([p], buildteam);
		},
		hasPermissions: (ps: string[], buildteam?: string) => {
			const permissions = data?.permissions;
			if (!permissions) return false;
			if (
				permissions
					.filter((p: any) =>
						buildteam
							? p.buildTeamId === buildteam ||
							  p.buildTeamSlug === buildteam ||
							  p.buildTeamId == null
							: true,
					)
					.find((p: any) => ps.includes(p.permission))
			)
				return true;
			return false;
		},
	};
	return user;
};

import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

import minimatch from 'minimatch';
import { useSession } from 'next-auth/react';

export const useUser = () => {
	const { data } = useSWR('/account');
	const session = useSession();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (data && session.status != 'loading') setLoading(false);
	}, [data, session]);

	const user = {
		user: data,
		token: session.data?.accessToken,
		isLoading: loading,
		refresh: () => mutate('/account'),
		hasPermission: (p: string, buildteam?: string) => {
			return user.hasPermissions([p], buildteam);
		},
		hasPermissions: (ps: string[], buildteam?: string) => {
			const permissions = data?.permissions;
			if (!permissions) return false;
			if (permissions.filter((p: any) => (buildteam ? p.buildTeamId === buildteam : true)).find((p: any) => ps.includes(p.permission))) return true;
			return false;
		},
		reload: () => mutate('/account'),
	};
	return user;
};

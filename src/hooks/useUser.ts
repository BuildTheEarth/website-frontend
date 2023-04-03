import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

import minimatch from 'minimatch';
import { useSession } from 'next-auth/react';

export const useUser = () => {
	const { data } = useSWR('/account');
	const session = useSession();
	const user = {
		user: data,
		token: session.data?.accessToken,
		refresh: () => mutate('/account'),
		hasPermission: (permission: string) => {
			const permissions = data?.permissions;
			if (!permissions) return false;
			if (permissions.find((p: any) => minimatch(permission, p.permission))) return true;
			return false;
		},
	};
	return user;
};

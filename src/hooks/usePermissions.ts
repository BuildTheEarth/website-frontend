import { useLocalStorage } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import useSWR from 'swr';

type PermissionState = {
	iat: Date; // Issued At
	for: string; // User
	data: { buildTeamId?: string; buildTeamSlug?: string; permission: string }[];
};

export const usePermissions = () => {
	const [cache, setCacheData] = useLocalStorage<PermissionState>({
		key: 'auth-permission-state',
		defaultValue: { iat: new Date(), for: '################################', data: [] },
	});
	const { data, isLoading, mutate } = useSWR('/account');
	const session = useSession();

	const updateCache = () => {
		mutate();
	};

	useEffect(() => {
		if (!data) return;
		if (!data.permissions) return;

		setCacheData({
			iat: new Date(),
			for: data.id,
			data: data.permissions.map((permission: any) => ({
				permission: permission.permission,
				buildTeamId: permission.buildTeamId,
				buildTeamSlug: permission.buildTeamSlug,
			})),
		});
	}, [data, setCacheData]);

	const permissions = {
		permissions: cache.data,
		iat: cache.iat,
		isLoading: isLoading,
		updateCache: updateCache,
		dropCache: () => {
			setCacheData({ iat: new Date(), for: '################################', data: [] });
		},
		has: (permissionsToCheck: string, buildteam?: string) => {
			return permissions.hasAny([permissionsToCheck], buildteam);
		},
		hasAny: (permissionsToCheck: string[], buildteam?: string) => {
			const data = cache.data;

			if (!data || data.length === 0) return false;

			if (!buildteam || buildteam == null) {
				return data.some(
					({ permission, buildTeamId }) =>
						buildTeamId == null && permissionsToCheck.includes(permission),
				);
			}

			return data.some(({ permission, buildTeamId, buildTeamSlug }) => {
				return (
					(buildTeamId == buildteam || buildTeamSlug == buildteam || buildTeamId == null) &&
					permissionsToCheck.includes(permission)
				);
			});
		},
	};

	return permissions;
};

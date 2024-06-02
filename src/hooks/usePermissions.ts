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
			// const data = cache.data;
			console.log('-------------------------------------------------');
			console.log(buildteam, permissionsToCheck);
			const data = [
				{ permission: 'account.info', buildTeamId: null, buildTeamSlug: null },
				{ permission: 'account.edit', buildTeamId: null, buildTeamSlug: null },
				{
					permission: 'permission.add',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
				{
					permission: 'permission.remove',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
				{
					permission: 'team.application.edit',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
				{
					permission: 'team.application.review',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
				{
					permission: 'team.socials.edit',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
				{
					permission: 'team.application.list',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
				{
					permission: 'team.application.notify',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
				{
					permission: 'team.showcases.edit',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
				{
					permission: 'team.settings.edit',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
				{
					permission: 'team.claim.list',
					buildTeamId: '374b0e08-9ef5-4d1c-9a5c-3dc204d9fd96',
					buildTeamSlug: 'de',
				},
			];
			if (!data || data.length === 0) return false;

			if (!buildteam || buildteam == null) {
				return data.some(
					({ permission, buildTeamId }) =>
						buildTeamId == null && permissionsToCheck.includes(permission),
				);
			}

			return data.some(({ permission, buildTeamId, buildTeamSlug }) => {
				console.log(buildTeamId, buildTeamSlug, permission);

				return (
					(buildTeamId == buildteam || buildTeamSlug == buildteam || buildTeamId == null) &&
					permissionsToCheck.includes(permission)
				);
			});
		},
	};

	return permissions;
};

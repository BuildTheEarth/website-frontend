import {
	ActionIcon,
	Checkbox,
	Group,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	Table,
	rem,
} from '@mantine/core';
import { IconCheck, IconDots, IconMap, IconPin, IconTrash } from '@tabler/icons-react';
import useSWR, { mutate } from 'swr';

import { useClipboard } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { getAreaOfPolygon } from 'geolib';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import thumbnail from '../../../../../public/images/thumbnails/teams.png';
import Page from '../../../../components/Page';
import SettingsTabs from '../../../../components/SettingsTabs';
import { useUser } from '../../../../hooks/useUser';
import fetcher from '../../../../utils/Fetcher';

const Settings = () => {
	const router = useRouter();
	const user = useUser();
	const { data } = useSWR(`/claims?slug=true&team=${router.query.team}`);
	const clipboard = useClipboard();

	const handleDelete = (id: string) => {
		fetch(
			process.env.NEXT_PUBLIC_API_URL + `/buildteams/${router.query.team}/claims/${id}?slug=true`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token,
				},
			},
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					showNotification({
						title: 'Deletion failed',
						message: res.error,
						color: 'red',
					});
				} else {
					showNotification({
						title: 'Claim deleted',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					mutate(
						`/claims?slug=true&team=${router.query.team}`,
						data.filter((s: any) => s.id != id),
					);
				}
			});
	};
	return (
		<Page
			smallPadding
			head={{
				title: 'Claims',
				image: thumbnail,
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={[
				'team.settings.edit',
				'team.socials.edit',
				'team.application.edit',
				'team.application.list',
				'team.application.review',
			]}
			loading={!data}
		>
			<SettingsTabs team={router.query.team?.toString() || ''} loading={!data}>
				<Table.ScrollContainer minWidth={800}>
					<Table verticalSpacing="sm">
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Name</Table.Th>
								<Table.Th>Finished</Table.Th>
								<Table.Th>Visible on Map</Table.Th>
								<Table.Th>Area</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{data
								?.map((s: any) => ({
									...s,
									area: Math.round(
										getAreaOfPolygon(s.area.map((p: string) => p.split(', ').map(Number))),
									),
								}))
								.sort((a: any, b: any) => b.area - a.area)
								.map((s: any) => (
									<Table.Tr key={s.id}>
										<Table.Td>{s.name}</Table.Td>
										<Table.Td>
											<Checkbox color="green" checked={s.finished} />
										</Table.Td>
										<Table.Td>
											<Checkbox color="green" checked={s.active} />
										</Table.Td>
										<Table.Td>{s.area.toLocaleString()} m²</Table.Td>
										<Table.Td>
											<Group gap={0} justify="flex-end">
												<Menu>
													<MenuTarget>
														<ActionIcon variant="subtle" color="gray">
															<IconDots style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
														</ActionIcon>
													</MenuTarget>
													<MenuDropdown>
														<MenuItem
															leftSection={<IconPin />}
															onClick={() =>
																clipboard.copy(
																	`${s.center.split(', ')[1]}, ${s.center.split(', ')[0]}`,
																)
															}
														>
															Copy Coordinates
														</MenuItem>
														<MenuItem
															leftSection={<IconMap />}
															component={Link}
															href={`/map?claim=${s.id}`}
														>
															Open on Map
														</MenuItem>
													</MenuDropdown>
												</Menu>
												<ActionIcon variant="subtle" color="red" onClick={() => handleDelete(s.id)}>
													<IconTrash style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
												</ActionIcon>
											</Group>
										</Table.Td>
									</Table.Tr>
								))}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</SettingsTabs>
		</Page>
	);
};

export default Settings;
export async function getStaticProps({ locale, params }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}

export async function getStaticPaths() {
	const res = await fetcher('/buildteams');
	return {
		paths: res.map((team: any) => ({
			params: {
				team: team.slug,
			},
		})),
		fallback: true,
	};
}

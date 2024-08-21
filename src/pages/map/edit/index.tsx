import {
	ActionIcon,
	Alert,
	Avatar,
	Button,
	Code,
	Divider,
	Grid,
	GridCol,
	Group,
	Indicator,
	Loader,
	Menu,
	MenuDivider,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	NumberInput,
	ScrollAreaAutosize,
	Select,
	Switch,
	Table,
	TableTbody,
	TableTd,
	TableTr,
	Text,
	TextInput,
	Textarea,
	Tooltip,
	rem,
} from '@mantine/core';
import {
	IconArrowsDiff,
	IconBrandMinecraft,
	IconCheck,
	IconDeviceFloppy,
	IconDots,
	IconExclamationMark,
	IconId,
	IconPlus,
	IconTrash,
	IconUsersGroup,
} from '@tabler/icons-react';
import {
	SnapDirectSelect,
	SnapLineMode,
	SnapModeDrawStyles,
	SnapPointMode,
	SnapPolygonMode,
} from 'mapbox-gl-draw-snap-mode';
import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { ClaimDrawerImages } from '@/components/map/ClaimDrawerImages';
import { Discord } from '@icons-pack/react-simple-icons';
import Map from '@/components/map/Map';
import { MapContextMenu } from '@/components/map/MapContextMenu';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { NextPage } from 'next';
import Page from '@/components/Page';
import { modals } from '@mantine/modals';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useAccessToken } from '@/hooks/useAccessToken';
import { useContextMenu } from '@/components/ContextMenu';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/hooks/useUser';

const ClaimEditPage: NextPage = () => {
	const { t } = useTranslation('map');
	const router = useRouter();
	const clipboard = useClipboard();

	const [state, setState, contextHandler] = useContextMenu({ disableEventPosition: false });
	const [clientPos, setClientPos] = useState<{ lat: number | null; lng: number | null }>({
		lat: null,
		lng: null,
	});
	const [map, setMap] = useState<mapboxgl.Map>();
	const user = useUser();
	const { accessToken, isLoggedIn } = useAccessToken();
	const permissions = usePermissions();
	const [draw, setDraw] = useState(
		new MapboxDraw({
			displayControlsDefault: false,
			modes: {
				...MapboxDraw.modes,
				draw_point: SnapPointMode,
				draw_polygon: SnapPolygonMode,
				draw_line_string: SnapLineMode,
				direct_select: SnapDirectSelect,
			},
			// Styling guides
			styles: SnapModeDrawStyles,
			userProperties: true, //@ts-ignore
			snap: true,
			snapOptions: {
				snapPx: 15,
				snapToMidPoints: true,
				snapVertexPriorityDistance: 0.0025,
			},
			guides: false,
		}),
	);

	const [selected, setSelected] = useState<undefined | any>();
	const [loading, setLoading] = useState(false);
	const [builderSearch, setBuilderSearch] = useDebouncedState('', 1500);
	const [builderSearchLoading, setBuilderSearchLoading] = useState(false);
	const [builderSearchResults, setBuilderSearchResults] = useState<any[]>([]);
	const { data: userData, isLoading: userDataLoading } = useSWR(`/users/${user?.user?.id}`);

	const isAbleToUpdate = (feature: any) => {
		if (feature.properties?.owner?.id == user.user?.id) return { able: true, type: 'OWNER' };
		if (feature.properties?.new == true) return { able: true, type: 'OWNER' };
		if (
			feature.properties.buildTeam &&
			permissions.has('team.claim.list', feature.properties.buildTeam.id)
		)
			return { able: true, type: 'TEAM' };
		return { able: false, type: '' };
	};

	useEffect(() => {
		if (selected) {
			console.log(selected);
			if (selected.properties?.new == true) {
				draw.setFeatureProperty(selected.id, 'new', undefined);
				draw
					.setFeatureProperty(selected.id, 'owner', {
						id: user.user?.id,
						ssoId: user.user?.ssoId,
						avatar: user.user?.avatar,
						minecraft: user.user?.minecraft || user.user?.username,
					})
					.setFeatureProperty(selected.id, 'id', selected.id)
					.setFeatureProperty(selected.id, 'new', true);
				setSelected(draw.get(selected.id));
			}
			const { able, type: ableType } = isAbleToUpdate(selected);
			if (!able) {
				showNotification({
					title: 'Warning',
					color: 'orange',
					message: 'You cannot edit this claim',
					icon: <IconExclamationMark />,
				});
				setSelected(undefined);
				draw.changeMode('simple_select');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	useEffect(() => {
		if (builderSearch.length > 0) {
			fetch(
				process.env.NEXT_PUBLIC_API_URL +
					`/builders/search?search=${builderSearch}&take=5&exact=false`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + accessToken,
					},
				},
			)
				.then((res) => res.json())
				.then((res) => {
					if (res.errors) {
						showNotification({
							title: 'Search failed',
							message: res.message,
							color: 'red',
						});
						setBuilderSearchLoading(false);
					} else {
						setBuilderSearchResults(res);
						setBuilderSearchLoading(false);
					}
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [builderSearch]);

	const handleUpdate = (arg: string, value: any, noUpdate?: boolean) => {
		if (selected) {
			draw.setFeatureProperty(selected.id, arg, value);
			if (!noUpdate) setSelected(draw.get(selected.id));
		}
	};

	const handleTransferOwnership = (newOwner: any) => {
		modals.openConfirmModal({
			title: 'Confirm Ownership Transfer',
			children: (
				<Text size="sm">
					You will transfer the ownership of this claim to <b>{newOwner.username}</b>. This action
					cannot be reversed. You will lose all permissions to edit this claim.
				</Text>
			),
			labels: { confirm: 'Transfer', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			centered: true,
			onConfirm: () => {
				const currentOwner = selected.properties.owner;
				handleUpdate(
					'builders',
					selected.properties.builders.filter((b: any) => b.id != newOwner.id),

					true,
				);

				if (currentOwner) {
					handleUpdate(
						'builders',
						[
							...selected.properties.builders,
							{
								new: true,
								...currentOwner,
								username: currentOwner.username || currentOwner.minecraft,
							},
						],
						true,
					);
				}

				handleUpdate('owner', { new: true, ...newOwner });
			},
		});
	};

	const handleCreate = (feature: any) => {
		draw
			.setFeatureProperty(feature.id, 'id', feature.id)
			.setFeatureProperty(feature.id, 'new', true);
		setSelected(draw.get(feature.id));
	};

	const handleDelete = () => {
		setSelected(draw.get(selected.id));
		setLoading(true);

		modals.openConfirmModal({
			title: 'Delete Claim',
			children: <Text size="sm">You will delete this claim. This action cannot be reversed.</Text>,
			labels: { confirm: 'Delete', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			centered: true,
			onConfirm: () => continueDelete(),
			onAbort: () => {
				setLoading(false);
			},
		});

		const continueDelete = () => {
			fetch(process.env.NEXT_PUBLIC_API_URL + `/claims/${selected.properties.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + accessToken,
				},
			})
				.then((res) => res.json())
				.then(async (res) => {
					if (res.errors) {
						showNotification({
							title: 'Deletion failed',
							message: res.error,
							color: 'red',
						});
						setLoading(false);
					} else {
						showNotification({
							title: 'Claim deleted',
							message: 'All Data has been saved',
							color: 'green',
							icon: <IconCheck />,
						});
						setSelected(undefined);

						draw.changeMode('simple_select');
						const geojson = await fetch(
							`${process.env.NEXT_PUBLIC_API_URL}/claims/geojson?props=true`,
						).then((r) => r.json());

						draw.set(geojson);
						setLoading(false);
					}
				});
		};
	};

	const handleSave = () => {
		setSelected(draw.get(selected.id));
		setLoading(true);
		fetch(
			process.env.NEXT_PUBLIC_API_URL + `/claims/${selected.properties.id}?coordType=numberarray`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + accessToken,
				},
				body: JSON.stringify({
					...selected.properties,
					area: selected.geometry.coordinates[0],
					buidings: undefined,
					buildTeam: undefined,
					osmName: undefined,
					owner: selected.properties.owner.id,
				}),
			},
		)
			.then((res) => res.json())
			.then(async (res) => {
				if (res.errors) {
					showNotification({
						title: 'Update failed',
						message: res.error,
						color: 'red',
					});
					setLoading(false);
				} else {
					showNotification({
						title: 'Claim updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});

					const geojson = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/claims/geojson?props=true`,
					).then((r) => r.json());

					draw.set(geojson);
					setLoading(false);
					draw.changeMode('simple_select');
					setSelected(undefined);
				}
			});
	};
	const handleSaveNew = () => {
		setSelected(draw.get(selected.id));

		if (!selected.properties.buildTeam?.id) {
			showNotification({
				title: 'Creation failed',
				message: 'Please choose a BuildTeam',
				color: 'red',
			});
			return;
		}
		setLoading(true);
		fetch(process.env.NEXT_PUBLIC_API_URL + `/claims?coordType=numberarray`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify({
				...selected.properties,
				area: selected.geometry.coordinates[0],
				buidings: undefined,
				buildTeam: undefined,
				osmName: undefined,
				owner: selected.properties.owner.id,
				team: selected.properties.buildTeam.id,
			}),
		})
			.then((res) => res.json())
			.then(async (res) => {
				if (res.errors) {
					showNotification({
						title: 'Creation failed',
						message: res.error,
						color: 'red',
					});
					setLoading(false);
				} else {
					showNotification({
						title: 'Claim created',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});

					const geojson = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/claims/geojson?props=true`,
					).then((r) => r.json());

					draw.set(geojson);
					setLoading(false);
					draw.changeMode('simple_select');
					setSelected(undefined);
				}
			});
	};

	return (
		<Page fullWidth solidHeader>
			<MapContextMenu
				contextMenuInfo={state}
				setContextMenuInfo={setState}
				oLat={clientPos.lat}
				oLng={clientPos.lng}
			/>
			<Grid columns={10} gutter={0} grow>
				<GridCol span={3}>
					<ScrollAreaAutosize
						style={{
							borderRight: 'var(--mantine-color-default-border) 1px solid',
						}}
						mah="100vh"
						w="100%"
						h="100%"
						pl="lg"
						pb="lg"
						pr="xs"
						pt="60px"
						offsetScrollbars
					>
						{!selected ? (
							<>
								<h1>Edit Claims</h1>
								<h2>Select Claim</h2>
								<p>
									Select a Claim on the Map to edit it. You can select your own Claims or Claims of
									BuildTeams in which you have the correct Permissions.
								</p>
								<h2>Edit Claim Area</h2>
								<p>
									When having a Claim selected, you can click on it again to enter edit mode. In
									this mode you can drag all corners and add new ones by draging the smaller dots
									between corners. All corners you add will automatically snap to other corners and
									claims in the area.
								</p>
								<h2>Edit Claim Properties</h2>
								<p>
									If you have selected a Claim on the Map, all its properties which you can edit
									will appear here. The area and building count will be automatically calculated
									once you save your edit.
								</p>
								<Alert variant="outline" title="Saving" icon={<IconDeviceFloppy />} mt="xl">
									Do not forget to save your changes, they will be overriden once you reload the
									Page.
								</Alert>
								<h1>Create Claim</h1>
								<p>
									Click on the button below to start creating a new Claim on the Map. Left click to
									add a edge, double click to finish.
								</p>
								<Button
									leftSection={<IconPlus />}
									fullWidth
									mt="md"
									disabled={map && draw && draw?.getMode() == 'draw_polygon'}
									onClick={() => draw.changeMode('draw_polygon')}
								>
									Create new Claim
								</Button>
							</>
						) : (
							<>
								<h1>Edit Claim</h1>
								{isAbleToUpdate(selected).type == 'TEAM' && (
									<Alert
										variant="outline"
										title="BuildTeam Claim"
										icon={<IconUsersGroup />}
										color="yellow"
										mb="lg"
									>
										This claim does not belong to you. You are editing it on behalf of{' '}
										{selected.properties.buildTeam.name}.
									</Alert>
								)}
								<h3>Claim Properties</h3>
								<ClaimDrawerImages
									id={selected.id}
									images={selected.properties.images}
									editable={
										isLoggedIn &&
										(selected.properties?.owner?.id == user.user?.id ||
											permissions.has('admin.admin'))
									}
									t={t}
									onAdd={(image) => {
										handleUpdate('images', [...selected.properties.images, image]);
									}}
									onRemove={(img) => {
										handleUpdate(
											'images',
											selected.properties.images.filter((image: any) => image.id != img),
										);
									}}
								/>
								{selected.properties?.new == true && (
									<Select
										label={t('claim.details.team')}
										data={userData?.joinedBuildTeams?.map((b: any) => ({
											label: b.name,
											value: b.id,
											disabled: !b.allowBuilderClaim,
										}))}
										mb="md"
										onChange={(v) => {
											const bt = userData?.joinedBuildTeams.find((bt: any) => bt.id == v);
											handleUpdate(
												'buildTeam',
												bt ? { id: bt.id, slug: bt.slug, name: bt.name } : undefined,
											);
										}}
										placeholder={
											userDataLoading ? 'Loading aviable BuildTeams...' : 'Select a BuildTeam'
										}
									/>
								)}
								<TextInput
									label={t('edit.name')}
									required
									placeholder="New Claim"
									defaultValue={selected.properties.name}
									onChange={(e) => handleUpdate('name', e.target.value)}
									mb="md"
								/>
								<TextInput
									label={t('claim.details.city')}
									required
									placeholder="New York"
									defaultValue={selected.properties.city}
									onChange={(e) => handleUpdate('city', e.target.value)}
									mb="md"
								/>
								<Textarea
									label={t('edit.description')}
									defaultValue={selected.properties.description}
									onChange={(e) => handleUpdate('description', e.target.value)}
									maxRows={5}
									minRows={3}
									autosize
									placeholder="Describe your claim..."
									mb="md"
								/>
								<Switch
									defaultChecked={selected.properties.finished}
									label={t('edit.finished')}
									onChange={(e) => handleUpdate('finished', e.target.checked)}
									mb="md"
								/>
								<Switch
									defaultChecked={selected.properties.active}
									label={t('edit.active')}
									onChange={(e) => handleUpdate('active', e.target.checked)}
									mb="md"
								/>
								<Tooltip label={t('edit.buildings.description')}>
									<NumberInput
										readOnly
										value={selected.properties.buildings}
										label={t('edit.buildings.title')}
										disabled
										placeholder="0"
										mb="md"
									/>
								</Tooltip>
								<Tooltip label={t('edit.buildings.description')}>
									<TextInput
										readOnly
										value={selected.properties.osmName}
										label={t('claim.details.address')}
										disabled
										mb="md"
									/>
								</Tooltip>
								<h3>{t('edit.builders.title')}</h3>
								<Table verticalSpacing="md" mb="md">
									<Table.Tbody>
										<Table.Tr>
											<Table.Td>
												<Group gap="sm">
													<Indicator
														disabled={!selected.properties?.owner?.new}
														processing={loading}
														color="orange"
													>
														<Avatar
															size={40}
															src={selected.properties?.owner?.avatar}
															radius={40}
															color="cyan"
														>
															{(selected.properties?.owner?.username ||
																selected.properties?.owner?.minecraft ||
																selected.properties?.owner?.name ||
																selected.properties?.owner?.id ||
																'-')[0].toUpperCase()}
														</Avatar>
													</Indicator>
													<div>
														<Text fz="sm" fw={500}>
															{selected.properties?.owner?.username ||
																selected.properties?.owner?.minecraft ||
																selected.properties?.owner?.name ||
																selected.properties?.owner?.id ||
																'No owner'}
														</Text>
														<Text c="dimmed" fz="xs">
															{t('common:owner')}
															{selected.properties?.owner?.id == user.user?.id &&
																' - ' + t('common:you')}
														</Text>
													</div>
												</Group>
											</Table.Td>
											<Table.Td>
												<Group gap={0} justify="flex-end">
													<ActionIcon variant="subtle" color="red" disabled>
														<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
													</ActionIcon>
													<ActionIcon variant="subtle" color="gray" disabled>
														<IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
													</ActionIcon>
												</Group>
											</Table.Td>
										</Table.Tr>
										{selected.properties?.builders?.map((builder: any) => (
											<Table.Tr key={builder.ssoId + '-builder'}>
												<Table.Td>
													<Group gap="sm">
														<Indicator disabled={!builder?.new} processing={loading} color="orange">
															<Avatar size={40} src={builder.avatar} radius={40} color="teal">
																{(builder?.username || builder?.minecraft || '-')[0]?.toUpperCase()}
															</Avatar>
														</Indicator>
														<div>
															<Text fz="sm" fw={500}>
																{builder?.username || builder?.minecraft || 'Unknown User'}
															</Text>
															<Text c="dimmed" fz="xs">
																{t('common:builder')}
															</Text>
														</div>
													</Group>
												</Table.Td>
												<Table.Td>
													<Group gap={0} justify="flex-end">
														<Tooltip label="Remove Builder">
															<ActionIcon
																variant="subtle"
																color="red"
																onClick={() =>
																	handleUpdate(
																		'builders',
																		selected.properties.builders.filter(
																			(b: any) => b.id != builder.id,
																		),
																	)
																}
															>
																<IconTrash
																	style={{ width: rem(16), height: rem(16) }}
																	stroke={1.5}
																/>
															</ActionIcon>
														</Tooltip>
														<Menu>
															<MenuTarget>
																<ActionIcon variant="subtle" color="gray">
																	<IconDots
																		style={{ width: rem(16), height: rem(16) }}
																		stroke={1.5}
																	/>
																</ActionIcon>
															</MenuTarget>
															<MenuDropdown>
																<MenuItem
																	leftSection={<Discord />}
																	onClick={() => clipboard.copy(builder.discordId)}
																>
																	Copy Discord Id
																</MenuItem>
																<MenuItem
																	leftSection={<IconBrandMinecraft />}
																	disabled={!builder.minecraft}
																	onClick={() => clipboard.copy(builder.minecraft)}
																>
																	Copy Minecraft Name
																</MenuItem>
																<MenuItem
																	leftSection={<IconId />}
																	onClick={() => clipboard.copy(builder.id)}
																>
																	Copy Id
																</MenuItem>
																<MenuDivider />
																<MenuItem
																	leftSection={<IconArrowsDiff />}
																	color="red"
																	onClick={() => handleTransferOwnership(builder)}
																>
																	Transfer Ownership
																</MenuItem>
															</MenuDropdown>
														</Menu>
													</Group>
												</Table.Td>
											</Table.Tr>
										))}
										<Table.Tr style={{ cursor: 'pointer' }}>
											<Table.Td>
												<Group gap="sm">
													<Avatar size={40} radius={40} color="orange">
														{builderSearchLoading ? (
															<Loader size="sm" color="orange" />
														) : (
															<IconPlus />
														)}
													</Avatar>
													<Select
														searchable
														placeholder="Add Builder..."
														onChange={(v) => {
															handleUpdate('builders', [
																...(selected.properties.builders || []),
																{
																	...builderSearchResults.find((b: any) => b.id == v),
																	new: true,
																},
															]);
															setBuilderSearch('');
															setBuilderSearchResults([]);
															setBuilderSearchLoading(false);
														}}
														onSearchChange={(v) => {
															if (v != builderSearch) {
																setBuilderSearch(v);
																if (v.length > 0) {
																	setBuilderSearchLoading(true);
																}
															}
														}}
														data={
															builderSearchResults?.map((b: any) => ({
																value: b?.id,
																label: b?.username || 'Unknown Usernae',
															})) || []
														}
													/>
												</Group>
											</Table.Td>
										</Table.Tr>
									</Table.Tbody>
								</Table>
								<Divider mt="xl" />
								<Table mb="lg">
									<TableTbody>
										<TableTr>
											<TableTd>Id</TableTd>
											<TableTd>
												<Code>{selected.id}</Code>
											</TableTd>
										</TableTr>
										<TableTr>
											<TableTd>Owner Id</TableTd>
											<TableTd>
												<Code>{selected.properties.owner?.id || '-'}</Code>
											</TableTd>
										</TableTr>
										<TableTr>
											<TableTd>BuildTeam</TableTd>
											<TableTd>
												<Code>{selected.properties.buildTeam?.slug || '-'}</Code>
											</TableTd>
										</TableTr>
									</TableTbody>
								</Table>
								{selected.properties?.new == true ? (
									<Button
										leftSection={<IconPlus />}
										onClick={() => handleSaveNew()}
										loading={loading}
										mt="md"
										fullWidth
									>
										Create
									</Button>
								) : (
									<Group mt="md" grow>
										<Button
											leftSection={<IconDeviceFloppy />}
											onClick={() => handleSave()}
											loading={loading}
											disabled={!isAbleToUpdate(selected).able}
										>
											Save
										</Button>
										<Button
											leftSection={<IconTrash />}
											onClick={() => handleDelete()}
											loading={loading}
											variant="outline"
											disabled={!isAbleToUpdate(selected).able}
										>
											Delete
										</Button>
									</Group>
								)}
							</>
						)}
					</ScrollAreaAutosize>
				</GridCol>
				<GridCol span={7}>
					<div style={{ height: '100vh', width: '100%' }}>
						<Map
							onContextMenu={contextHandler}
							onMapLoaded={async (map) => {
								setMap(map);
								map.addControl(draw, 'top-right');

								const geojson = await fetch(
									`${process.env.NEXT_PUBLIC_API_URL}/claims/geojson?props=true`,
								).then((r) => r.json());

								draw.set(geojson);

								map.on('mousemove', (e) => {
									setClientPos({ lat: e.lngLat.lat, lng: e.lngLat.lng });
								});

								map.on('draw.create', (e) => {
									handleCreate(e.features[0]);
								});

								map.on('draw.update', (e) => {
									setSelected(e.features[0]);
								});
								map.on('draw.selectionchange', (e) => {
									if (e.points?.length > 0) return;
									setSelected(e.features[0]);
								});

								if (router.query.id && draw && map) {
									const id = router.query.id.toString();
									draw.changeMode('simple_select', { featureIds: [id] });
									setSelected(draw.get(id));
								}
							}}
							initialStyle={Number.parseInt(router.query.style as string)}
						/>
					</div>
				</GridCol>
			</Grid>
		</Page>
	);
};

export default ClaimEditPage;

export async function getServerSideProps(context: any) {
	return {
		props: {
			...(await serverSideTranslations(context.locale, ['common', 'map'])),
		},
	};
}

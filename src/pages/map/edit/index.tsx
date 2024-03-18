import {
	ActionIcon,
	Alert,
	Avatar,
	Button,
	Code,
	Divider,
	Group,
	Indicator,
	Loader,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	NumberInput,
	rem,
	ScrollAreaAutosize,
	Select,
	Switch,
	Table,
	TableTbody,
	TableTd,
	TableTr,
	Text,
	Textarea,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { useClipboard, useDebouncedState } from '@mantine/hooks';
import {
	IconBrandMinecraft,
	IconCheck,
	IconDeviceFloppy,
	IconDots,
	IconExclamationMark,
	IconId,
	IconPhoto,
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
import { useEffect, useState } from 'react';

import { Discord } from '@icons-pack/react-simple-icons';
import { showNotification } from '@mantine/notifications';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useContextMenu } from '../../../components/ContextMenu';
import Map from '../../../components/map/Map';
import { MapContextMenu } from '../../../components/map/MapContextMenu';
import Page from '../../../components/Page';
import { useUser } from '../../../hooks/useUser';

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

	const isAbleToUpdate = (feature: any) => {
		if (feature.properties?.owner?.id == user.user.id) return { able: true, type: 'OWNER' };
		if (user.hasPermission('team.claim.list', feature.properties.buildTeam.id))
			return { able: true, type: 'TEAM' };
		return { able: false, type: '' };
	};

	useEffect(() => {
		if (selected) {
			const { able, type: ableType } = isAbleToUpdate(selected);
			if (!able) {
				showNotification({
					title: 'Warning',
					color: 'orange',
					message: 'You cannot edit this claim',
					icon: <IconExclamationMark />,
				});
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
						Authorization: 'Bearer ' + user.token,
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

	const handleUpdate = (arg: string, value: any) => {
		if (selected) {
			draw.setFeatureProperty(selected.id, arg, value);
			setSelected(draw.get(selected.id));
		}
	};

	const handleDelete = () => {};

	const handleSave = () => {
		setSelected(draw.get(selected.id));
		setLoading(true);
		fetch(
			process.env.NEXT_PUBLIC_API_URL + `/claims/${selected.properties.id}?coordType=numberarray`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token,
				},
				body: JSON.stringify({
					...selected,
					area: selected.geometry.coordinates[0],
					buidings: undefined,
					buildTeam: undefined,
					osmName: undefined,
					owner: undefined,
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
			<Group gap={0}>
				<div
					style={{
						height: '100vh',
						width: '30vw',
						position: 'relative',
						borderRight: 'var(--mantine-color-default-border) 1px solid',
						padding: 'var(--mantine-spacing-lg)',
						paddingTop: '60px',
					}}
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
								When having a Claim selected, you can click on it again to enter edit mode. In this
								mode you can drag all corners and add new ones by draging the smaller dots between
								corners. All corners you add will automatically snap to other corners and claims in
								the area.
							</p>
							<h2>Edit Claim Properties</h2>
							<p>
								If you have selected a Claim on the Map, all its properties which you can edit will
								appear here. The area and building count will be automatically calculated once you
								save your edit.
							</p>
							<Alert variant="outline" title="Saving" icon={<IconDeviceFloppy />} mt="xl">
								Do not forget to save your changes, they will be overriden once you reload the Page.
							</Alert>
						</>
					) : (
						<>
							<h1>Edit Claim</h1>
							<ScrollAreaAutosize h={'85%'}>
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
								<Alert variant="outline" title="Images" icon={<IconPhoto />} mb="lg">
									Images can only be added and removed on the main Map as of right now.
								</Alert>
								<TextInput
									label={t('edit.name')}
									required
									defaultValue={selected.properties.name}
									onChange={(e) => handleUpdate('name', e.target.value)}
									mb="md"
								/>
								<TextInput
									label={t('claim.details.city')}
									required
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
													<Avatar size={40} src={selected.propertie?.owner?.avatar} radius={40} />
													<div>
														<Text fz="sm" fw={500}>
															{selected.propertie?.owner?.username ||
																selected.propertie?.owner?.name ||
																selected.propertie?.owner?.id ||
																'No owner'}
														</Text>
														<Text c="dimmed" fz="xs">
															{t('common:owner')}
															{selected.properties?.owner?.id == user.user.id &&
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
														<Indicator disabled={!builder?.new} processing={loading}>
															<Avatar size={40} src={builder.avatar} radius={40} color="blue">
																{builder?.username[0]?.toUpperCase()}
															</Avatar>
														</Indicator>
														<div>
															<Text fz="sm" fw={500}>
																{builder?.username || 'Unknown User'}
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
																	disabled={!builder.name}
																	onClick={() => clipboard.copy(builder.name)}
																>
																	Copy Minecraft Name
																</MenuItem>
																<MenuItem
																	leftSection={<IconId />}
																	onClick={() => clipboard.copy(builder.id)}
																>
																	Copy Id
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
																{ ...builderSearchResults.find((b: any) => b.id == v), new: true },
															]);
															console.log(selected.properties.builders);
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
												<Code>{selected.properties.buildTeam.slug}</Code>
											</TableTd>
										</TableTr>
									</TableTbody>
								</Table>
							</ScrollAreaAutosize>

							<Button
								leftSection={<IconDeviceFloppy />}
								fullWidth
								onClick={() => handleSave()}
								loading={loading}
							>
								Save
							</Button>
						</>
					)}
				</div>
				<div style={{ height: '100vh', width: '70vw', position: 'relative' }}>
					<Map
						// src={`${process.env.NEXT_PUBLIC_API_URL}/claims/geojson?active=true`}
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

							map.on('draw.delete', (e) => {});
							map.on('draw.update', (e) => {
								setSelected(e.features[0]);
							});
							map.on('draw.selectionchange', (e) => {
								if (e.points.length > 0) return;
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
			</Group>
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
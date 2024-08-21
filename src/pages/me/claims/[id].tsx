import {
	ActionIcon,
	Avatar,
	Button,
	Grid,
	Group,
	Indicator,
	Loader,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	NumberInput,
	Select,
	Switch,
	Table,
	Text,
	TextInput,
	Textarea,
	Tooltip,
	rem,
} from '@mantine/core';
import {
	IconBrandMinecraft,
	IconCheck,
	IconDeviceFloppy,
	IconDots,
	IconHome,
	IconId,
	IconMap,
	IconPlus,
	IconTrash,
} from '@tabler/icons-react';
import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { ClaimDrawerImages } from '@/components/map/ClaimDrawerImages';
import { Discord } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import Map from '@/components/map/Map';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { NextPage } from 'next';
import Page from '@/components/Page';
import fetcher from '@/utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import thumbnail from '@/public/images/thumbnails/me.png';
import { useAccessToken } from '@/hooks/useAccessToken';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/hooks/useUser';

/* eslint-disable react-hooks/exhaustive-deps */

const ClaimPage: NextPage = ({ claimId, data }: any) => {
	const [polygon, setPolygon] = useState<any>({
		type: 'Feature',
		id: data?.id,
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [data?.area.map((p: string) => p.split(', ').map(Number))],
		},
	});
	const [draw, setDraw] = useState(new MapboxDraw({ displayControlsDefault: false }));
	const [builderSearch, setBuilderSearch] = useDebouncedState('', 1500);
	const [builderSearchLoading, setBuilderSearchLoading] = useState(false);
	const [builderSearchResults, setBuilderSearchResults] = useState<any[]>([]);
	const { t } = useTranslation('map');
	const user = useUser();
	const { accessToken } = useAccessToken();
	const router = useRouter();
	const clipboard = useClipboard();
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState(data.images);

	const [additionalData, setAdditionalData] = useState({
		name: data.name,
		description: data.description,
		id: data.id,
		finished: data.finished,
		active: data.active,
		builders: data.builders,
		buildings: data.buildings,
	});

	const editData = (property: string, value: any) => {
		setAdditionalData({ ...additionalData, [property]: value });
	};

	const handleSubmit = () => {
		setLoading(true);
		fetch(process.env.NEXT_PUBLIC_API_URL + `/claims/${additionalData.id}?coordType=numberarray`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify({
				...additionalData,
				area: polygon.geometry.coordinates[0],
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					showNotification({
						title: 'Update failed',
						message: res.error,
						color: 'red',
					});
					setLoading(false);
					setAdditionalData({ ...data, ...res });
				} else {
					showNotification({
						title: 'Claim updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					setAdditionalData({ ...data, ...res });
					setLoading(false);
				}
			});
	};

	const handleDelete = () => {
		setLoading(true);
		fetch(process.env.NEXT_PUBLIC_API_URL + `/claims/${additionalData.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
		})
			.then((res) => res.json())
			.then((res) => {
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
					setAdditionalData({ ...data, ...res });
					setLoading(false);
					router.push('/me');
				}
			});
	};

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
	}, [builderSearch]);

	return (
		<Page
			head={{
				title: t('edit.title'),
				image: thumbnail,
			}}
			smallPadding
			requiredPermissions={{ permissions: ['account.edit', 'account.info'] }}
			loading={!data}
		>
			{!data ? (
				<></>
			) : (
				<Grid>
					<Grid.Col span={{ md: 6 }}>
						<TextInput
							label={t('edit.name')}
							required
							defaultValue={additionalData.name}
							onChange={(e) => editData('name', e.target.value)}
							mb="md"
						/>
						<ClaimDrawerImages
							id={data.id}
							images={images}
							editable
							t={t}
							onAdd={(img) => setImages([...images, img])}
							onRemove={(img) => setImages(images.filter((i: any) => i.id != img))}
						/>
						<Textarea
							label={t('edit.description')}
							defaultValue={additionalData.description}
							onChange={(e) => editData('description', e.target.value)}
							maxRows={5}
							minRows={3}
							autosize
							placeholder="Describe your claim..."
							mb="md"
						/>
						<Switch
							defaultChecked={additionalData.finished}
							label={t('edit.finished')}
							onChange={(e) => editData('finished', e.target.checked)}
							mb="md"
						/>
						<Switch
							defaultChecked={additionalData.active}
							label={t('edit.active')}
							onChange={(e) => editData('active', e.target.checked)}
							mb="md"
						/>
						<Tooltip label={t('edit.buildings.description')}>
							<NumberInput
								readOnly
								value={additionalData.buildings}
								label={t('edit.buildings.title')}
								disabled
							/>
						</Tooltip>
						<h3>{t('edit.builders.title')}</h3>
						<Table verticalSpacing="md" mb="md">
							<Table.Tbody>
								<Table.Tr>
									<Table.Td>
										<Group gap="sm">
											<Avatar size={40} src={user?.user?.avatar} radius={40} />
											<div>
												<Text fz="sm" fw={500}>
													{user?.user?.username}
												</Text>
												<Text c="dimmed" fz="xs">
													{t('common:owner')} - {t('common:you')}
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
								{additionalData?.builders?.map((builder: any) => (
									<Table.Tr key={builder.ssoId + '-builder'}>
										<Table.Td>
											<Group gap="sm">
												<Indicator disabled={!builder?.new} processing={loading}>
													<Avatar size={40} src={builder.avatar} radius={40} color="cyan">
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
															editData(
																'builders',
																additionalData.builders.filter((b: any) => b.id != builder.id),
															)
														}
													>
														<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
													</ActionIcon>
												</Tooltip>
												<Menu>
													<MenuTarget>
														<ActionIcon variant="subtle" color="gray">
															<IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
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
															disabled={!builder.name} /* TODO */
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
												{builderSearchLoading ? <Loader size="sm" color="orange" /> : <IconPlus />}
											</Avatar>
											<Select
												searchable
												placeholder="Add Builder..."
												onChange={(v) => {
													editData('builders', [
														...(additionalData.builders || []),
														{ ...builderSearchResults.find((b: any) => b.id == v), new: true },
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
						<Group>
							<ActionIcon
								variant="outline"
								component={Link}
								href={'/me'}
								aria-label={t('common:button.back')}
								size={'lg'}
							>
								<IconHome />
							</ActionIcon>
							<ActionIcon
								variant="outline"
								component={Link}
								href={
									router.query.z && router.query.lat && router.query.lng
										? `/map?z=${router.query.z}&lat=${router.query.lat}&lng=${router.query.lng}&claim=${data.id}`
										: `/map?claim=${data.id}`
								}
								aria-label={'Open on Map'}
								size={'lg'}
							>
								<IconMap />
							</ActionIcon>
							<Button
								onClick={handleDelete}
								disabled={!accessToken}
								loading={loading}
								variant="outline"
								leftSection={<IconTrash />}
							>
								{t('common:button.delete')}
							</Button>
							<Button
								onClick={handleSubmit}
								disabled={!accessToken}
								loading={loading}
								leftSection={<IconDeviceFloppy />}
							>
								{t('common:button.save')}
							</Button>
						</Group>
					</Grid.Col>
					<Grid.Col span={{ md: 6 }}>
						<div style={{ height: '100%', width: '100%', minHeight: '50vh' }}>
							<Map
								initialOptions={{
									center: data?.center ? data?.center.split(', ').map(Number) : undefined,
									zoom: data?.center ? 12 : 1,
								}}
								layerSetup={(map) => {
									map.addControl(draw, 'top-right');
									if (data?.area.length > 0) {
										draw.add(polygon);
										draw.changeMode('direct_select', { featureId: polygon.id });
									} else {
										draw.changeMode('draw_polygon');
									}
								}}
								onMapLoaded={(map) => {
									map.on('draw.update', (e) => setPolygon(e.features[0]));
									map.on('draw.create', (e) =>
										setPolygon({
											type: 'Feature',
											id: data?.id,
											properties: {},
											geometry: {
												type: 'Polygon',
												coordinates: e.features[0].geometry.coordinates,
											},
										}),
									);
								}}
							/>
						</div>
					</Grid.Col>
				</Grid>
			)}
		</Page>
	);
};

export default ClaimPage;

export async function getServerSideProps(context: any) {
	const res = await fetcher('/claims/' + context.query.id + '?builders=true');
	return {
		props: {
			claimId: context.query.id,
			data: res,
			...(await serverSideTranslations(context.locale, ['common', 'map'])),
		},
	};
}

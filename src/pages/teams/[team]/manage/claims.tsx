import { Carousel, CarouselSlide } from '@mantine/carousel';
import {
	ActionIcon,
	Button,
	Checkbox,
	Group,
	InputWrapper,
	Menu,
	MenuDivider,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	Table,
	TextInput,
	ThemeIcon,
	Tooltip,
	rem,
} from '@mantine/core';
import {
	IconAlertTriangle,
	IconCheck,
	IconDots,
	IconMap,
	IconPhoto,
	IconPin,
	IconTrash,
} from '@tabler/icons-react';
import useSWR, { mutate } from 'swr';

import Page from '@/components/Page';
import SettingsTabs from '@/components/SettingsTabs';
import { useAccessToken } from '@/hooks/useAccessToken';
import thumbnail from '@/public/images/thumbnails/teams.png';
import classes from '@/styles/components/Gallery.module.css';
import fetcher from '@/utils/Fetcher';
import { DateInput } from '@mantine/dates';
import { useClipboard } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { getAreaOfPolygon } from 'geolib';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Settings = () => {
	const router = useRouter();
	const { accessToken } = useAccessToken();
	const { data } = useSWR(`/claims?slug=true&team=${router.query.team}`);
	const clipboard = useClipboard();

	const handleDelete = (id: string) => {
		fetch(
			process.env.NEXT_PUBLIC_API_URL + `/buildteams/${router.query.team}/claims/${id}?slug=true`,
			{
				method: 'DELETE',
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

	const handleAddShowcase = (claim: any) => {
		let image = claim.images[0].id;
		let name = claim.name;
		let city = claim.city;
		let date: Date | null;
		let loading = false;
		modals.open({
			title: 'Add as Showcase',
			centered: true,
			children: (
				<>
					<InputWrapper
						label="Image"
						description="This Image will get converted to be the showcase image"
						required
					>
						<Carousel
							mt={4}
							style={{
								borderRadius: 'var(--mantine-radius-md)',
								aspectRatio: '16:9',
							}}
							styles={{
								viewport: { height: '100%', width: '100%' },
								container: { height: '100%', width: '100%' },
							}}
							withIndicators
							withControls
							classNames={classes}
							loop
							mb="md"
							h={250}
							onSlideChange={(i: number) => (image = claim.images[i].id)}
						>
							{claim.images?.map((i: any) => (
								<CarouselSlide key={i.id} w="100%" h="100%">
									<Image
										src={`https://cdn.buildtheearth.net/uploads/${i.name}`}
										style={{ borderRadius: 'var(--mantine-radius-md)' }}
										fill
										alt={`Claim Image ${i}`}
									/>
								</CarouselSlide>
							))}
						</Carousel>
						<TextInput
							label="Name"
							description="The Name of the Showcase"
							required
							defaultValue={claim.name}
							placeholder={claim.name}
							onChange={(e) => (name = e.target.value)}
						/>
						<TextInput
							label="City"
							description="In which City is the Showcase located?"
							mt="md"
							placeholder={claim.city}
							defaultValue={claim.city}
							required
							onChange={(e) => (city = e.target.value)}
						/>
						<DateInput
							defaultValue={new Date()}
							onChange={(e) => (date = e)}
							label="Date of Construction"
							description="The Date of when the showcased Building was built"
							mt="md"
						/>
						<Button mt="md" onClick={() => submit()} loading={loading}>
							Add
						</Button>
					</InputWrapper>
				</>
			),
		});

		const submit = () => {
			loading = true;
			fetch(
				process.env.NEXT_PUBLIC_API_URL +
					`/buildteams/${router.query.team}/showcases/link?slug=true`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + accessToken,
					},
					body: JSON.stringify({ image, title: name, city, date }),
				},
			)
				.then((res) => res.json())
				.then((res) => {
					loading = false;
					if (res.errors) {
						showNotification({
							title: 'Update failed',
							message: res.error,
							color: 'red',
						});
					} else {
						showNotification({
							title: 'Showcase Image added',
							message: 'All Data has been saved',
							color: 'green',
						});
						mutate(`/buildteams/${router.query.team}/showcases`);
					}
				});
		};
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Claims',
				image: thumbnail,
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={{
				buildteam: router.query.team as string,
				permissions: ['team.claim.list'],
			}}
			loading={!data}
		>
			<SettingsTabs team={router.query.team?.toString() || ''} loading={!data}>
				<Table.ScrollContainer minWidth={800}>
					<Table verticalSpacing="sm">
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Name</Table.Th>
								<Table.Th>Finished</Table.Th>
								<Table.Th>Images</Table.Th>
								<Table.Th>Area</Table.Th>
								<Table.Th>Created At</Table.Th>
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
											<Group>
												{!s.active && (
													<Tooltip label="This Claim is not shown on the map">
														<ThemeIcon size={'sm'} color="orange" variant="light">
															<IconAlertTriangle style={{ width: '70%', height: '70%' }} />
														</ThemeIcon>
													</Tooltip>
												)}
												<Checkbox color="green" checked={s.finished} />
											</Group>
										</Table.Td>
										<Table.Td>{s._count?.images || 0}</Table.Td>
										<Table.Td>{s.area.toLocaleString()} m²</Table.Td>
										<Table.Td>{new Date(s.createdAt).toLocaleDateString()}</Table.Td>
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
															leftSection={
																<IconPhoto style={{ width: rem(14), height: rem(14) }} />
															}
															onClick={() => handleAddShowcase(s)}
															disabled={s.images.length == 0}
														>
															Add to Showcase
														</MenuItem>
														<MenuDivider />
														<MenuItem
															leftSection={<IconPin style={{ width: rem(14), height: rem(14) }} />}
															onClick={() => {
																clipboard.copy(
																	`${s.center.split(', ')[1]}, ${s.center.split(', ')[0]}`,
																);
																showNotification({
																	title: 'Coordinates copied',
																	message: 'Paste them anywhere.',
																	icon: <IconCheck size={18} />,
																	color: 'teal',
																});
															}}
														>
															Copy Coordinates
														</MenuItem>
														<MenuItem
															leftSection={<IconMap style={{ width: rem(14), height: rem(14) }} />}
															component={Link}
															href={`/map?claim=${s.id}`}
															target="_blank"
														>
															Open on Map
														</MenuItem>
														<MenuDivider />
														<MenuItem
															leftSection={
																<IconTrash style={{ width: rem(14), height: rem(14) }} />
															}
															onClick={() => handleDelete(s.id)}
															color="red"
														>
															Delete Claim
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

import {
	ActionIcon,
	AspectRatio,
	Button,
	Checkbox,
	Divider,
	FileInput,
	Group,
	Switch,
	Table,
	Text,
	TextInput,
	Tooltip,
	rem,
} from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import useSWR, { mutate } from 'swr';

import { DateInput } from '@mantine/dates';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import thumbnail from '../../../../../public/images/thumbnails/teams.png';
import Page from '../../../../components/Page';
import SettingsTabs from '../../../../components/SettingsTabs';
import { useUser } from '../../../../hooks/useUser';
import fetcher from '../../../../utils/Fetcher';

var vagueTime = require('vague-time');

const Settings = () => {
	const user = useUser();
	const router = useRouter();
	const { data } = useSWR(`/buildteams/${router.query.team}/showcases?slug=true`);
	const [loading, setLoading] = useState(false);

	const handleDeleteImage = (image: any) => {
		modals.openConfirmModal({
			title: `Delete Showcase Image`,
			centered: true,
			children: (
				<Text>
					Are you sure you want to delete the showcase image of <b>{image.title}</b> from the team?
					This action cannot be undone.
				</Text>
			),
			labels: { confirm: 'Delete Image', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			onCancel: () =>
				showNotification({
					message: `Showcase Image was not deleted.`,
					title: 'Cancelled Image removal',
					color: 'yellow',
				}),
			onConfirm: () => {
				setLoading(true);
				fetch(
					process.env.NEXT_PUBLIC_API_URL +
						`/buildteams/${router.query.team}/showcases/${image.id}`,
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
						setLoading(false);
						if (res.errors) {
							showNotification({
								title: 'Update failed',
								message: res.error,
								color: 'red',
							});
						} else {
							showNotification({
								title: 'Showcase Image removed',
								message: 'All Data has been saved',
								color: 'green',
							});
							mutate(`/buildteams/${router.query.team}/showcases?slug=true`);
						}
					});
			},
		});
	};
	const handleAddImage = () => {
		let image: any;
		let name = '';
		let city = '';
		let date: Date | null;
		modals.open({
			id: 'add-image',
			title: 'Add a new Showcase Image',
			children: (
				<>
					<TextInput
						label="Name"
						description="The Name of the Showcase"
						required
						placeholder="Washington Monument"
						onChange={(e) => (name = e.target.value)}
					/>
					<TextInput
						label="City"
						description="In which City is the Showcase located?"
						mt="md"
						placeholder="Washington, D.C."
						required
						onChange={(e) => (city = e.target.value)}
					/>
					<FileInput
						label="Image"
						placeholder="Select an image..."
						description="Images not in 16:9 may get distorted"
						mt="md"
						required
						onChange={(e) => (image = e)}
						accept="image/*"
					/>
					<DateInput
						defaultValue={new Date()}
						onChange={(e) => (date = e)}
						label="Date of Construction"
						description="The Date of when the showcased Building was built"
						mt="md"
					/>
					<Button
						mt="md"
						onClick={() => {
							setLoading(true);
							handleSubmit();
						}}
						loading={loading}
					>
						Add
					</Button>
				</>
			),
			centered: true,
		});
		const handleSubmit = () => {
			setLoading(true);
			const formdata = new FormData();
			formdata.append('image', image);
			formdata.append('title', name);
			formdata.append('city', city);
			date && formdata.append('date', date.toISOString());

			modals.closeAll();
			fetch(
				process.env.NEXT_PUBLIC_API_URL + `/buildteams/${router.query.team}/showcases?slug=true`,
				{
					method: 'POST',
					headers: {
						// 'Content-Type': 'multipart/form-data',
						Authorization: 'Bearer ' + user.token,
					},
					body: formdata,
				},
			)
				.then((res) => res.json())
				.then((res) => {
					if (res.errors) {
						showNotification({
							title: 'Creation failed',
							message: res.error,
							color: 'red',
						});
						setLoading(false);
					} else {
						showNotification({
							title: 'Showcase Image added',
							message: 'All Data has been saved',
							color: 'green',
						});
						mutate(`/buildteams/${router.query.team}/showcases?slug=true`);
						setLoading(false);
					}
				});
		};
	};
	const handleEditImage = (image: any) => {
		let name = image.title;
		let city = image.city;
		let date: Date | null = new Date(image.createdAt);
		let approved = image.approved;
		modals.open({
			id: 'edit-image',
			title: 'Edit Showcase Image',
			children: (
				<>
					<AspectRatio ratio={16 / 9} w="100%" mb="md">
						<Image
							alt={image.title}
							src={`https://cdn.buildtheearth.net/uploads/${image.image?.name}`}
							style={{ borderRadius: 'var(--mantine-radius-md)' }}
							fill
						/>
					</AspectRatio>
					<TextInput
						label="Name"
						description="The Name of the Showcase"
						required
						defaultValue={image.title}
						placeholder={image.title}
						onChange={(e) => (name = e.target.value)}
					/>
					<TextInput
						label="City"
						description="In which City is the Showcase located?"
						mt="md"
						defaultValue={image.city}
						placeholder={image.city}
						required
						onChange={(e) => (city = e.target.value)}
					/>
					<DateInput
						onChange={(e) => (date = e)}
						value={date}
						label="Date of Construction"
						description="The Date of when the showcased Building was built"
						mt="md"
					/>
					{user.hasPermission('admin.admin') && (
						<Switch
							label="For Showcase Approved"
							description="If this is enabled, the image can be shown on all page heads and social media previews"
							onChange={(e) => {
								approved = e.currentTarget.checked;
							}}
							mt="md"
							checked={approved}
						/>
					)}
					<Button
						mt="md"
						onClick={() => {
							setLoading(true);
							handleSubmit();
						}}
						loading={loading}
					>
						Save
					</Button>
				</>
			),
			centered: true,
		});
		const handleSubmit = () => {
			setLoading(true);
			modals.closeAll();
			fetch(
				process.env.NEXT_PUBLIC_API_URL +
					`/buildteams/${router.query.team}/showcases/${image.id}?slug=true`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + user.token,
					},
					body: JSON.stringify({ title: name, city, date, approved }),
				},
			)
				.then((res) => res.json())
				.then((res) => {
					if (res.errors) {
						showNotification({
							title: 'Edit failed',
							message: res.error,
							color: 'red',
						});
						setLoading(false);
					} else {
						showNotification({
							title: 'Showcase Image edited',
							message: 'All Data has been saved',
							color: 'green',
						});
						mutate(`/buildteams/${router.query.team}/showcases?slug=true`);
						setLoading(false);
					}
				});
		};
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Showcase Images',
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
			<SettingsTabs team={router.query.team?.toString() || ''} loading={!data || loading}>
				<Table.ScrollContainer minWidth={800}>
					<Button
						leftSection={<IconPlus />}
						onClick={() => handleAddImage()}
						mb="md"
						loading={loading}
					>
						Add Showcase Image
					</Button>
					<Table verticalSpacing="sm">
						{/* <Table.Thead>
							<Table.Tr>
								<Table.Th>Image</Table.Th>
								<Table.Th>Name</Table.Th>
								<Table.Th>City</Table.Th>
								<Table.Th>Date</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead> */}
						<Table.Tbody>
							{data
								?.sort(
									(a: any, b: any) =>
										new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
								)
								.map((s: any) => (
									<Table.Tr key={s.id}>
										<Table.Td>
											<AspectRatio ratio={16 / 9} w={'20vw'}>
												<Image
													src={`https://cdn.buildtheearth.net/uploads/${s.image.name}`}
													fill
													alt={s.title}
												/>
											</AspectRatio>
										</Table.Td>
										<Table.Td>
											<Text fw="bold" fz="lg">
												{s.title}, {s.city}
											</Text>
											<Tooltip
												withinPortal
												label={s.createdAt ? vagueTime.get({ to: new Date(s.createdAt) }) : ''}
												position="top-start"
											>
												<Text fz="sm" c="dimmed">
													{new Date(s.createdAt).toLocaleDateString()}{' '}
												</Text>
											</Tooltip>
											<Group gap={4} mt="sm">
												<ActionIcon
													variant="subtle"
													color="gray"
													onClick={() => handleEditImage(s)}
												>
													<IconPencil style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
												</ActionIcon>
												<ActionIcon
													variant="subtle"
													color="red"
													onClick={() => handleDeleteImage(s)}
												>
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

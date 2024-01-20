import {
	ActionIcon,
	AspectRatio,
	Button,
	FileInput,
	Group,
	Table,
	Text,
	TextInput,
	Tooltip,
	rem,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
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
							mutate(`/buildteams/${router.query.team}/showcases`);
						}
					});
			},
		});
	};
	const handleAddImage = () => {
		let image: any;
		let name = '';
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
						onChange={(e) => (name = e.target.value)}
					/>
					<FileInput
						label="Image"
						placeholder="Select an image..."
						description="Images will be resized to fit 1920x1080px ratio"
						mt="md"
						required
						onChange={(e) => (image = e)}
						accept="image/*"
					/>
					<DateInput defaultValue={new Date()} onChange={(e) => (date = e)} label="Date" mt="md" />
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
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Title</Table.Th>
								<Table.Th>Image</Table.Th>
								<Table.Th>Date</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{data?.map((s: any) => (
								<Table.Tr key={s.id}>
									<Table.Td>{s.title}</Table.Td>
									<Table.Td>
										<AspectRatio ratio={16 / 9}>
											<Image
												src={`https://cdn.buildtheearth.net/upload/${s.image.name}`}
												fill
												alt={s.title}
											/>
										</AspectRatio>
									</Table.Td>
									<Table.Td>
										<Tooltip
											withinPortal
											label={s.createdAt ? vagueTime.get({ to: new Date(s.createdAt) }) : ''}
											position="top-start"
										>
											<p>{new Date(s.createdAt).toLocaleDateString()} </p>
										</Tooltip>
									</Table.Td>
									<Table.Td>
										<Group gap={0} justify="flex-end">
											<ActionIcon variant="subtle" color="red" onClick={() => handleDeleteImage(s)}>
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

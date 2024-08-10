import {
	ActionIcon,
	AspectRatio,
	Center,
	Group,
	Image,
	Loader,
	Pagination,
	Table,
	Text,
	Tooltip,
	rem,
} from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconExternalLink, IconTrash } from '@tabler/icons-react';
import useSWR, { mutate } from 'swr';

import Page from '@/components/Page';
import { useAccessToken } from '@/hooks/useAccessToken';
import thumbnail from '@/public/images/thumbnails/teams.png';
import { modals } from '@mantine/modals';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useState } from 'react';

var vagueTime = require('vague-time');
const Settings = () => {
	const [activePage, setPage] = useState(1);
	const { data, isLoading: dataLoading } = useSWR(
		`/claims/images?take=20&skip=${activePage * 20 - 20}`,
	);
	const { accessToken } = useAccessToken();
	const [loading, setLoading] = useState(false);

	const handleDeleteImage = (image: any) => {
		modals.openConfirmModal({
			title: 'Confirm Deletion',
			centered: true,
			children: (
				<Text>
					Are you sure you want to delete the image of <b>{image.Claim.name}</b>?
				</Text>
			),
			labels: { confirm: 'Delete', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			onCancel: () =>
				showNotification({
					message: `Image was not deleted.`,
					title: 'Cancelled Image removal',
					color: 'yellow',
				}),
			onConfirm: () => {
				setLoading(true);
				const notification = showNotification({
					title: 'Deleting Claim Image',
					message: 'Please wait for this to finish before deleting other images.',
					loading: true,
					autoClose: false,
					withCloseButton: false,
				});
				fetch(process.env.NEXT_PUBLIC_API_URL + `/claims/${image.Claim.id}/images/${image.id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + accessToken,
					},
				})
					.then((res) => res.json())
					.then((res) => {
						if (res.errors) {
							updateNotification({
								id: notification,
								title: 'Deletion failed',
								loading: false,
								message: res.error,
								color: 'red',
								withCloseButton: true,
							});
							setLoading(false);
						} else {
							updateNotification({
								id: notification,
								title: 'Image removed',
								message: 'All Data has been saved',
								color: 'green',
								loading: false,
								autoClose: 5000,
								withCloseButton: true,
							});
							setLoading(false);
							mutate(`/claims/images?take=20&skip=${activePage * 20 - 20}`);
						}
					});
			},
		});
	};
	const handleCheckImage = (image: any) => {
		setLoading(true);
		const notification = showNotification({
			title: 'Checking Claim Image',
			message: 'Please wait for this to finish before checking other images.',
			loading: true,
			autoClose: false,
			withCloseButton: false,
		});
		fetch(process.env.NEXT_PUBLIC_API_URL + `/admin/images/${image.id}/check`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					updateNotification({
						id: notification,
						title: 'Check failed',
						loading: false,
						message: res.error,
						color: 'red',
						withCloseButton: true,
					});
					setLoading(false);
				} else {
					updateNotification({
						id: notification,
						title: 'Image checked',
						message: 'All Data has been saved',
						color: 'green',
						loading: false,
						autoClose: 5000,
						withCloseButton: true,
					});
					setLoading(false);
					mutate(`/claims/images?take=20&skip=${activePage * 20 - 20}`);
				}
			});
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Uploaded Claim Images',
				image: thumbnail,
			}}
			seo={{ nofollow: true, noindex: true }}
			requiredPermissions={{ permissions: ['team.claim.list'] }}
		>
			<Table.ScrollContainer minWidth={800}>
				<Table verticalSpacing="sm">
					<Table.Tbody>
						{data?.data
							?.sort(
								(a: any, b: any) =>
									new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
							)
							.map((image: any) => (
								<Table.Tr key={image.id}>
									<Table.Td>
										<AspectRatio ratio={16 / 9} w={'20vw'}>
											<Image
												src={`https://cdn.buildtheearth.net/uploads/${image.name}`}
												alt={image.Claim.name}
												fit="cover"
											/>
										</AspectRatio>
									</Table.Td>
									<Table.Td>
										<Text fw="bold" fz="lg">
											{image.Claim.name}
										</Text>
										<Text fz="sm" c="dimmed">
											{new Date(image.createdAt).toLocaleDateString() +
												' - ' +
												vagueTime.get({ to: new Date(image.createdAt) })}
										</Text>
										<Group gap={4} mt="sm">
											<Tooltip label="Mark Image as checked">
												<ActionIcon
													variant="light"
													color="green"
													onClick={() => handleCheckImage(image)}
													loading={loading}
													disabled={loading}
												>
													<IconCheck style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
												</ActionIcon>
											</Tooltip>
											<ActionIcon
												variant="subtle"
												color="gray"
												component={Link}
												href={'/map?claim=' + image.Claim.id}
											>
												<IconExternalLink
													style={{ width: rem(18), height: rem(18) }}
													stroke={1.5}
												/>
											</ActionIcon>
											<ActionIcon
												variant="subtle"
												color="red"
												onClick={() => handleDeleteImage(image)}
												loading={loading}
												disabled={loading}
											>
												<IconTrash style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
											</ActionIcon>
										</Group>
									</Table.Td>
								</Table.Tr>
							))}
						{(!data?.data || dataLoading) && (
							<Table.Tr key={'loading'}>
								<Table.Td>
									<Center w="100%" h="30vh">
										<Loader />
									</Center>
								</Table.Td>
							</Table.Tr>
						)}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
			<Group justify="center" pt="md">
				<Pagination
					my="md"
					total={data?.total >= 1 ? Math.ceil(data?.total / 20) : 1}
					radius="xs"
					value={activePage}
					onChange={setPage}
					siblings={1}
				/>
			</Group>
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

import { Carousel, CarouselSlide } from '@mantine/carousel';
import {
	ActionIcon,
	Center,
	Group,
	Image,
	Progress,
	Stack,
	Text,
	Tooltip,
	rem,
} from '@mantine/core';
import {
	Dropzone,
	DropzoneAccept,
	DropzoneIdle,
	DropzoneReject,
	IMAGE_MIME_TYPE,
} from '@mantine/dropzone';
import { IconPhoto, IconTrash, IconUpload, IconX } from '@tabler/icons-react';

import { useAccessToken } from '@/hooks/useAccessToken';
import classes from '@/styles/components/Gallery.module.css';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { mutate } from 'swr';

interface ClaimDrawerImagesProps {
	id: string;
	images: {
		id: string;
		name: string;
		height: number;
		width: number;
		hash: string;
	}[];
	editable?: boolean;
	t: any;
	onAdd?: (image: any) => void;
	onRemove?: (image: string) => void;
}

export function ClaimDrawerImages({ t, ...props }: ClaimDrawerImagesProps) {
	const [deleteLoading, setDeleteLoading] = useState(false);
	const { accessToken } = useAccessToken();

	const handleDeleteImage = (image: any) => {
		modals.openConfirmModal({
			title: t('claim.details.image.delete.title'),
			centered: true,
			children: <Text>{t('claim.details.image.delete.description')}</Text>,
			labels: { confirm: t('common:button.delete'), cancel: t('common:button.cancel') },
			confirmProps: { color: 'red' },
			onCancel: () =>
				showNotification({
					message: `Image was not deleted.`,
					title: 'Cancelled Image removal',
					color: 'yellow',
				}),
			onConfirm: () => {
				setDeleteLoading(true);
				fetch(process.env.NEXT_PUBLIC_API_URL + `/claims/${props.id}/images/${image}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + accessToken,
					},
				})
					.then((res) => res.json())
					.then((res) => {
						setDeleteLoading(false);
						if (res.errors) {
							showNotification({
								title: 'Update failed',
								message: res.error,
								color: 'red',
							});
						} else {
							showNotification({
								title: 'Image removed',
								message: 'All Data has been saved',
								color: 'green',
							});
							mutate(`/claims/` + props.id + '?builders=true');
							props.onRemove && props.onRemove(image);
						}
					});
			},
		});
	};

	// if(!props.images || props.images?.length)
	if (props.images?.length == 0 && !props.editable) return <></>;

	return (
		<Carousel
			style={{
				aspectRatio: '16/9',
				borderRadius: 'var(--mantine-radius-md)',
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
			h={'auto'}
			w="100%"
		>
			{props.images?.map((img, i) => {
				return (
					<CarouselSlide key={img.id} w="100%" h="100%">
						{props.editable && (
							<Tooltip label={t('claim.details.image.delete.label')}>
								<ActionIcon
									style={{
										position: 'absolute',
										zIndex: 50,
										right: 0,
										bottom: 0,
									}}
									m={'sm'}
									color={'red'}
									onClick={() => handleDeleteImage(img.id)}
									loading={deleteLoading}
								>
									<IconTrash />
								</ActionIcon>
							</Tooltip>
						)}

						<Image
							src={`https://cdn.buildtheearth.net/uploads/${img.name}`}
							style={{ borderRadius: 'var(--mantine-radius-md)' }}
							height={300}
							alt={`Claim Image ${i}`}
						/>
					</CarouselSlide>
				);
			})}
			{props.editable && (
				<CarouselSlide w="100%" h="100%">
					<ClaimDropzone id={props.id} onAdd={props.onAdd} t={t} />
				</CarouselSlide>
			)}
		</Carousel>
	);
}

function ClaimDropzone({ id, onAdd, t }: { id: string; onAdd?: (image: any) => void; t: any }) {
	const [uploading, setUploading] = useState(false);
	const [uploadingStatus, setUploadingStatus] = useState(0);

	const { accessToken } = useAccessToken();

	const upload = async (images: any[]) => {
		let formData = new FormData();
		formData.append('image', images[0]);
		setUploading(true);

		fetch(process.env.NEXT_PUBLIC_API_URL + `/upload?claim=` + id, {
			method: 'POST',
			headers: {
				// 'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + accessToken,
			},
			body: formData,
		})
			.then((res) => res.json())
			.then((res: any) => {
				if (res.errors) {
					showNotification({
						title: 'Creation failed',
						message: res.error,
						color: 'red',
					});
					setUploading(false);
				} else {
					showNotification({
						title: 'Image added',
						message: 'All Data has been saved',
						color: 'green',
					});
					mutate('/claims/' + id + '?builders=true');
					onAdd && onAdd(res);
					setUploading(false);
				}
			});
	};

	return (
		<Dropzone
			onDrop={(files) => upload(files)}
			onReject={(files) => {
				showNotification({
					title: 'Error.',
					message: files[0].errors[0].message,
					color: 'red',
				});
			}}
			styles={{ inner: { height: '100%', width: '100%' } }}
			maxSize={10 * 1024 ** 2}
			maxFiles={1}
			accept={IMAGE_MIME_TYPE}
			h="100%"
			w="100%"
			radius="md"
			style={{ borderStyle: 'solid' }}
		>
			<Center h="100%" w="100%">
				{uploading ? (
					<>
						<Stack align={'center'}>
							<Progress value={uploadingStatus} w={'120%'} animated />
							<Text>{t('claim.details.image.create.loading')}</Text>
						</Stack>
					</>
				) : (
					<Group justify="center" gap="xl" ta="center">
						<DropzoneAccept>
							<IconUpload
								style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
								stroke={1.5}
							/>
						</DropzoneAccept>
						<DropzoneReject>
							<IconX
								style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
								stroke={1.5}
							/>
						</DropzoneReject>
						<DropzoneIdle>
							<IconPhoto
								style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
								stroke={1.5}
							/>
						</DropzoneIdle>

						<div>
							<Text size="xl" inline>
								{t('claim.details.image.create.title')}
							</Text>
							<Text size="sm" c="dimmed" inline mt={7}>
								{t('claim.details.image.create.subtitle')}
							</Text>
						</div>
					</Group>
				)}
			</Center>
		</Dropzone>
	);
}

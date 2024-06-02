import { Group, rem, Text } from '@mantine/core';
import { Dropzone as MDropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';

interface ExtendDropzone extends DropzoneProps {}

export function Dropzone(props: ExtendDropzone) {
	return (
		<MDropzone maxSize={3 * 1024 ** 2} accept={IMAGE_MIME_TYPE} {...props}>
			<Group
				justify="center"
				gap="xl"
				mih={220}
				style={{
					pointerEvents: 'none',
				}}
			>
				<MDropzone.Accept>
					<IconUpload
						style={{
							width: rem(52),
							height: rem(52),
							color: 'var(--mantine-color-blue-6)',
						}}
						stroke={1.5}
					/>
				</MDropzone.Accept>
				<MDropzone.Reject>
					<IconX
						style={{
							width: rem(52),
							height: rem(52),
							color: 'var(--mantine-color-red-6)',
						}}
						stroke={1.5}
					/>
				</MDropzone.Reject>
				<MDropzone.Idle>
					<IconPhoto
						style={{
							width: rem(52),
							height: rem(52),
							color: 'var(--mantine-color-dimmed)',
						}}
						stroke={1.5}
					/>
				</MDropzone.Idle>

				<div>
					<Text size="xl" inline>
						Drag images here or click to select files
					</Text>
					<Text size="sm" c="dimmed" inline mt={7}>
						File size should not exceed 5mb
					</Text>
				</div>
			</Group>
		</MDropzone>
	);
}

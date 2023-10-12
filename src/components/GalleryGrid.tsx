import {
	AspectRatio,
	Avatar,
	BackgroundImage,
	Badge,
	Box,
	Image,
	Modal,
	Overlay,
	Portal,
	SimpleGrid,
	Title,
	useMantineTheme,
} from '@mantine/core';
import React, { useState } from 'react';

import { useIsClient } from '../hooks/useIsClient';

interface GalleryGridProps {
	images: {
		name?: string;
		date?: string;
		src: string;
	}[];
	style?: React.CSSProperties;
}

function GalleryGrid(props: GalleryGridProps) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(-1);
	const isClient = useIsClient();

	return (
		<>
			{opened != -1 && (
				<Modal
					opened={opened != -1}
					onClose={() => setOpened(-1)}
					radius={0}
					centered
					size="auto"
					title={props.images[opened].name}
					styles={{ body: { padding: 0 } }}
				>
					<AspectRatio ratio={16 / 9} miw={'75vw'}>
						<Image alt={props.images[opened].name} src={props.images[opened].src}></Image>
					</AspectRatio>
				</Modal>
			)}
			<SimpleGrid spacing="md" cols={2 + (props.images.length % 2)}>
				{props.images.map((i, index) => (
					<BackgroundImage
						src={i.src}
						style={{
							width: '100%',
							aspectRatio: '16/9',
							cursor: 'pointer',
						}}
						key={index}
						onClick={() => setOpened(index)}
					>
						<div
							style={{
								height: '100%',
								position: 'relative',
								width: '100%',
								background: 'linear-gradient(160deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0,0.8))',
							}}
						>
							<div
								style={{
									position: 'absolute',
									bottom: 0,
									right: 0,
									margin: theme.spacing.xl,
									textAlign: 'right',
									zIndex: 50,
								}}
							>
								<Title
									style={{
										color: 'var(--mantine-color-white)',
										textShadow: '0px 0px 28px #000',
										userSelect: 'none',
									}}
								>
									{i.name}
								</Title>
								{i.date && (
									<Badge variant="gradient" style={{ userSelect: 'none' }}>
										{isClient ? new Date(i.date).toLocaleDateString() : ''}
									</Badge>
								)}
							</div>
						</div>
					</BackgroundImage>
				))}
			</SimpleGrid>
		</>
	);
}

export default GalleryGrid;

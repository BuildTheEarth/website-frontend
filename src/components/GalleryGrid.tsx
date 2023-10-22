import { AspectRatio, Avatar, BackgroundImage, Badge, Box, Image, Modal, Overlay, Portal, SimpleGrid, Title, useMantineTheme } from '@mantine/core';
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
	const isClient = useIsClient();

	return (
		<SimpleGrid spacing="md" cols={2}>
			{props.images.map((i, index) => (
				<BackgroundImage
					src={i.src}
					style={{
						width: '100%',
						aspectRatio: '16/9',
					}}
					key={index}
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
								order={2}
							>
								{i.name}
							</Title>
							{i.date && (
								<Badge variant="gradient" style={{ userSelect: 'none' }} size="sm">
									{isClient ? new Date(i.date).toLocaleDateString() : ''}
								</Badge>
							)}
						</div>
					</div>
				</BackgroundImage>
			))}
		</SimpleGrid>
	);
}

export default GalleryGrid;

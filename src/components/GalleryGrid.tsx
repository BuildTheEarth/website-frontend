import { Avatar, BackgroundImage, Badge, Group, SimpleGrid, Title, useMantineTheme } from '@mantine/core';

import Link from 'next/link';
import React from 'react';
import { useIsClient } from '../hooks/useIsClient';

interface GalleryGridProps {
	images: {
		name?: string;
		date?: string;
		src: string;
		team?: { logo: string; name: string; slug: string };
		href?: string;
	}[];
	style?: React.CSSProperties;
	gap?: any;
}

function GalleryGrid(props: GalleryGridProps) {
	const theme = useMantineTheme();
	const isClient = useIsClient();

	return (
		<SimpleGrid spacing={props.gap || 'md'} cols={2} style={props.style}>
			{props.images.map((i, index) => (
				<BackgroundImage
					src={i.src}
					style={{
						width: '100%',
						aspectRatio: '16/9',
					}}
					key={index} // @ts-ignore
					component={i.href && Link}
					href={i.href}
					className={i.href && 'hover-border'}
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
							<Group>
								{i.team && (
									<Avatar src={i.team.logo} size={18}>
										{i.team.name}
									</Avatar>
								)}
								{i.date && (
									<Badge variant="gradient" style={{ userSelect: 'none' }} size="sm">
										{isClient ? new Date(i.date).toLocaleDateString() : ''}
									</Badge>
								)}
							</Group>
						</div>
					</div>
				</BackgroundImage>
			))}
		</SimpleGrid>
	);
}

export default GalleryGrid;

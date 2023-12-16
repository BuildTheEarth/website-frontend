import { BackgroundImage, Badge, Group, SimpleGrid, Title, useMantineTheme } from '@mantine/core';

import { useHover } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';
import { useIsClient } from '../hooks/useIsClient';

interface GalleryGridProps {
	images: GalleryGridImageProps[];
	style?: React.CSSProperties;
	gap?: any;
	showTooltipOnHover?: boolean;
}
interface GalleryGridImageProps {
	name?: string;
	date?: string;
	src: string;
	team?: { logo: string; name: string; slug: string };
	href?: string;
	showTooltipOnHover?: boolean;
}

function GalleryGrid(props: GalleryGridProps) {
	const theme = useMantineTheme();
	const isClient = useIsClient();

	return (
		<SimpleGrid spacing={props.gap || 'md'} cols={2} style={props.style}>
			{props.images.map((i, index) => (
				<GalleryGridImage {...i} key={index} showTooltipOnHover={props.showTooltipOnHover} />
			))}
		</SimpleGrid>
	);
}

export default GalleryGrid;

function GalleryGridImage(i: GalleryGridImageProps) {
	const theme = useMantineTheme();
	const isClient = useIsClient();
	const { hovered, ref } = useHover();
	return (
		<BackgroundImage
			src={i.src}
			style={{
				width: '100%',
				aspectRatio: '16/9',
			}} // @ts-ignore
			component={i.href && Link}
			href={i.href}
			className={i.href && 'hover-border'}
			ref={ref}
		>
			<div
				style={{
					height: '100%',
					position: 'relative',
					width: '100%',
					background: 'linear-gradient(160deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0,0.8))',
					opacity: i.showTooltipOnHover && !hovered ? 0 : 100,
					transition: 'opacity 0.3s ease-in-out',
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
					<Group style={{ flexDirection: 'row-reverse' }}>
						{i.date && (
							<Badge variant="gradient" style={{ userSelect: 'none' }} size="sm">
								{isClient ? new Date(i.date).toLocaleDateString() : ''}
							</Badge>
						)}
						{/* {i.team && (
									<Avatar src={i.team.logo} size={18}>
										{i.team.name}
									</Avatar>
								)} */}
					</Group>
				</div>
			</div>
		</BackgroundImage>
	);
}

import { Avatar, Badge, Box, Title, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';

import BackgroundImage from './BackgroundImage';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import classes from '../styles/components/Gallery.module.css';

interface GalleryImageProps {
	name?: string;
	buildTeam?: string;
	buildTeamId?: string;
	src: string;
	icon?: string;
	hash?: string;
	width?: number;
	height?: number;
}
interface GalleryProps {
	images: GalleryImageProps[];
	style?: React.CSSProperties;
}

function Gallery(props: GalleryProps) {
	const [active, setActive] = useState(0);
	const theme = useMantineTheme();

	return (
		<Box style={{ ...props.style, display: 'flex' }}>
			<Carousel
				withIndicators
				height={'100%'}
				initialSlide={active}
				controlsOffset="xl"
				controlSize={37}
				onPreviousSlide={() => {
					setActive(active - 1);
				}}
				onNextSlide={() => {
					setActive(active + 1);
				}}
				loop
				align="center"
				slideGap={0}
				style={{ flex: 1 }}
				classNames={classes}
			>
				{props.images.map((i) => {
					return (
						<Carousel.Slide key={`g-${i.name}-${i.buildTeam}`}>
							<GalleryImage {...i} />
						</Carousel.Slide>
					);
				})}
			</Carousel>
		</Box>
	);
}

export function GalleryImage(i: GalleryImageProps) {
	const theme = useMantineTheme();
	return (
		<BackgroundImage
			src={i.src}
			rootStyle={{
				width: '100%',
				height: '100%',
			}}
			blurDataURL={
				i.hash ||
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj0NE3+g8AAqUBjTCztj4AAAAASUVORK5CYII='
			}
			quality={90}
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
							display: 'flex',
							alignItems: 'center',
							color: 'var(--mantine-color-white)',
							textShadow: '0px 0px 28px #000',
							fontSize: 34,
						}}
						order={3}
					>
						<Avatar src={i.icon} radius="xl" mx="md" alt={i.name + ' Logo'} />

						{i.name}
					</Title>
					{i.buildTeam && (
						<Badge
							component={Link}
							href={`/teams/${i.buildTeamId}`}
							variant="gradient"
							style={{ cursor: 'pointer' }}
						>
							{i.buildTeam}
						</Badge>
					)}
				</div>
			</div>
		</BackgroundImage>
	);
}

export default Gallery;

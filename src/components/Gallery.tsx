/* eslint-disable @next/next/no-img-element */
import { Badge, Box, Container, Group, Pagination, Title, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';

import { Carousel } from '@mantine/carousel';

interface GalleryProps {
	images: { location?: string; builder?: string; src: string; country?: string }[];
	style?: React.CSSProperties;
}

function Gallery(props: GalleryProps) {
	const [active, setActive] = useState(0);
	const theme = useMantineTheme();

	return (
		<Box style={props.style}>
			<Carousel
				mx="auto"
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
				styles={{
					indicator: {
						width: 12,
						height: 4,
						transition: 'width 250ms ease',

						'&[data-active]': {
							width: 40,
						},
					},
				}}
			>
				{props.images.map((i) => {
					return (
						<Carousel.Slide
							sx={{ height: props.style?.height, position: 'relative' }}
							key={`g-${i.location}-${i.builder}`}
						>
							<div style={{ position: 'relative', height: props.style?.height }}>
								<img src={i.src} alt="" width={'100%'} height={'100%'} style={{ objectFit: 'cover' }} />
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
									<Title color={'white'} sx={{ display: 'flex', alignItems: 'center' }}>
										<span
											className={`fi fi-${i.country} fis`}
											style={{
												borderRadius: '50%',
												height: '25px',
												width: '25px',
												marginRight: theme.spacing.md,
												marginTop: 5,
											}}
										></span>
										{i.location}
									</Title>
									{i.builder && <Badge variant={'filled'}>{i.builder}</Badge>}
								</div>
								<div
									style={{
										position: 'absolute',
										bottom: 0,
										right: 0,
									}}
								>
									<img src="/galleryoverlay.svg" alt="" width={'100%'} />
								</div>
							</div>
						</Carousel.Slide>
					);
				})}
			</Carousel>
		</Box>
	);
}

export default Gallery;

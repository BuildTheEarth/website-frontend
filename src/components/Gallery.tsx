import { BackgroundImage, Badge, Box, Image, Title, useMantineTheme } from '@mantine/core';
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
			>
				{props.images.map((i) => {
					return (
						<Carousel.Slide key={`g-${i.location}-${i.builder}`}>
							<BackgroundImage
								src={i.src}
								style={{
									width: '100%',
									height: '100%',
								}}
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
											}}
										>
											<span
												className={`fi fi-${i.country} fis`}
												style={{
													borderRadius: '50%',
													height: '25px',
													width: '25px',
													marginRight: theme.spacing.md,
												}}
											></span>
											{i.location}
										</Title>
										{i.builder && <Badge variant="gradient">{i.builder}</Badge>}
									</div>
								</div>
							</BackgroundImage>
						</Carousel.Slide>
					);
				})}
			</Carousel>
		</Box>
	);
}

export default Gallery;

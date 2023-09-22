import { Button, Paper, Text, Title } from '@mantine/core';

import classes from '../styles/components/Card.module.css';

interface ArticleCardImageProps {
	image: string;
	title: string;
	category: string;
	style?: any;
	showButton?: boolean;
	buttonText?: string;
	onClick?: () => void;
}

export function BackgroundCard({
	image,
	title,
	category,
	style,
	showButton,
	buttonText,
	onClick,
}: ArticleCardImageProps) {
	return (
		<Paper
			shadow="md"
			p="xl"
			radius="md"
			style={{ backgroundImage: `url(${image})`, position: 'relative', ...style }}
			className={classes.card}
		>
			<div style={{ zIndex: 8 }}>
				<Text className={classes.category} size="xs">
					{category}
				</Text>
				<Title order={3} className={classes.title}>
					{title}
				</Title>
			</div>
			{showButton && (
				<Button variant="white" color="dark" size="md" onClick={onClick}>
					{buttonText}
				</Button>
			)}
			<div
				style={{
					position: 'absolute',
					top: -1,
					left: 0,
				}}
			>
				<img src="/galleryoverlay.svg" alt="" width={'100%'} style={{ rotate: '180deg', borderRadius: '8px' }} />
			</div>
		</Paper>
	);
}

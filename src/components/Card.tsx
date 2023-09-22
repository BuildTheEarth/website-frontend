import { Button, Paper, Text, Title, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	card: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},

	title: {
		fontWeight: 900,
		color: theme.white,
		lineHeight: 1.2,
		marginTop: theme.spacing.xs,
	},

	category: {
		color: theme.white,
		opacity: 0.7,
		fontWeight: 700,
		textTransform: 'uppercase',
	},
}));

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
	const { classes } = useStyles();

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

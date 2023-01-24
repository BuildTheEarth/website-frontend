import { BackgroundImage, Center, Container, Text, Title, useMantineTheme } from '@mantine/core';

import Footer from './Footer';
import Header from './Header';
import React from 'react';
import { SWRConfig } from 'swr';
import { useMediaQuery } from '@mantine/hooks';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useSession } from 'next-auth/react';

interface PageProps {
	children: React.ReactNode;
	fullWidth?: boolean;
	disabled?: {
		header?: boolean;
		footer?: boolean;
	};
	head?: {
		title: string;
		subtitle?: string;
		image?: string;
		filter?: string;
		large?: boolean;
	};
	hideHeaderOnInitialScroll?: boolean;
	style?: React.CSSProperties;
}

const Page = (props: PageProps) => {
	const matches = useMediaQuery('(min-width: 900px)');
	const { data: session } = useSession();
	const { scrollY } = useScrollPosition();
	const theme = useMantineTheme();
	return (
		<div
			style={{
				backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
				width: 'calc(100vw - (100vw - 100%))',
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{!props.disabled?.header && (
				<Header
					links={[
						{ link: '/faq', translation: 'faq' },
						{ link: '/map', translation: 'map' },
						{ link: '/teams', translation: 'teams' },
						{ link: '/contact', translation: 'contact' },
					]}
					style={{
						opacity: props.hideHeaderOnInitialScroll && scrollY <= 20 ? 0 : 1,
						transition: 'opacity 0.2s linear',
						zIndex: 9999,
					}}
				/>
			)}

			{props.head && (
				<BackgroundImage src={props.head?.image || ''} style={{ width: '100%', height: '25vh' }}>
					<Center
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: '#00000077',
						}}
					>
						<h1 style={{ color: '#ffffff', fontSize: '48px', zIndex: '99' }}>
							{props.head?.title}
							{props.head?.subtitle && (
								<>
									<Text style={{ fontWeight: 'normal' }}>{props.head?.subtitle}</Text>
								</>
							)}
						</h1>
					</Center>
				</BackgroundImage>
			)}

			{props.fullWidth ? (
				props.children
			) : (
				<Container
					size="xl"
					style={{
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#ffffff',
						boxShadow: 'none',
						marginTop: theme.spacing.xl * 2,
						marginBottom: theme.spacing.xl * 2,
						padding: !matches ? `${theme.spacing.xs * 3}px` : `${theme.spacing.xl * 3}px`,
						paddingBottom: !matches ? `${theme.spacing.xs * 1.5}px` : `${theme.spacing.xl * 1.5}px`,
						paddingTop: !matches ? `${theme.spacing.xs * 1}px` : `${theme.spacing.xl * 1}px`,
						flex: 1,
						width: '100%',
						position: 'relative',
						...props.style,
					}}
				>
					{props.children}
				</Container>
			)}

			{!props.disabled?.footer && (
				<Footer
					links={[
						{ link: '/faq', translation: 'faq' },
						{ link: '/contact', translation: 'contact' },
						{ link: '/about', translation: 'aboutUs' },
					]}
				/>
			)}
		</div>
	);
};
export default Page;

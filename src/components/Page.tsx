import { BackgroundImage, Center, Container, Text, useMantineTheme } from '@mantine/core';
import { NextSeo, NextSeoProps } from 'next-seo';

import Footer from './Footer';
import Header from './Header';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
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
	title?: string;
	description?: string;
	seo?: NextSeoProps;
	hideHeaderOnInitialScroll?: boolean;
	style?: React.CSSProperties;
}

const Page = (props: PageProps) => {
	const matches = useMediaQuery('(min-width: 900px)');
	const router = useRouter();
	const { data: session } = useSession();
	const { scrollY } = useScrollPosition();
	const theme = useMantineTheme();
	return (
		<>
			<NextSeo
				title={props.title || props.head?.title}
				canonical={'https://beta.buildtheearth.net' + router.pathname}
				description={props.description}
				{...props.seo}
			/>
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
					<BackgroundImage
						src={props.head?.image || ''}
						style={{ width: '100%', minHeight: props.head.large ? '30vh' : '25vh' }}
					>
						<Center
							style={{
								width: '100%',
								backgroundColor: '#00000077',
								textAlign: 'center',
								height: '100%',
								minHeight: props.head.large ? '30vh' : '25vh',
							}}
						>
							<h1
								style={{
									color: '#ffffff',
									fontSize: theme.fontSizes.xl * 2,
									zIndex: '99',
									marginTop: '60px',
									marginRight: theme.spacing.md,
									marginLeft: theme.spacing.md,
								}}
							>
								{props.head?.title}
								{props.head?.subtitle && (
									<>
										<Text style={{ fontWeight: 'normal', fontSize: theme.fontSizes.lg }}>{props.head?.subtitle}</Text>
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
		</>
	);
};
export default Page;

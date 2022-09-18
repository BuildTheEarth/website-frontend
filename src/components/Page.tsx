import { Center, Container, Text, Title, useMantineTheme } from '@mantine/core';

import Footer from './Footer';
import Header from './Header';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

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
}

const Page = (props: PageProps) => {
	const { t } = useTranslation();
	const matches = useMediaQuery('(min-width: 900px)');
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
						{ link: '/faq', label: t('pages.faq') },
						{ link: '/map', label: t('pages.map') },
						{ link: '/teams', label: t('pages.teams.multiple') },
						{ link: '/contact', label: t('pages.contact') },
					]}
				/>
			)}

			{props.head && (
				<div
					style={{
						width: '100%',
						height: '20vh',
						position: 'relative',
					}}
				>
					<div
						style={{
							backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
							background: `url(${props.head?.image})`,
							filter: props.head?.filter || 'brightness(0.8)',
							width: '100%',
							height: '100%',
							marginTop: props.disabled?.header ? 0 : 60,
						}}
					></div>
					<Center
						style={{
							width: '100%',
							height: '100%',
							position: 'absolute',
							top: props.disabled?.header ? 0 : 60,
							left: 0,
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
						<div
							style={{
								position: 'absolute',
								bottom: '0',
								width: '100%',
								height: '100px',
								background: 'linear-gradient(180deg,transparent,rgba(0, 0, 0, 0.26))',
							}}
						></div>
					</Center>
				</div>
			)}

			{props.fullWidth ? (
				props.children
			) : (
				<Container
					size="xl"
					style={{
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#ffffff',
						boxShadow: 'none',
						marginTop: theme.spacing.xl * 2 + (props.disabled?.header ? 0 : 60),
						marginBottom: theme.spacing.xl * 2,
						padding: !matches ? `${theme.spacing.xs * 3}px` : `${theme.spacing.xl * 3}px`,
						paddingBottom: !matches ? `${theme.spacing.xs * 1.5}px` : `${theme.spacing.xl * 1.5}px`,
						paddingTop: !matches ? `${theme.spacing.xs * 1}px` : `${theme.spacing.xl * 1}px`,
						flex: 1,
						width: '100%',
						position: 'relative',
					}}
				>
					{props.children}
				</Container>
			)}

			{!props.disabled?.footer && (
				<Footer
					links={[
						{ link: '/faq', label: t('pages.faq') },
						{ link: '/contact', label: t('pages.contact') },
						{ link: '/about', label: t('pages.about') },
					]}
				/>
			)}
		</div>
	);
};
export default Page;

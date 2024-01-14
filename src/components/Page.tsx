import {
	Center,
	Container,
	Paper,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NextSeo, NextSeoProps } from 'next-seo';
import React, { useEffect } from 'react';
import Header, { LogoHeader } from './Header';

import { useMediaQuery } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { NextResponse } from 'next/server';
import { useUser } from '../hooks/useUser';
import ErrorPage from '../pages/_error';
import classes from '../styles/components/Page.module.css';
import Footer from './Footer';

interface PageProps {
	children: React.ReactNode;
	fullWidth?: boolean;
	smallPadding?: boolean;
	disabled?: {
		header?: boolean;
		footer?: boolean;
	};
	head?: {
		title: string;
		subtitle?: string;
		image?: string;
		filter?: string;
	};
	title?: string;
	description?: string;
	seo?: NextSeoProps;
	hideHeaderOnInitialScroll?: boolean;
	style?: React.CSSProperties;
	requiredPermissions?: string[];
	loading?: boolean;
}

const Page = (props: PageProps) => {
	const matches = useMediaQuery('(min-width: 900px)');
	const router = useRouter();
	const user = useUser();
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { scrollY, scrollYProgress } = useScroll();
	const bgPosY = useTransform(scrollYProgress, (latest) => `${latest * 5 + 50}%`);

	return props.loading ? (
		<ErrorPage code={'1'} />
	) : props.requiredPermissions && !user.hasPermissions(props.requiredPermissions) ? (
		<ErrorPage code={'403'} />
	) : (
		<>
			<NextSeo
				title={props.title || props.head?.title}
				canonical={'https://buildtheearth.net' + router.pathname}
				description={props.description}
				{...props.seo}
			/>
			{!props.disabled?.header && (
				<Header
					links={[
						{ link: '/faq', translation: 'faq' },
						{ link: '/gallery', translation: 'gallery' },
						{ link: '/map', translation: 'map' },
						{ link: '/teams', translation: 'teams' },
						{ link: '/contact', translation: 'contact' },
					]}
					style={{
						// opacity: props.hideHeaderOnInitialScroll && scrollY <= 20 ? 0 : 1,
						transition: 'opacity 0.2s linear',
						zIndex: 9999,
					}}
				/>
			)}

			<Paper className={classes.root} style={props.fullWidth ? props.style : undefined}>
				{props.head && (
					<motion.div
						style={{
							backgroundColor:
								scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
							background: `url("${props.head?.image || ''}") center center / cover`,
							backgroundPositionY: bgPosY,
							width: '100%',
							minHeight: '25vh',
						}}
					>
						<Center
							style={{
								width: '100%',
								backgroundColor: '#00000077',
								textAlign: 'center',
								height: '100%',
								minHeight: '25vh',
							}}
						>
							<h1
								style={{
									color: '#ffffff',
									fontSize: 'calc(var(--mantine-font-size-xl) * 2)',
									zIndex: '22',
									marginTop: '60px',
									marginRight: theme.spacing.md,
									marginLeft: theme.spacing.md,
								}}
							>
								{props.head?.title}
								{props.head?.subtitle && (
									<>
										<Text style={{ fontWeight: 'normal', fontSize: theme.fontSizes.lg }}>
											{props.head?.subtitle}
										</Text>
									</>
								)}
							</h1>
						</Center>
					</motion.div>
				)}

				{props.fullWidth ? (
					props.children
				) : (
					<ContentContainer style={props.style} smallPadding={props.smallPadding}>
						{props.children}
					</ContentContainer>
				)}

				{!props.disabled?.footer && (
					<Footer
						links={[
							{ link: '/faq', translation: 'faq' },
							{ link: '/contact', translation: 'contact' },
							{ link: 'https://status.buildtheearth.net', translation: 'status' },
						]}
					/>
				)}
			</Paper>
		</>
	);
};

export const LogoPage = (props: PageProps & { headData: any; team: string }) => {
	return (
		<Page {...props} fullWidth>
			<LogoHeader
				{...props.headData}
				applyHref={`${props.team}/apply`}
				settingsHref={`${props.team}/manage`}
			/>
			<ContentContainer style={props.style} smallPadding={props.smallPadding}>
				{props.children}
			</ContentContainer>
		</Page>
	);
};
export default Page;

const ContentContainer = (props: {
	children: any;
	smallPadding?: boolean;
	style?: React.CSSProperties;
}) => {
	return (
		<Container
			className={classes.container}
			size="lg"
			style={props.style}
			data-smallpadding={props.smallPadding}
		>
			{props.children}
		</Container>
	);
};

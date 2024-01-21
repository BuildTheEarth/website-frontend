import { Center, Container, Paper, Text, useMantineTheme } from '@mantine/core';
import Header, { LogoHeader } from './Header';
import { NextSeo, NextSeoProps } from 'next-seo';

import BackgroundImage from './BackgroundImage';
import ErrorPage from '../pages/_error';
import Footer from './Footer';
import React from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import classes from '../styles/components/Page.module.css';
import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';

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
		image: string | StaticImport;
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
	const router = useRouter();
	const user = useUser();
	const theme = useMantineTheme();

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
						transition: 'opacity 0.2s linear',
						zIndex: 9999,
					}}
				/>
			)}

			<Paper className={classes.root} style={props.fullWidth ? props.style : undefined}>
				{props.head && (
					<BackgroundImage
						src={props.head.image}
						rootStyle={{
							minHeight: '25vh',
						}}
						priority
					>
						<Center
							style={{
								width: '100%',
								backgroundColor: '#00000077',
								textAlign: 'center',
								height: '100%',
								minHeight: '25vh',
								zIndex: 10,
								position: 'relative',
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
					</BackgroundImage>
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

export const LogoPage = (props: PageProps & { headData: any; team: string; color?: string }) => {
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
			<main>{props.children}</main>
		</Container>
	);
};

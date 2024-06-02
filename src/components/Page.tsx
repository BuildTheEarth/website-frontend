import { Center, Container, Paper, Text, useMantineTheme } from '@mantine/core';
import { NextSeo, NextSeoProps } from 'next-seo';
import Header, { LogoHeader } from './Header';

import { usePermissions } from '@/hooks/usePermissions';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useRouter } from 'next/router';
import React from 'react';
import ErrorPage from '../pages/_error';
import classes from '../styles/components/Page.module.css';
import BackgroundImage from './BackgroundImage';
import Footer from './Footer';

interface PageProps {
	children: React.ReactNode;
	fullWidth?: boolean;
	smallPadding?: boolean;
	noBg?: boolean;
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
	requiredPermissions?: { buildteam?: string; permissions: string[] };
	loading?: boolean;
	solidHeader?: boolean;
}

const Page = (props: PageProps) => {
	const router = useRouter();
	const permissions = usePermissions();
	const theme = useMantineTheme();

	return props.loading ? (
		<ErrorPage code={'1'} />
	) : props.requiredPermissions &&
	  !permissions.hasAny(
			props.requiredPermissions.permissions,
			props.requiredPermissions.buildteam,
	  ) ? (
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
					solid={props.solidHeader}
				/>
			)}

			<Paper className={classes.root} style={props.fullWidth ? props.style : undefined}>
				{props.head && (
					<BackgroundImage
						src={props.head.image}
						rootStyle={{
							minHeight: 'calc(60px + 25vh)',
						}}
						priority
						blurDataURL="data:image/webp;base64,UklGRt4CAABXRUJQVlA4WAoAAAAgAAAAtQAAtQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg8AAAAJAMAJ0BKrYAtgA+0WiwUyglpKKgSAEAGglpbt1euxvgCe16u6KuEQlQ/Dt6SncZxhF9Xdf0XOtOENaLR1am3TMoBTJgEGx6qLl0eH/XBH0rZF1YalUAqH/IrEns4tSusYi4fehRMKrMaSJCcAAA/us4+eTagZfrjdPBw+fyLyVUMvYN3Izb1pMDJuaEGFQPTdGRywaPa+yLLljmCotB18gzp9xPrQVo7uq7PIL4V8ac7spU+bRX4yOanYMBT9MJbnFmmP4CCFunzH6FY1zP8+SNs4iIt1JI8066DjXBRMd1iSHmp0Ud0vPut0H8wAAAAA=="
					>
						<Center
							style={{
								width: '100%',
								backgroundColor: '#00000077',
								textAlign: 'center',
								height: '100%',
								minHeight: 'calc(60px + 25vh)',
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
					<ContentContainer style={props.style} smallPadding={props.smallPadding} noBg={props.noBg}>
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

export const ContentContainer = (props: {
	children: any;
	smallPadding?: boolean;
	noBg?: boolean;
	style?: React.CSSProperties;
}) => {
	return (
		<Container
			className={classes.container}
			size="lg"
			style={props.style}
			data-smallpadding={props.smallPadding}
			data-bg={!props.noBg}
		>
			<main>{props.children}</main>
		</Container>
	);
};

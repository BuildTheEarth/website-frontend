import {
	Discord,
	Instagram,
	Reddit,
	Tiktok,
	Twitch,
	Twitter,
	Youtube,
} from '@icons-pack/react-simple-icons';
import {
	ActionIcon,
	Anchor,
	Avatar,
	Badge,
	Box,
	Burger,
	Button,
	Container,
	Divider,
	Group,
	Menu,
	MenuItem,
	Paper,
	rem,
	Text,
	Tooltip,
	Transition,
	UnstyledButton,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import {
	IconCalendar,
	IconDashboard,
	IconDots,
	IconMap,
	IconMoonStars,
	IconPhoto,
	IconPolygon,
	IconSearch,
	IconSend,
	IconSettings,
	IconSun,
	IconUser,
	IconUsers,
} from '@tabler/icons-react';
import { useScroll, useTransform } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { CSSProperties, useState } from 'react';
import { ChevronDown, FileSearch, Logout, World } from 'tabler-icons-react';

import { usePermissions } from '@/hooks/usePermissions';
import logo from '@/public/logo.gif';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useUser } from '../hooks/useUser';
import classes from '../styles/components/Header.module.css';
import { hexToDataURL } from '../utils/Color';
import Icon from './Icon';

interface HeaderProps {
	links: {
		link: string;
		translation: string;
	}[];
	style?: React.CSSProperties;
	solid?: boolean;
}

const Header = ({ links, style, solid }: HeaderProps) => {
	const [opened, handler] = useDisclosure(false);
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const { t } = useTranslation();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const router = useRouter();
	const { data: session, status } = useSession();
	const { scrollY } = useScrollPosition();
	const user = useUser();
	const permissions = usePermissions();

	const items = links.map((link) => (
		<Anchor
			component={Link}
			key={link.translation}
			className={classes.link}
			onClick={() => {
				handler.close();
			}}
			href={link.link}
			data-scroll-full={scrollY >= 100}
		>
			{t(`links.${link.translation}`)}
		</Anchor>
	));

	return (
		<Box
			className={classes.root}
			style={{ ...style, height: 60 }}
			data-transparent={!solid}
			data-opened={opened}
			data-scroll-full={scrollY >= 100}
		>
			<Container className={classes.header} size={'xl'}>
				<Group gap={5} className={classes.logo} onClick={() => router.push('/')}>
					<Image
						src={logo}
						alt="Logo"
						height={40}
						placeholder="blur"
						blurDataURL="data:image/webp;base64,UklGRt4CAABXRUJQVlA4WAoAAAAgAAAAtQAAtQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg8AAAAJAMAJ0BKrYAtgA+0WiwUyglpKKgSAEAGglpbt1euxvgCe16u6KuEQlQ/Dt6SncZxhF9Xdf0XOtOENaLR1am3TMoBTJgEGx6qLl0eH/XBH0rZF1YalUAqH/IrEns4tSusYi4fehRMKrMaSJCcAAA/us4+eTagZfrjdPBw+fyLyVUMvYN3Izb1pMDJuaEGFQPTdGRywaPa+yLLljmCotB18gzp9xPrQVo7uq7PIL4V8ac7spU+bRX4yOanYMBT9MJbnFmmP4CCFunzH6FY1zP8+SNs4iIt1JI8066DjXBRMd1iSHmp0Ud0vPut0H8wAAAAA=="
						style={{ marginRight: '4px' }}
					/>
					{t('buildtheearth')}
				</Group>
				<Group gap={5} className={classes.links}>
					{items}
					<ActionIcon
						variant="subtle"
						color="gray"
						aria-label="Search on map"
						component={Link}
						className={classes.linkIcon}
						href="/map?s=true"
						title="Search on map"
					>
						<IconSearch stroke={1.5} style={{ width: '70%', height: '70%' }} />
					</ActionIcon>
				</Group>

				<Group gap={5} className={classes.links}>
					{session != null && session?.user ? (
						<Menu
							onClose={() => setUserMenuOpened(false)}
							onOpen={() => {
								setUserMenuOpened(true);
							}}
						>
							<Menu.Target>
								<UnstyledButton className={classes.user} data-useractive={userMenuOpened}>
									<Group gap={7}>
										<Avatar
											alt={
												session.user.username + ' Logo' ||
												session.user.email + ' Logo' ||
												'User Avatar'
											}
											radius="xl"
											size={'sm'}
											color="cyan"
											src={user.user?.avatar}
										>
											{(session.user.username || session.user.email).charAt(0)}
										</Avatar>
										<Text fw={500} fs="sm" style={{ lineHeight: 1 }} mr={3}>
											{session.user.username || session.user.email}
										</Text>
										<ChevronDown size={12} />
									</Group>
								</UnstyledButton>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item component={Link} href="/me" leftSection={<IconUser size={14} />}>
									{t('user.profile')}
								</Menu.Item>
								<Menu.Item component={Link} href="/map/edit" leftSection={<IconMap size={14} />}>
									Claims Map
								</Menu.Item>
								<Menu.Item
									leftSection={<IconSettings size={14} />}
									component={Link}
									href="/me/settings/general"
								>
									{t('user.settings')}
								</Menu.Item>
								<Menu.Divider />
								<Menu.Label>{t('user.quickActions')}</Menu.Label>
								<Menu.Item
									leftSection={
										colorScheme === 'dark' ? <IconMoonStars size={14} /> : <IconSun size={14} />
									}
									onClick={() => toggleColorScheme()}
								>
									{t(`user.theme.${colorScheme}`)}
								</Menu.Item>
								<Menu.Item
									leftSection={<IconSearch size={14} />}
									component={Link}
									href="/map?s=true"
								>
									{t('search')}
								</Menu.Item>
								<Menu.Divider />
								<Menu.Label>{t('staff')}</Menu.Label>
								<Menu.Item
									leftSection={<FileSearch size={14} />}
									component={Link}
									href="/me/review"
								>
									{t('user.review')}
								</Menu.Item>
								{permissions.has('admin.admin') && (
									<Menu.Item
										leftSection={<IconDashboard size={14} />}
										component={Link}
										href="/admin/cron"
									>
										Administration
									</Menu.Item>
								)}
								{permissions.has('calendar.manage') && (
									<Menu.Item
										leftSection={<IconCalendar size={14} />}
										component={Link}
										href="/calendar"
									>
										Event Calendar
									</Menu.Item>
								)}
								<Menu.Divider />
								<Menu.Item
									leftSection={<Logout size={14} />}
									color="red"
									onClick={() => {
										window.localStorage.removeItem('auth-permission-state');
										signOut();
									}}
								>
									{t('auth.signout')}
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					) : (
						<>
							<Anchor
								className={classes.link}
								onClick={() => {
									signIn('keycloak');
								}}
							>
								{t('auth.signin')}
							</Anchor>
							<Button
								style={{
									fontWeight: '500',
									paddingLeft: '12px',
									paddingRight: '12px',
									height: '32px',
								}}
								onClick={() => router.push('/join')}
							>
								{t('auth.signup')}
							</Button>
						</>
					)}
				</Group>

				<Group gap={5} className={classes.burger}>
					<Burger
						opened={opened}
						onClick={() => {
							handler.toggle();
						}}
						size="sm"
					/>
				</Group>

				<Transition transition="scale-y" duration={200} mounted={opened}>
					{(styles: CSSProperties) => (
						<Paper className={classes.dropdown} withBorder style={styles}>
							{items}
							{session != null && session?.user ? (
								<>
									<Divider />
									<UnstyledButton className={classes.user} onClick={() => router.push('/me')}>
										<Group gap={7}>
											<Avatar
												alt={
													session.user.username + ' Logo' ||
													session.user.email + ' Logo' ||
													'User Avatar'
												}
												radius="xl"
												size={'sm'}
												color="cyan"
											>
												{(session.user.username || session.user.email).charAt(0)}
											</Avatar>
											<Text fw={500} fs="sm" style={{ lineHeight: 1 }} mr={3}>
												{session.user.username || session.user.email}
											</Text>
										</Group>
									</UnstyledButton>
								</>
							) : (
								<>
									<Divider />
									<UnstyledButton className={classes.user} data-useractive={userMenuOpened}>
										<Group gap={7}>
											<Button onClick={() => router.push('/join')}>{t('auth.signup')}</Button>
											<Button ml="md" onClick={() => signIn('keycloak')} variant="outline">
												{t('auth.signin')}
											</Button>
										</Group>
									</UnstyledButton>
								</>
							)}
						</Paper>
					)}
				</Transition>
			</Container>
		</Box>
	);
};

interface LogoHeaderProps {
	backgroundImage: string;
	icon: string;
	name: string;
	socials?: { name: string; url: string; icon: string }[];
	members?: { id: string }[];
	showStatus?: boolean;
	applyHref?: string;
	settingsHref?: string;
	invite?: string;
	id: string;
	color?: string;
}

export const LogoHeader = (props: LogoHeaderProps) => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { scrollY, scrollYProgress } = useScroll();
	const user = useUser();
	const permissions = usePermissions();
	const bgPosY = useTransform(scrollYProgress, (latest) => `${latest * 20 + 50}%`);
	const userStatus = props?.members?.find((m: any) => m.id == user.user?.id)
		? 'Joined'
		: 'Not Joined';
	return (
		<>
			<Image
				src={props.backgroundImage}
				alt={props.name}
				// fill
				width={1920}
				height={1080}
				style={{
					width: '100%',
					height: '50vh',
					objectFit: 'cover',
				}}
				placeholder="blur"
				blurDataURL={hexToDataURL(props?.color || '#ffffff')}
				priority
			/>
			<Group
				justify="center"
				style={{
					width: '100%',
					backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
					borderBottom: `1px solid ${
						scheme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
					}`,
				}}
			>
				<Group
					justify="space-between"
					py="md"
					style={{
						width: '80%',
						position: 'relative',
					}}
				>
					<Group>
						<Avatar
							src={props.icon}
							size={128}
							mr="xl"
							style={{
								marginTop: -60,
								backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
								borderRadius: '50%',
								padding: 16,
							}}
							alt={props.name + ' Logo'}
						></Avatar>
						<h1 style={{ lineHeight: 1, margin: 0 }}>{props.name}</h1>
					</Group>
					<Group>
						{props.socials?.map((social) => {
							let icon = null;
							switch (social.icon.toLowerCase()) {
								case 'website': {
									icon = <World />;
									break;
								}
								case 'youtube': {
									icon = <Youtube />;
									break;
								}
								case 'twitter': {
									icon = <Twitter />;
									break;
								}
								case 'reddit': {
									icon = <Reddit />;
									break;
								}
								case 'twitch': {
									icon = <Twitch />;
									break;
								}
								case 'instagram': {
									icon = <Instagram />;
									break;
								}
								case 'tiktok': {
									icon = <Tiktok />;
									break;
								}
								default:
									icon = <Icon icon={social.icon} />;
							}
							return (
								<ActionIcon
									component={Link}
									href={social.url}
									target="_blank"
									variant="transparent"
									color="gray"
									key={social.name}
								>
									{icon}
								</ActionIcon>
							);
						})}
						{props.invite && (
							<ActionIcon
								component={Link}
								href={props.invite}
								target="_blank"
								variant="transparent"
								color="gray"
								key={'discord-inv'}
							>
								<Discord />
							</ActionIcon>
						)}
						{userStatus != 'Not Joined' ? (
							<Tooltip label="You are a member of this Buildteam" openDelay={200}>
								<Badge color="green" size="lg">
									{userStatus}
								</Badge>
							</Tooltip>
						) : (
							<Button component={Link} href={props.applyHref || ''}>
								Apply
							</Button>
						)}
						{permissions.hasAny(
							[
								'team.settings.edit',
								'team.socials.edit',
								'team.application.edit',
								'team.application.list',
								'team.application.review',
								'team.showcases.edit',
								'permission.add',
								'permission.remove',
								'team.claim.list',
							],
							props.id,
						) && (
							<Group wrap="nowrap" gap={0}>
								<Button
									style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
									variant="default"
									component={Link}
									href={props.settingsHref + '/settings' || ''}
								>
									Manage
								</Button>
								<Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
									<Menu.Target>
										<ActionIcon
											variant="default"
											size={36}
											style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
										>
											<IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
										</ActionIcon>
									</Menu.Target>
									<Menu.Dropdown>
										<MenuItem
											leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
											component={Link}
											href={props.settingsHref + '/settings' || ''}
											disabled={
												!permissions.hasAny(['team.settings.edit', 'team.socials.edit'], props.id)
											}
										>
											Settings
										</MenuItem>
										<MenuItem
											leftSection={<IconSend style={{ width: rem(14), height: rem(14) }} />}
											component={Link}
											href={props.settingsHref + '/apply' || ''}
											disabled={!permissions.hasAny(['team.application.edit'], props.id)}
										>
											Application Questions
										</MenuItem>
										<MenuItem
											leftSection={<IconUsers style={{ width: rem(14), height: rem(14) }} />}
											component={Link}
											href={props.settingsHref + '/members' || ''}
											disabled={
												!permissions.hasAny(['permission.add', 'permission.remove'], props.id)
											}
										>
											Members
										</MenuItem>
										<MenuItem
											leftSection={<IconPolygon style={{ width: rem(14), height: rem(14) }} />}
											component={Link}
											href={props.settingsHref + '/claims' || ''}
											disabled={!permissions.hasAny(['team.claim.list'], props.id)}
										>
											Claims
										</MenuItem>
										<MenuItem
											leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}
											component={Link}
											href={props.settingsHref + '/images' || ''}
											disabled={!permissions.hasAny(['team.showcases.edit'], props.id)}
										>
											Showcase Images
										</MenuItem>
										<MenuItem
											leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
											component={Link}
											href={props.settingsHref + '/review' || ''}
											disabled={
												!permissions.hasAny(
													['team.application.review', 'team.application.list'],
													props.id,
												)
											}
										>
											Review
										</MenuItem>
									</Menu.Dropdown>
								</Menu>
							</Group>
						)}
					</Group>
				</Group>
			</Group>
		</>
	);
};

export default Header;

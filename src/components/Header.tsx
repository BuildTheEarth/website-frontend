import {
	Discord,
	Instagram,
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
	Indicator,
	Menu,
	Paper,
	Text,
	Tooltip,
	Transition,
	UnstyledButton,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { IconSearch, IconSettings, IconSun } from '@tabler/icons';
import { IconMoonStars, IconUser } from '@tabler/icons-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { CSSProperties, useState } from 'react';
import { ChevronDown, FileSearch, Logout, MoonStars, Sun, World } from 'tabler-icons-react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useUser } from '../hooks/useUser';
import classes from '../styles/components/Header.module.css';
import Icon from './Icon';

interface HeaderProps {
	links: {
		link: string;
		translation: string;
	}[];
	style?: React.CSSProperties;
}

const Header = ({ links, style }: HeaderProps) => {
	const [opened, handler] = useDisclosure(false);
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const { t } = useTranslation();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const router = useRouter();
	const theme = useMantineTheme();
	const mobilePaperRef = useClickOutside(() => handler.close());
	const { data: session, status } = useSession();
	const user = useUser();
	const items = links.map((link) => (
		<Anchor
			component={Link}
			key={link.translation}
			className={classes.link}
			onClick={() => {
				handler.close();
			}}
			href={link.link}
		>
			{t(`links.${link.translation}`)}
		</Anchor>
	));
	return (
		<Box className={classes.root} /*fixed*/ style={{ ...style, height: 60 }}>
			<Container className={classes.header} size={'xl'}>
				<Group gap={5} className={classes.logo} onClick={() => router.push('/')}>
					<img src="/logo.gif" alt="Logo" height="40" style={{ marginRight: '4px' }} />
					{t('buildtheearth')}
				</Group>
				<Group gap={5} className={classes.links}>
					{items}
					<ActionIcon
						variant="subtle"
						color="gray"
						aria-label="Search on map"
						component={Link}
						href="/map?s=true"
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
										<Indicator color="red" inline size={8} disabled={session.user.email_verified}>
											<Avatar
												alt={session.user.username || session.user.email || 'User Avatar'}
												radius="xl"
												size={'sm'}
												color="blue"
												src={user.user?.avatar}
											>
												{(session.user.username || session.user.email).charAt(0)}
											</Avatar>
										</Indicator>
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
									Search on Map
								</Menu.Item>
								<Menu.Divider />
								<Menu.Label>{t('staff')}</Menu.Label>
								<Menu.Item leftSection={<FileSearch size={14} />}>{t('user.review')}</Menu.Item>
								<Menu.Divider />
								<Menu.Item leftSection={<Logout size={14} />} onClick={() => signOut()}>
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
					<Burger opened={opened} onClick={() => handler.open()} size="sm" />
				</Group>

				<Transition transition="scale-y" duration={200} mounted={opened}>
					{(styles: CSSProperties) => (
						<Paper className={classes.dropdown} withBorder style={styles} ref={mobilePaperRef}>
							{items}
							{session != null && session?.user ? (
								<>
									<Divider />
									<UnstyledButton
										className={classes.user}
										onClick={() => router.push('/profile')}
										data-useractive={userMenuOpened}
									>
										<Group gap={7}>
											<Indicator color="red" inline size={8} disabled={session.user.email_verified}>
												<Avatar
													alt={session.user.username || session.user.email || 'User Avatar'}
													radius="xl"
													size={'sm'}
													color="blue"
												>
													{(session.user.username || session.user.email).charAt(0)}
												</Avatar>
											</Indicator>
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
											<Button onClick={() => router.push('/getstarted')}>{t('auth.signup')}</Button>
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
}

export const LogoHeader = (props: LogoHeaderProps) => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { scrollY, scrollYProgress } = useScroll();
	const user = useUser();
	const bgPosY = useTransform(scrollYProgress, (latest) => `${latest * 20 + 50}%`);
	const userStatus = props?.members?.find((m: any) => m.id == user.user?.id)
		? 'Joined'
		: 'Not Joined';
	return (
		<>
			<motion.div
				style={{
					backgroundColor:
						scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					background: `url("${props.backgroundImage}") center center / cover`,
					backgroundPositionY: bgPosY,
					width: '100%',
					height: '50vh',
				}}
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
							alt={'Logo'}
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
								case 'discord': {
									icon = <Discord />;
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
						{user.hasPermissions(
							[
								'team.settings.edit',
								'team.socials.edit',
								'team.application.edit',
								'team.application.list',
								'team.application.review',
							],
							props.id,
						) && (
							<Button component={Link} href={props.settingsHref || ''} variant="outline">
								Settings
							</Button>
						)}
					</Group>
				</Group>
			</Group>
		</>
	);
};

export default Header;

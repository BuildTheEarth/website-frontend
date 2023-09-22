import {
	ActionIcon,
	AppShellHeader,
	Avatar,
	Badge,
	Burger,
	Button,
	Container,
	Divider,
	Group,
	Indicator,
	Menu,
	Paper,
	Text,
	Transition,
	UnstyledButton,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { ChevronDown, FileSearch, FileUpload, Logout, MoonStars, Sun, World } from 'tabler-icons-react';
import { Discord, Instagram, Tiktok, Twitch, Twitter, Youtube } from '@icons-pack/react-simple-icons';
import React, { CSSProperties, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useClickOutside, useDisclosure } from '@mantine/hooks';

import Icon from './Icon';
import { IconSettings } from '@tabler/icons';
import classes from '../styles/components/Header.module.css';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useUser } from '../hooks/useUser';

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
	const items = links.map((link) => (
		<a
			key={link.translation}
			className={classes.link}
			onClick={() => {
				router.push(link.link);
				handler.close();
			}}
			href={link.link}
			data-linkactive={router.pathname.includes(link.link)}
		>
			{t(`links.${link.translation}`)}
		</a>
	));
	return (
		<AppShellHeader h={60} className={classes.root} /*fixed*/ style={style}>
			<Container className={classes.header} size={'xl'}>
				<Group gap={5} className={classes.logo} onClick={() => router.push('/')}>
					<img src="/logo.gif" alt="Mantine" height="40" style={{ marginRight: '4px' }} />
					{t('buildtheearth')}
				</Group>
				<Group gap={5} className={classes.links}>
					{items}
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
								<Menu.Item leftSection={<FileUpload size={14} />}>{t('user.upload')}</Menu.Item>
								<Menu.Item leftSection={<IconSettings size={14} />} component="a" href="/me/settings">
									Settings
								</Menu.Item>
								<Menu.Divider />
								<Menu.Label>{t('user.quickActions')}</Menu.Label>
								<Menu.Item
									leftSection={colorScheme === 'dark' ? <MoonStars size={14} /> : <Sun size={14} />}
									onClick={() => toggleColorScheme()}
								>
									{t(`user.theme.${colorScheme}`)}
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
							<a
								className={classes.link}
								onClick={() => {
									signIn('keycloak');
								}}
							>
								{t('auth.signin')}
							</a>
							<Button
								style={{ fontWeight: '500', paddingLeft: '12px', paddingRight: '12px', height: '32px' }}
								onClick={() => router.push('/getstarted')}
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
		</AppShellHeader>
	);
};

interface LogoHeaderProps {
	backgroundImage: string;
	icon: string;
	name: string;
	socials?: { name: string; url: string; icon: string }[];
	builders?: string[];
	showStatus?: boolean;
	userStatus: string;
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
	const blur = useTransform(scrollYProgress, (latest) => `blur(${latest * 20}px)`);
	const bgPosY = useTransform(scrollYProgress, (latest) => `${latest * 20 + 50}%`);
	return (
		<>
			<motion.div
				style={{
					backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					background: `url("${props.backgroundImage}") center center / cover`,
					backgroundPositionY: bgPosY,

					width: '100%',
					height: '50vh',
				}}
			></motion.div>
			<Group
				justify="space-between"
				style={{
					width: '100%',
					backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
					borderBottom: `1px solid ${scheme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
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
								<ActionIcon component="a" href={social.url} target="_blank" key={social.name}>
									{icon}
								</ActionIcon>
							);
						})}
						{props.invite && (
							<ActionIcon component="a" href={props.invite} target="_blank" key={'discord-inv'}>
								<Discord />
							</ActionIcon>
						)}
						{props.builders?.includes('Nudelsuppe_42_#3571') || props.showStatus ? (
							<Badge color="green" size="lg">
								{props.userStatus}
							</Badge>
						) : (
							<Button component="a" href={props.applyHref}>
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
							<Button component="a" href={props.settingsHref} variant="outline">
								{/*TODO: Add Permision check */}
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

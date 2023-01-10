import { Container, Divider, Grid, Group, Stack, useMantineTheme } from '@mantine/core';

import Gallery from '../../../components/Gallery';
import { LogoHeader } from '../../../components/Header';
import { NextPage } from 'next';
import Page from '../../../components/Page';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const element = {
	head: 'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
	name: 'Build The Earth Germany',
	logo: 'https://bte-germany.de/logo.gif',
	short: 'BTE Germany (first element)',
	locations: ['Germany'],
	builders: ['Nachwahl', 'udelsuppe_42_#3571'],
	minecraft: 'bte-germany.de',
	id: 'de',
	userStatus: 'Builder',
	leader: 'abti.fmx#1548',
	members: '1072',
	socials: [
		{ name: 'website', url: 'https://bte-germany.de' },
		{ name: 'youtube', url: 'https://www.youtube.com/c/BuildTheEarthGermany' },
		{ name: 'instagram', url: 'https://www.instagram.com/buildtheearthgermany/' },
		{ name: 'discord', url: 'https://discord.gg/uFK2th7' },
		{ name: 'twitch', url: ' https://www.twitch.tv/bte_germany' },
		{ name: 'tiktok', url: 'https://www.tiktok.com/@btegermany' },
	],
	images: [
		'https://cdn.discordapp.com/attachments/692849007038562434/969997709798953051/unknown.png',
		'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
		'https://cdn.discordapp.com/attachments/692849007038562434/951765328688459776/2022-03-11_09.54.53.png',
		'https://buildtheearth.net/uploads/942a4bbd309c6765cb965ce841d60abd10c067d7.png',
		'https://cdn.discordapp.com/attachments/692849007038562434/951198479869427722/2022-03-09_20.09.21.png',
		'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
		'https://cdn.discordapp.com/attachments/692849007038562434/951198479869427722/2022-03-09_20.09.21.png',
		'https://buildtheearth.net/uploads/942a4bbd309c6765cb965ce841d60abd10c067d7.png',
		'https://cdn.discordapp.com/attachments/692849007038562434/969997709798953051/unknown.png',
		'https://cdn.discordapp.com/attachments/692849007038562434/951198479869427722/2022-03-09_20.09.21.png',
		'https://buildtheearth.net/uploads/942a4bbd309c6765cb965ce841d60abd10c067d7.png',
		'https://buildtheearth.net/uploads/942a4bbd309c6765cb965ce841d60abd10c067d7.png',
	],
};

const Team: NextPage = () => {
	const matches = useMediaQuery('(min-width: 900px)');
	const router = useRouter();
	const team = router.query.team;
	const theme = useMantineTheme();
	return (
		<Page fullWidth>
			<LogoHeader {...element} applyHref={`${team}/apply`} />
			<Container
				size="xl"
				style={{
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#ffffff',
					boxShadow: 'none',
					marginBottom: theme.spacing.xl * 2,
					padding: !matches ? `${theme.spacing.xs * 3}px` : `${theme.spacing.xl * 3}px`,
					paddingBottom: !matches ? `${theme.spacing.xs * 1.5}px` : `${theme.spacing.xl * 1.5}px`,
					paddingTop: !matches ? `${theme.spacing.xs * 1}px` : `${theme.spacing.xl * 1}px`,
					flex: 1,
					width: '100%',
					position: 'relative',
				}}
			>
				<Grid>
					<Grid.Col span={8}>
						<h2>Overview</h2>
						<p>We are building Germany 1:1 in Minecraft!</p>
					</Grid.Col>
					<Grid.Col span={4}>
						<h2>Details</h2>
						<Stack>
							<Group position="apart">
								<p>Server IP</p>
								<p>{element.minecraft}</p>
							</Group>
							<Divider style={{ margin: '0' }} my="sm" />

							<Group position="apart">
								<p>Members</p>
								<p>{element.members}</p>
							</Group>
							<Divider style={{ margin: '0' }} my="sm" />

							<Group position="apart">
								<p>Leader</p>
								<p>{element.leader}</p>
							</Group>
						</Stack>
					</Grid.Col>
				</Grid>
				<Group position="apart">
					<h2>Images</h2>
					<Gallery
						style={{ height: '80vh' }}
						images={[
							{
								src: 'https://cdn.discordapp.com/attachments/692849007038562434/969997709798953051/unknown.png',
							},
							{
								src: 'https://cdn.discordapp.com/attachments/692849007038562434/964097226341244988/4final2k_1.png',
							},
							{
								src: 'https://cdn.discordapp.com/attachments/692849007038562434/951765328688459776/2022-03-11_09.54.53.png',
							},
							{
								src: 'https://buildtheearth.net/uploads/942a4bbd309c6765cb965ce841d60abd10c067d7.png',
							},
						]}
					/>
				</Group>
			</Container>
		</Page>
	);
};

export default Team;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}
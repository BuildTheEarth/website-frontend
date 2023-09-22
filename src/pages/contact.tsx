/* eslint-disable no-undef */

import { At, ExternalLink } from 'tabler-icons-react';
import { Avatar, Button, Grid, Group, Text, ThemeIcon, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import {
	Discord,
	Facebook,
	Instagram,
	Snapchat,
	Tiktok,
	Twitch,
	Twitter,
	Youtube,
} from '@icons-pack/react-simple-icons';

import { NextPage } from 'next';
import Page from '../components/Page';
import fetcher from '../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Contact: NextPage = ({ data }: any) => {
	const router = useRouter();
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();

	return (
		<Page
			head={{
				title: 'Contact',
				image: '/images/placeholder.webp',
				large: true,
			}}
			description="Get in touch with BuildTheEarth Staff Members"
		>
			<h3 style={{ textAlign: 'center', fontSize: '30px', lineHeight: '0' }}>Individual People</h3>
			<Grid mt="md">
				{data?.map((contact: any) => (
					<Grid.Col key={contact.id} span={{ sp: 6 }}>
						<Group wrap="nowrap">
							<Avatar src={contact.avatar} size={94} style={{ filter: 'invert(0)' }} />
							<div>
								<Text size="xs" style={{ textTransform: 'uppercase' }} fw={700} c="dimmed">
									{contact.role}
								</Text>
								<Text size="lg" fw={500}>
									{contact.name}
								</Text>

								<Group wrap="nowrap" gap={10} mt={3}>
									<Discord width={18} size={16} />
									<Text size="xs" c="dimmed">
										{contact.discord}
									</Text>
								</Group>

								<Group wrap="nowrap" gap={10} mt={5}>
									<At size={16} />
									<Text
										size="xs"
										c="dimmed"
										style={{ cursor: 'pointer' }}
										onClick={() => window.open(`mailto:${contact.mail}`, '_blank')}
									>
										{contact.email}
									</Text>
								</Group>
							</div>
						</Group>
					</Grid.Col>
				))}
			</Grid>
			<h3 style={{ textAlign: 'center', fontSize: '30px', lineHeight: '48px' }}>Social Media</h3>
			<div
				style={{ marginBottom: 'calc(var(--mantine-spacing-xl)*2)', display: 'flex', gap: '15px', flexWrap: 'wrap' }}
			>
				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://www.facebook.com/BuildTheEarth/', '_blank')}
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
						cursor: 'pointer',
					}}
				>
					<Facebook />
				</ThemeIcon>

				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://www.instagram.com/buildtheearth_', '_blank')}
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
						cursor: 'pointer',
					}}
				>
					<Instagram />
				</ThemeIcon>

				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://www.tiktok.com/@buildtheearth', '_blank')}
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
						cursor: 'pointer',
					}}
				>
					<Tiktok />
				</ThemeIcon>

				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://buildtheearth.net/discord', '_blank')}
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
						cursor: 'pointer',
					}}
				>
					<Discord />
				</ThemeIcon>

				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://www.snapchat.com/add/buildtheearth', '_blank')}
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
						cursor: 'pointer',
					}}
				>
					<Snapchat />
				</ThemeIcon>

				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://www.youtube.com/c/BuildTheEarth', '_blank')}
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
						cursor: 'pointer',
					}}
				>
					<Youtube />
				</ThemeIcon>

				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://twitter.com/buildtheearth_', '_blank')}
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
						cursor: 'pointer',
					}}
				>
					<Twitter />
				</ThemeIcon>

				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://www.twitch.tv/buildtheearth', '_blank')}
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
						cursor: 'pointer',
					}}
				>
					<Twitch />
				</ThemeIcon>
			</div>
			<div>
				<div style={{ marginBottom: theme.spacing.xs }}>
					<Button variant="outline" leftSection={<ExternalLink />} onClick={() => router.push('/privacy')}>
						Privacy Policy
					</Button>
				</div>
				<div>
					<Button variant="outline" leftSection={<ExternalLink />} onClick={() => router.push('/ban')}>
						Ban Appeals
					</Button>
				</div>
			</div>
		</Page>
	);
};

export default Contact;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/contacts');

	return { props: { data: res, ...(await serverSideTranslations(locale, ['common'])) } };
}

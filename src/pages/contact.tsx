/* eslint-disable no-undef */

import {
	Discord,
	Facebook,
	Instagram,
	Tiktok,
	Twitch,
	Twitter,
	Youtube,
} from '@icons-pack/react-simple-icons';
import {
	Button,
	Divider,
	Grid,
	Group,
	Text,
	ThemeIcon,
	Title,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';

import Page from '@/components/Page';
import thumbnail from '@/public/images/thumbnails/contact.png';
import fetcher from '@/utils/Fetcher';
import { IconMail } from '@tabler/icons-react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { At } from 'tabler-icons-react';

const Contact: NextPage = ({ data }: any) => {
	const router = useRouter();
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();

	return (
		<Page
			head={{
				title: 'Contact',
				image: thumbnail,
			}}
			description="Get in touch with BuildTheEarth Staff Members"
		>
			<Title order={2}>Administration</Title>
			<Grid mt="md" maw={'100%'} w={'75%'}>
				{data
					?.sort((a: any, b: any) => a.email.localeCompare(b.email))
					.map((contact: any) => (
						<Grid.Col key={contact.id} span={{ sm: 6 }}>
							<Text size="xs" style={{ textTransform: 'uppercase' }} fw={700} c="dimmed">
								{contact.role}
							</Text>
							<Text size="lg" fw={500}>
								{contact.name}
							</Text>

							<Group wrap="nowrap" gap={10} mt={3} justify="flex-start">
								<Discord width={18} size={16} />
								<Text size="xs" c="dimmed">
									{contact.discord}
								</Text>
							</Group>

							<Group wrap="nowrap" gap={10} mt={5} justify="flex-start">
								<At size={16} />
								<Text
									size="xs"
									c="cyan.4"
									style={{ cursor: 'pointer' }}
									onClick={() => window.open(`mailto:${contact.mail}`, '_blank')}
								>
									{contact.email}
								</Text>
							</Group>
							<Divider mt="md" />
						</Grid.Col>
					))}
			</Grid>
			<Title order={2} mt="md">
				Social Media
			</Title>
			<Group mt="lg">
				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('http://go.buildtheearth.net/dc', '_blank')}
					style={{
						cursor: 'pointer',
					}}
				>
					<Discord />
				</ThemeIcon>

				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://www.youtube.com/c/BuildTheEarth', '_blank')}
					style={{
						cursor: 'pointer',
					}}
				>
					<Youtube />
				</ThemeIcon>
				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://www.instagram.com/buildtheearth_', '_blank')}
					style={{
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
						cursor: 'pointer',
					}}
				>
					<Tiktok />
				</ThemeIcon>
				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://twitter.com/buildtheearth_', '_blank')}
					style={{
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
						cursor: 'pointer',
					}}
				>
					<Twitch />
				</ThemeIcon>
				<ThemeIcon
					variant="outline"
					radius="xl"
					size="xl"
					onClick={() => window.open('https://www.facebook.com/BuildTheEarth/', '_blank')}
					style={{
						cursor: 'pointer',
					}}
				>
					<Facebook />
				</ThemeIcon>
			</Group>
			<Title order={2} mt="lg">
				Ban Appeals
			</Title>
			<p>
				If you wish to appeal your ban on the Discord server, please send an email to
				appeals@buildtheearth.net.
			</p>
			<p>
				In order to submit a ban appeal, you must include your Discord tag and user ID, screenshot
				of your ban message and your reason for appealing. Illegitimate appeals will be ignored.
			</p>
			<Button
				component={Link}
				variant="outline"
				leftSection={<IconMail />}
				href="mailto:appeals@buildtheearth.net"
			>
				Send an Email
			</Button>
		</Page>
	);
};

export default Contact;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/contacts');

	return {
		props: { data: res, ...(await serverSideTranslations(locale, ['common'])) },
		revalidate: 60 * 60 * 24, // Every day
	};
}

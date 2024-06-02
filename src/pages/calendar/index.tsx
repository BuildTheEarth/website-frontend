import {
	Badge,
	Button,
	Card,
	CardSection,
	Grid,
	GridCol,
	Group,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';

import Page from '@/components/Page';
import { usePermissions } from '@/hooks/usePermissions';
import thumbnail from '@/public/images/thumbnails/faq.png';
import logo from '@/public/logo.gif';
import fetcher from '@/utils/Fetcher';
import { IconPlus } from '@tabler/icons-react';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

var vagueTime = require('vague-time');
const Calendar: NextPage = ({ data }: any) => {
	// const user = useUser();
	const permissions = usePermissions();
	const router = useRouter();
	const today = new Date();
	const ongoingEvents = data.filter((event: any) => {
		const start = new Date(event.start);
		const end = new Date(event.end);
		return today.getTime() >= start.getTime() && today.getTime() <= end.getTime();
	});
	const upcomingEvents = data.filter((event: any) => {
		const start = new Date(event.start);
		return today.getTime() < start.getTime();
	});
	const pastEvents = data.filter((event: any) => {
		const end = new Date(event.end);
		return today.getTime() > end.getTime();
	});

	return (
		<Page
			head={{
				title: 'Event Calendar',
				image: thumbnail,
			}}
			title="Calendar"
			noBg
		>
			<Title order={2} mb="lg" mt="xl">
				Ongoing Events
			</Title>
			<Grid gutter={'xl'}>
				{ongoingEvents.map((e: any) => (
					<GridCol key={e.id} span={4}>
						<EventList {...e} ongoing />
					</GridCol>
				))}
			</Grid>
			{upcomingEvents.length > 0 && (
				<>
					<Title order={2} my="xl">
						Upcoming Events
					</Title>
					<Grid gutter={'xl'}>
						{upcomingEvents.slice(0, 6).map((e: any) => (
							<GridCol key={e.id} span={4}>
								<EventList {...e} upcoming />
							</GridCol>
						))}
					</Grid>
				</>
			)}
			<Title order={2} mb="lg" mt="xl">
				Past Events
			</Title>
			<Grid gutter={'xl'}>
				{pastEvents.slice(0, 3).map((e: any) => (
					<GridCol key={e.id} span={4}>
						<EventList {...e} past />
					</GridCol>
				))}
			</Grid>
			{permissions.has('calendar.manage', 'ää') && (
				<Button
					leftSection={<IconPlus />}
					onClick={() => router.push('calendar/manage')}
					mt="xl"
					w="20%"
				>
					Add Event
				</Button>
			)}
		</Page>
	);
};

export default Calendar;

export function EventList(props: any) {
	const today = new Date();
	const start = new Date(props.start);
	const end = new Date(props.end);
	const daysToStart = Math.floor((start.getTime() - today.getTime()) / (1000 * 3600 * 24));
	const daysToEnd = Math.floor((end.getTime() - today.getTime()) / (1000 * 3600 * 24));

	const badgeMsg = props.ongoing
		? daysToEnd + 2 + ' days left'
		: props.upcoming
			? `in ${daysToStart} days`
			: (daysToEnd + 1) * -1 + ' days ago';

	return (
		<Card
			padding="lg"
			radius={0}
			w="100%"
			h="100%"
			style={{ boxShadow: 'var(--mantine-shadow-block)' }}
		>
			<Group justify="space-between">
				<Tooltip label={props.buildTeam.name}>
					<Image
						src={props.buildTeam.icon || logo}
						width={64}
						height={64}
						alt="Team Logo"
						style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}
					/>
				</Tooltip>
				<Badge color={props.ongoing ? 'green' : props.upcoming ? 'teal' : 'orange'}>
					{badgeMsg}
				</Badge>
			</Group>

			<Text fz="lg" fw={500} mt="md">
				{props.name}
			</Text>
			<Text fz="sm" c="dimmed" mt={5} lineClamp={3}>
				{props.description}
			</Text>
			<CardSection withBorder inheritPadding py="md" mt="xs">
				{(props.city || props.country) && (
					<Text c="dimmed" fz="sm">
						Location:{' '}
						<Text span c="var(--mantine-color-text)">
							{props.city + (props.country ? ', ' + props.country : '')}
						</Text>
					</Text>
				)}

				{(props.ongoing || props.past) && (
					<Text c="dimmed" fz="sm">
						Ends:{' '}
						<Text span c="var(--mantine-color-text)">
							{end.toLocaleDateString()}
						</Text>
					</Text>
				)}
				{(props.upcoming || props.past) && (
					<Text c="dimmed" fz="sm">
						Starts:{' '}
						<Text span c="var(--mantine-color-text)">
							{start.toLocaleDateString()}
						</Text>
					</Text>
				)}
			</CardSection>
			{props.discordLink && (
				<CardSection withBorder inheritPadding pb="md" pt="xs" mt="xs">
					<Button component={Link} href={props.discordLink} target="_blank" fullWidth>
						Read more
					</Button>
				</CardSection>
			)}
		</Card>
	);
}

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/calendar');
	return { props: { data: res, ...(await serverSideTranslations(locale, ['common'])) } };
}

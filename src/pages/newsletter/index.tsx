/* eslint-disable no-undef */

import { At, Calendar, ExternalLink, Number } from 'tabler-icons-react';
import {
	Avatar,
	Box,
	Button,
	Center,
	Grid,
	Group,
	Pagination,
	Text,
	ThemeIcon,
	createStyles,
	useMantineTheme,
} from '@mantine/core';
import React, { useState } from 'react';

import { NextPage } from 'next';
import Page from '../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';

const useStyles = createStyles((theme) => ({
	icon: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
	},

	name: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
}));
const NewsletterList: NextPage = () => {
	const router = useRouter();
	const theme = useMantineTheme();
	const { classes } = useStyles();
	const { t } = useTranslation('newsletter');
	const [activePage, setPage] = useState(1);
	const { data } = useSWR(`/newsletter?page=${activePage - 1}`);

	return (
		<Page
			head={{
				title: 'Newsletter',
				image: '/images/placeholder.webp',
				large: true,
			}}
		>
			<p>for here</p>
			<Group px="auto" mt="xl">
				{data?.data.map((newsletter: any, i: number) => (
					<Group
						noWrap
						sx={{
							backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
							borderRadius: theme.radius.xs,
							'&:hover': {
								backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
							},
							width: '100%',
						}}
						key={`i-${i}`}
						p="md"
						onClick={() => router.push(`/newsletter/${newsletter.issue}`)}
					>
						<Avatar src={newsletter.links[0]} size={94} radius="md" />
						<div>
							<Group position="apart">
								<Text size="lg" weight={500} className={classes.name}>
									{newsletter.title}
								</Text>
							</Group>

							<Group noWrap spacing={10} mt={3}>
								<Number size={16} className={classes.icon} />
								<Text size="xs" color="dimmed">
									Issue {newsletter.issue}
								</Text>
							</Group>

							<Group noWrap spacing={10} mt={5}>
								<Calendar size={16} className={classes.icon} />
								<Text size="xs" color="dimmed">
									{new Date(newsletter.published_date).toLocaleDateString()}
								</Text>
							</Group>
						</div>
					</Group>
				))}
			</Group>
			<Group position="center" pt="md">
				<Pagination total={data?.pages || 1} radius="xs" page={activePage} onChange={setPage} siblings={1} />
			</Group>
		</Page>
	);
};

export default NewsletterList;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
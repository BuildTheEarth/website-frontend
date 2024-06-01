/* eslint-disable no-undef */

import {
	Avatar,
	Group,
	Pagination,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { Calendar, Number } from 'tabler-icons-react';

import Page from '@/components/Page';
import thumbnail from '@/public/images/thumbnails/newsletter.png';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

const NewsletterList: NextPage = () => {
	const router = useRouter();
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { t } = useTranslation('newsletter');
	const [activePage, setPage] = useState(1);
	const { data } = useSWR(`/newsletter?page=${activePage - 1}`);

	return (
		<Page
			head={{
				title: t('head.title'),
				image: thumbnail,
			}}
			description="The BuildTheEarth Newsletter is a monthly set of articles showcasing teams, builders, and miscellaneous topics
				throughout the project"
		>
			<p>{t('description')}</p>
			<Group px="auto" mt="xl">
				{data?.data.map((newsletter: any, i: number) => (
					<Group
						wrap="nowrap"
						style={{
							backgroundColor:
								scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
							borderRadius: theme.radius.xs,
							// TODO
							// '&:hover': {
							// 	backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
							// },
							width: '100%',
						}}
						key={`i-${i}`}
						p="md"
						onClick={() => router.push(`/newsletter/${newsletter.issue}`)}
					>
						<Avatar src={newsletter.links[0]} size={94} radius="md" />
						<div>
							<Group justify="space-between">
								<Text size="lg" fw={500}>
									{newsletter.title}
								</Text>
							</Group>

							<Group wrap="nowrap" gap={10} mt={3}>
								<Number size={16} />
								<Text size="xs" c="dimmed">
									{t('issue', { num: newsletter.issue })}
								</Text>
							</Group>

							<Group wrap="nowrap" gap={10} mt={5}>
								<Calendar size={16} />
								<Text size="xs" c="dimmed">
									{new Date(newsletter.published_date).toLocaleDateString()}
								</Text>
							</Group>
						</div>
					</Group>
				))}
			</Group>
			<Group justify="center" pt="md">
				<Pagination
					total={data?.pages || 1}
					radius="xs"
					value={activePage}
					onChange={setPage}
					siblings={1}
				/>
			</Group>
		</Page>
	);
};

export default NewsletterList;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', `newsletter`])),
		},
	};
}

/* eslint-disable no-undef */

import { At, ExternalLink } from 'tabler-icons-react';
import { Avatar, Box, Button, Center, Grid, Group, Pagination, Text, ThemeIcon, useMantineTheme } from '@mantine/core';

import { NextPage } from 'next';
import Page from '../../components/Page';
import React, { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';

const NewsletterList: NextPage = () => {
	const router = useRouter();
	const theme = useMantineTheme();
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
			<Group px="auto"  >
				{
					data?.data.map((newsletter: any) => (
						<Box key={newsletter.id} p="1rem" px="auto" style={{width: "100%"}}>
							<Grid>
									<Grid.Col span={10}>
										<Text size="xl">{new Date(newsletter?.published_date).toLocaleString("default", {month: "long", year: "numeric"})}</Text>
										<Text size="sm">{newsletter?.title}</Text>
									</Grid.Col>
									<Grid.Col span={2}>
										<Button
											variant="outline"
											color="blue"
											size="sm"
											onClick={() => router.push(`/newsletter/${newsletter?.issue}`)}
											style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
										>
											<ExternalLink size={18} />
										</Button>
									</Grid.Col>
							</Grid>
						</Box>
					))
				}
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
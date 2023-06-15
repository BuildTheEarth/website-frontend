/* eslint-disable no-undef */

import { ArrowNarrowLeft, At, ExternalLink } from 'tabler-icons-react';
import { Avatar, Button, Center, Grid, Group, Pagination, Text, ThemeIcon, useMantineTheme, Image } from '@mantine/core';

import { NextPage } from 'next';
import Page from '../../../components/Page';
import React, { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Newsletter: NextPage = () => {
	const router = useRouter();
	const theme = useMantineTheme();
	const [activePage, setPage] = useState(1);
    const newsletter = router.query.newsletter;
    const { data } = useSWR(`/newsletter/${newsletter}?isIssue=true`);
	console.log(data);

	return (
		<Page
			head={{
				title: data.title,
				image: '/images/placeholder.webp',
				large: true,
			}}
		>
			<div style={{paddingLeft: "auto", paddingRight: "auto"}}>
				{
					data?.links.map((link: any) => (
						<div key={link.id} style={{padding: "1rem", marginLeft: "auto"}}>
							<Image src={link} alt={data.title} width={"100%"} />
						</div>
					))
					
				}

			</div>
			<Group position="center" pt="md" style={{padding: "1rem"}}>
				<Button variant="outline" color="blue" size="sm" onClick={() => router.push(`/newsletter`)}>
					<ArrowNarrowLeft size={18} />
				</Button>
			</Group>
		</Page>
	);
};

export default Newsletter;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'newsletter'])),
		},
	};
}
export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}
/* eslint-disable no-undef */

import { ArrowNarrowLeft } from 'tabler-icons-react';
import { Group, useMantineTheme, Image, ActionIcon } from '@mantine/core';

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
				title: data?.title,
				image: data?.links[0] || '/images/placeholder.webp',
				large: true,
			}}
		>
			<Group position="center" pt="md" style={{padding: "1rem"}}>
			<ActionIcon color="blue" size="xl" variant="outline" onClick={() => router.push(`/newsletter`)}>
					<ArrowNarrowLeft size={18} />
			</ActionIcon>
			</Group>
			<Group style={{width: "100%"}}>
				{
					data?.links.map((link: any) => (
						<Group key={link.id} p="1rem" style={{width: "100%"}}>
							<Image src={link} alt={data.title} />
						</Group>
					))
					
				}

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
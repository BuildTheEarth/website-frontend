/* eslint-disable no-undef */

import { ActionIcon, Group, Image, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';

import { ArrowNarrowLeft } from 'tabler-icons-react';
import { NextPage } from 'next';
import Page from '../../../components/Page';
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
				subtitle: `Issue ${data?.issue}, ${new Date(data?.published_date).toLocaleDateString()}`,
			}}
		>
			<Group style={{ width: '100%' }}>
				{data?.links.slice(1).map((link: any) => (
					<Group key={link.id} py="1rem" style={{ width: '100%' }}>
						<Image src={link} alt={data.title} />
					</Group>
				))}
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
/* eslint-disable no-undef */

import { Group, Image } from '@mantine/core';

import Page from '@/components/Page';
import thumbnail from '@/public/images/thumbnails/newsletter.png';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Newsletter: NextPage = () => {
	const router = useRouter();
	const newsletter = router.query.newsletter;
	const { data } = useSWR(`/newsletter/${newsletter}?isIssue=true`);

	return (
		<Page
			head={{
				title: data?.title,
				image: data?.links[0] || thumbnail,
				subtitle: `Issue ${data?.issue}, ${new Date(data?.published_date).toLocaleDateString()}`,
			}}
			description={`BuildTheEarth Newsletter Issue ${data?.issue}, ${new Date(
				data?.published_date,
			).toLocaleDateString()}`}
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

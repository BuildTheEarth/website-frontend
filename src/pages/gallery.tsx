import { Box, Container, Group, Pagination } from '@mantine/core';

import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import GalleryGrid from '../components/GalleryGrid';
import Page from '../components/Page';
import fetcher from '../utils/Fetcher';

const MePage: NextPage = ({ data }: any) => {
	const [activePage, setPage] = useState(1);
	return (
		<Page
			head={{
				title: 'Gallery',
				image: `https://cdn.buildtheearth.net/upload/${data[0].image?.name}`,
			}}
			loading={!data}
			fullWidth
		>
			<Box m="xl">
				<Container size="xl">
					<GalleryGrid
						gap={0}
						images={
							data
								?.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
								.slice(activePage * 4 - 4, activePage * 4)
								.map((d: any) => ({
									name: d?.title,
									src: `https://cdn.buildtheearth.net/upload/${d?.image?.name}`,
									date: d?.createdAt,
									team: {
										name: d?.buildTeam.name,
										slug: d?.buildTeam.slug,
										logo: d?.buildTeam.icon,
									},
									href: `/teams/${d?.buildTeam.slug}`,
								})) || [{}]
						}
						showTooltipOnHover={true}
					/>
				</Container>
				<Group justify="center" pt="md">
					<Pagination
						my="md"
						total={Math.floor(data.length / 4)}
						radius="xs"
						value={activePage}
						onChange={setPage}
						siblings={1}
					/>
				</Group>
			</Box>
		</Page>
	);
};

export default MePage;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/showcases');
	return {
		props: {
			data: res,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

import { Box, Container } from '@mantine/core';

import GalleryGrid from '../components/GalleryGrid';
import { NextPage } from 'next';
import Page from '../components/Page';
import fetcher from '../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MePage: NextPage = ({ data }: any) => {
	return (
		<Page
			head={{
				title: 'Gallery',
				image: `https://cdn.buildtheearth.net/upload/${data[0].image?.name}`,
			}}
			loading={!data}
			fullWidth
		>
			<Box my="xl">
				<Container my="xl" size={'xl'}>
					<GalleryGrid
						gap={'xl'}
						images={
							data?.slice(0, 10).map((d: any) => ({
								name: d?.title,
								src: `https://cdn.buildtheearth.net/upload/${d?.image?.name}`,
								date: d?.createdAt,
								team: { name: d?.buildTeam.name, slug: d?.buildTeam.slug, logo: d?.buildTeam.icon },
								href: `/teams/${d?.buildTeam.slug}`,
							})) || [{}]
						}
					/>
				</Container>
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

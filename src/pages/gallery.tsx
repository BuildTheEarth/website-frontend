import { Box, Container, Group, Image, Modal, Pagination } from '@mantine/core';
import GalleryGrid, { GalleryGridImage } from '../components/GalleryGrid';

import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GalleryImage } from '../components/Gallery';
import Page from '../components/Page';
import fetcher from '../utils/Fetcher';

const MePage: NextPage = ({ data }: any) => {
	const [activePage, setPage] = useState(1);
	const [focus, setFocus] = useState<null | string>(null);
	const router = useRouter();

	const FocusImage = ({ id }: { id: string }) => {
		const img = data?.find((d: any) => d.image.name == id);
		console.log(img);
		return (
			<Modal
				opened={img != null}
				onClose={() => setFocus(null)}
				withCloseButton={false}
				styles={{
					body: { padding: 0, overflow: 'hidden', aspectRatio: '16:9', background: 'none' },
				}}
				centered
				size="75vw"
				transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
			>
				<GalleryGridImage
					src={`https://cdn.buildtheearth.net/upload/${id}`}
					showTooltipOnHover={false}
					name={img?.title}
					team={{
						name: img?.buildTeam.name,
						slug: img?.buildTeam.slug,
						logo: img?.buildTeam.icon,
					}}
					date={img?.createdAt}
					noAnimation
				/>
			</Modal>
		);
	};

	return (
		<Page
			head={{
				title: 'Gallery',
				image: `https://cdn.buildtheearth.net/upload/${data[0].image?.name}`,
			}}
			loading={!data}
			fullWidth
		>
			{focus && <FocusImage id={focus} />}
			<Box m="xl">
				<Container size="xl">
					<GalleryGrid
						gap={0}
						images={
							data
								?.sort(
									(a: any, b: any) =>
										new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
								)
								.slice(activePage * 100 - 100, activePage * 100)
								.map((d: any) => ({
									name: d?.title,
									src: `https://cdn.buildtheearth.net/upload/${d?.image?.name}`,
									date: d?.createdAt,
									team: {
										name: d?.buildTeam.name,
										slug: d?.buildTeam.slug,
										logo: d?.buildTeam.icon,
									},
									onClick: () => setFocus(d?.image?.name),
								})) || [{}]
						}
						showTooltipOnHover={true}
					/>
				</Container>
				<Group justify="center" pt="md">
					<Pagination
						my="md"
						total={Math.floor(data.length / 100)}
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
		revalidate: 60 * 60 * 12, // Every 12 hours
	};
}

import GalleryGrid, { GalleryGridImage } from '@/components/GalleryGrid';
import { Box, Container, Group, Modal, Pagination } from '@mantine/core';

import Page from '@/components/Page';
import fetcher from '@/utils/Fetcher';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MePage: NextPage = ({ data }: any) => {
	const [activePage, setPage] = useState(1);
	const [focus, setFocus] = useState<null | string>(null);
	const router = useRouter();
	const { t } = useTranslation('common');

	const FocusImage = ({ id }: { id: string }) => {
		const img = data?.find((d: any) => d.image.name == id);
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
					src={`https://cdn.buildtheearth.net/uploads/${id}`}
					showTooltipOnHover={false}
					name={img?.title}
					team={{
						name: img?.buildTeam.name,
						slug: img?.buildTeam.slug,
						logo: img?.buildTeam.icon,
					}}
					date={img?.createdAt}
					noAnimation
					hash={
						img?.hash ||
						"'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj0NE3+g8AAqUBjTCztj4AAAAASUVORK5CYII='"
					}
				/>
			</Modal>
		);
	};

	return (
		<Page
			head={{
				title: t('links.gallery'),
				image: `https://cdn.buildtheearth.net/uploads/${data[0].image?.name}`,
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
								.slice(activePage * 20 - 20, activePage * 20)
								.map((d: any) => ({
									name: d?.title + (d?.city ? ', ' + d.city : ''),
									src: `https://cdn.buildtheearth.net/uploads/${d?.image?.name}`,
									date: d?.createdAt,
									team: {
										name: d?.buildTeam.name,
										slug: d?.buildTeam.slug,
										logo: d?.buildTeam.icon,
									},
									hash:
										d?.image?.hash ||
										'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj0NE3+g8AAqUBjTCztj4AAAAASUVORK5CYII=',
									onClick: () => setFocus(d?.image?.name),
								})) || [{}]
						}
						showTooltipOnHover={true}
					/>
				</Container>
				<Group justify="center" pt="md">
					<Pagination
						my="md"
						total={Math.ceil(data.length / 20)}
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
		revalidate: 60 * 60, // Every hour
	};
}

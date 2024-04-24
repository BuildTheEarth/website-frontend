import GalleryGrid, { GalleryGridImage } from '@/components/GalleryGrid';
import { Divider, Grid, Group, Modal, Pagination, Stack } from '@mantine/core';

import { LogoPage } from '@/components/Page';
import { useIsClient } from '@/hooks/useIsClient';
import fetcher from '@/utils/Fetcher';
import getCountryName from '@/utils/ISOCountries';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import sanitizeHtml from 'sanitize-html';

const Team: NextPage = ({ data, data2 }: any) => {
	const router = useRouter();
	const [focus, setFocus] = useState<null | string>(null);
	const [showcasePage, setShowcasePage] = useState(1);
	const { t } = useTranslation('teams');
	const isClient = useIsClient();
	const team = router.query.team;

	const FocusImage = ({ id }: { id: string }) => {
		const img = data2?.find((d: any) => d.image.name == id);
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
					date={img?.createdAt}
					noAnimation
				/>
			</Modal>
		);
	};

	return (
		<LogoPage
			fullWidth
			title={data?.name}
			description={data?.about}
			headData={data}
			team={team?.toString() || ''}
			seo={{
				openGraph: {
					images: [
						{
							url: data?.backgroundImage,
							width: 1920,
							height: 1080,
							alt: data?.team,
						},
					],
				},
			}}
		>
			<Grid>
				<Grid.Col span={8}>
					<h2>{t('team.overview')}</h2>
					<p dangerouslySetInnerHTML={{ __html: isClient ? sanitizeHtml(data?.about) : '' }} />
				</Grid.Col>
				<Grid.Col span={4}>
					<h2>{t('team.details')}</h2>
					<Stack gap={0}>
						<Divider style={{ margin: '0' }} my="sm" />
						<Group justify="space-between">
							<p>Minecraft IP</p>
							<p>{data?.ip}</p>
						</Group>
						<Divider style={{ margin: '0' }} my="sm" />
						<Group justify="space-between">
							<p>Minecraft Version</p>
							<p>{data?.version}</p>
						</Group>
						<Divider style={{ margin: '0' }} my="sm" />
						<Group justify="space-between">
							<p>{t('team.location')}</p>
							<p>
								{data?.location
									.split(', ')
									.map((e: string) => getCountryName(e))
									.join(', ')}
							</p>
						</Group>
						<Divider style={{ margin: '0' }} my="sm" />

						<Group justify="space-between">
							<p>{t('team.members')}</p>
							<p>{data?._count?.members}</p>
						</Group>
						<Divider style={{ margin: '0' }} my="sm" />
					</Stack>
				</Grid.Col>
			</Grid>
			<h2>{t('team.images')}</h2>

			{focus && <FocusImage id={focus} />}
			<GalleryGrid
				images={
					data2
						?.sort(
							(a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
						)
						?.slice(showcasePage * 10 - 10, showcasePage * 10)
						.map((d: any) => ({
							name: d?.title,
							src: `https://cdn.buildtheearth.net/uploads/${d?.image?.name}`,
							date: d?.createdAt,
							onClick: () => setFocus(d?.image?.name),
						})) || [{}]
				}
			/>
			<Group justify="center" w="100%" mt="md">
				<Pagination
					total={Math.ceil(data2?.length / 10)}
					value={showcasePage}
					onChange={setShowcasePage}
				/>
			</Group>
		</LogoPage>
	);
};

export default Team;

export async function getStaticProps({ locale, params }: any) {
	if (
		!isNaN(params.team as any) ||
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(params.team)
	) {
		return {
			redirect: {
				destination: '/teams',
				permanent: true,
			},
		};
	}

	const res = await fetcher(`/buildteams/${params.team}?slug=true`);
	const res2 = await fetcher(`/buildteams/${params.team}/showcases?slug=true`);
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
			data: res,
			data2: res2,
		},
		revalidate: 60 * 20, // Every 20 minutes,
	};
}
export async function getStaticPaths() {
	const res = await fetcher('/buildteams');
	return {
		paths: res.map((team: any) => ({
			params: {
				team: team.slug,
			},
		})),
		fallback: true,
	};
}

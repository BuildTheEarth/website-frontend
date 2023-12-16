import { Divider, Grid, Group, Stack } from '@mantine/core';

import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import sanitizeHtml from 'sanitize-html';
import GalleryGrid from '../../../components/GalleryGrid';
import { LogoPage } from '../../../components/Page';
import { useIsClient } from '../../../hooks/useIsClient';
import fetcher from '../../../utils/Fetcher';
import getCountryName from '../../../utils/ISOCountries';

const Team: NextPage = ({ data, data2 }: any) => {
	const router = useRouter();
	const { t } = useTranslation('teams');
	const isClient = useIsClient();
	const team = router.query.team;

	return (
		<LogoPage
			fullWidth
			title={data?.name}
			description={data?.about}
			headData={data}
			team={team?.toString() || ''}
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

						<Group justify="space-between">
							<p>{t('team.builds')}</p>
							<p>{data?._count?.builds}</p>
						</Group>
					</Stack>
				</Grid.Col>
			</Grid>
			<h2>{t('team.images')}</h2>
			<GalleryGrid
				images={
					data2?.slice(0, 10).map((d: any) => ({
						name: d?.title,
						src: `https://cdn.buildtheearth.net/upload/${d?.image?.name}`,
						date: d?.createdAt,
					})) || [{}]
				}
			/>
		</LogoPage>
	);
};

export default Team;

export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/buildteams/${params.team}?builds=true&members=true&slug=true`);
	const res2 = await fetcher(`/buildteams/${params.team}/showcases?slug=true`);
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
			data: res,
			data2: res2,
		},
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

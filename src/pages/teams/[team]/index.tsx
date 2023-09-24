import { Divider, Grid, Group, Stack } from '@mantine/core';

import Gallery from '../../../components/Gallery';
import { LogoPage } from '../../../components/Page';
import { NextPage } from 'next';
import fetcher from '../../../utils/Fetcher';
import sanitizeHtml from 'sanitize-html';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Team: NextPage = ({ data }: any) => {
	const router = useRouter();
	const { t } = useTranslation('teams');
	const team = router.query.team;

	return (
		<LogoPage fullWidth title={data?.name} description={data?.about} headData={data} team={team?.toString() || ''}>
			<Grid>
				<Grid.Col span={8}>
					<h2>{t('team.overview')}</h2>
					<p dangerouslySetInnerHTML={{ __html: sanitizeHtml(data?.about) }} />
				</Grid.Col>
				<Grid.Col span={4}>
					<h2>{t('team.details')}</h2>
					<Stack gap={0}>
						<Divider style={{ margin: '0' }} my="sm" />
						<Group justify="space-between">
							<p>{t('team.location')}</p>
							<p>{data?.location}</p>
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
			{data?.showcases && data.showcases.length >= 1 ? (
				<Group>
					<h2>{t('team.images')}</h2>
					<Gallery
						style={{ height: '80vh' }}
						images={
							data?.showcases.map(({ image, title }: any) => ({
								src: image,
								location: title,
							})) || [{}]
						}
					/>
				</Group>
			) : undefined}
		</LogoPage>
	);
};

export default Team;

export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/buildteams/${params.team}?builds=true&showcase=true&members=true`);
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
			data: res,
		},
	};
}
export async function getStaticPaths() {
	const res = await fetcher('/buildteams');
	return {
		paths: res.map((team: any) => ({
			params: {
				team: team.id,
			},
		})),
		fallback: true,
	};
}

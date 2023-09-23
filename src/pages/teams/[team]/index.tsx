import { Container, Divider, Grid, Group, Stack, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import Page, { LogoPage } from '../../../components/Page';

import Gallery from '../../../components/Gallery';
import { LogoHeader } from '../../../components/Header';
import { NextPage } from 'next';
import fetcher from '../../../utils/Fetcher';
import sanitizeHtml from 'sanitize-html';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useScroll } from 'framer-motion';

const Team: NextPage = ({ data }: any) => {
	const router = useRouter();
	const team = router.query.team;
	// const { data } = useSWR(`/buildteams/${team}?builds=true&showcase=true`);
	const matches = useMediaQuery('(min-width: 900px)');
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	return (
		<LogoPage fullWidth title={data?.name} description={data?.about} headData={data} team={team?.toString() || ''}>
			<Grid>
				<Grid.Col span={8}>
					<h2>Overview</h2>
					<p dangerouslySetInnerHTML={{ __html: sanitizeHtml(data?.about) }} />
				</Grid.Col>
				<Grid.Col span={4}>
					<h2>Details</h2>
					<Stack>
						<Group justify="space-between">
							<p>Location</p>
							<p>{data?.location}</p>
						</Group>
						<Divider style={{ margin: '0' }} my="sm" />

						<Group justify="space-between">
							<p>Members</p>
							<p>{data?._count?.members}</p>
						</Group>
						<Divider style={{ margin: '0' }} my="sm" />

						<Group justify="space-between">
							<p>Builds</p>
							<p>{data?._count?.builds}</p>
						</Group>
					</Stack>
				</Grid.Col>
			</Grid>
			{data?.showcases && data.showcases.length >= 1 ? (
				<Group>
					<h2>Images</h2>
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
	const res = await fetcher(`/buildteams/${params.team}?builds=true&showcase=true`);
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

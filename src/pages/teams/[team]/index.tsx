import { Container, Divider, Grid, Group, Stack, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import Gallery from '../../../components/Gallery';
import { LogoHeader } from '../../../components/Header';
import { NextPage } from 'next';
import Page from '../../../components/Page';
import fetcher from '../../../utils/Fetcher';
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
		<Page fullWidth title={data?.name} description={data?.about}>
			<LogoHeader {...data} applyHref={`${team}/apply`} settingsHref={`${team}/manage/settings`} />
			<Container
				size="xl"
				style={{
					backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[7] : '#ffffff',
					boxShadow: 'none',
					marginBottom: 'calc(var(--mantine-spacing-xl)*2)',
					padding: !matches ? 'calc(var(--mantine-spacing-xs)*3)' : 'calc(var(--mantine-spacing-xl)*3)',
					paddingBottom: !matches ? 'calc(var(--mantine-spacing-xs)*1.5)' : 'calc(var(--mantine-spacing-xl)*1.5)',
					paddingTop: !matches ? 'var(--mantine-spacing-xs' : 'var(--mantine-spacing-xl',
					flex: 1,
					width: '100%',
					position: 'relative',
				}}
			>
				<Grid>
					<Grid.Col span={8}>
						<h2>Overview</h2>
						<p>{data?.about}</p>
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
			</Container>
		</Page>
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

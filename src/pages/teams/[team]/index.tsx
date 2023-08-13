import { Container, Divider, Grid, Group, Stack, useMantineTheme } from '@mantine/core';

import Gallery from '../../../components/Gallery';
import { LogoHeader } from '../../../components/Header';
import { NextPage } from 'next';
import Page from '../../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useScroll } from 'framer-motion';

const Team: NextPage = () => {
	const router = useRouter();
	const team = router.query.team;
	const { data } = useSWR(`/buildteams/${team}?builds=true&showcase=true`);
	const matches = useMediaQuery('(min-width: 900px)');
	const theme = useMantineTheme();
	const { scrollY } = useScroll();
	return (
		<Page fullWidth title={data?.name} description={data?.about}>
			<LogoHeader {...data} applyHref={`${team}/apply`} />
			<Container
				size="xl"
				style={{
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#ffffff',
					boxShadow: 'none',
					marginBottom: theme.spacing.xl * 2,
					padding: !matches ? `${theme.spacing.xs * 3}px` : `${theme.spacing.xl * 3}px`,
					paddingBottom: !matches ? `${theme.spacing.xs * 1.5}px` : `${theme.spacing.xl * 1.5}px`,
					paddingTop: !matches ? `${theme.spacing.xs * 1}px` : `${theme.spacing.xl * 1}px`,
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
							<Group position="apart">
								<p>Location</p>
								<p>{data?.location}</p>
							</Group>
							<Divider style={{ margin: '0' }} my="sm" />

							<Group position="apart">
								<p>Members</p>
								<p>{data?._count?.members}</p>
							</Group>
							<Divider style={{ margin: '0' }} my="sm" />

							<Group position="apart">
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

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}
export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

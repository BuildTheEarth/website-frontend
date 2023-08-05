import { Avatar, Grid, Group, Pagination, Text, createStyles, useMantineTheme } from '@mantine/core';
import { Pin, Users } from 'tabler-icons-react';

import { NextPage } from 'next';
import Page from '../../components/Page';
import SearchInput from '../../components/SearchInput';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const useStyles = createStyles((theme) => ({
	icon: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
	},

	name: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
}));

const Faq: NextPage = () => {
	const router = useRouter();
	const { t } = useTranslation('teams');
	const theme = useMantineTheme();
	const { classes } = useStyles();
	const [search, setSearch] = useState<string | undefined>(undefined);
	const [activePage, setPage] = useState(1);
	const { data } = useSWR(`/buildteams?page=${activePage - 1}`);
	return (
		<Page
			head={{
				title: t('head.title'),
				large: true,
				image: '/images/placeholder.webp',
			}}
		>
			<p>
				{t('description')}
				<br />
				<br />
				{t('joining')}
			</p>
			<SearchInput onSearch={(search) => setSearch(search)} />
			<Grid gutter="xl" style={{ marginTop: theme.spacing.xl }}>
				{data?.data
					.filter((element: any) => element.name.toLowerCase().includes(search?.toLowerCase() || ''))
					//.slice(activePage * 14 - 14, activePage * 14)
					.map((element: any, i: number) => (
						<Grid.Col key={i} sm={6}>
							<Group
								noWrap
								sx={{
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
									borderRadius: theme.radius.xs,
									'&:hover': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
									},
								}}
								p="md"
								onClick={() => router.push(`/teams/${element.id}`)}
							>
								<Avatar src={element.icon} size={94} radius="md" />
								<div>
									<Group position="apart">
										<Text size="lg" weight={500} className={classes.name}>
											{element.name}
										</Text>

										{/*element.builders.includes('Nudelsuppe_42_#3571') ? <Badge color="green">Builder</Badge> : null*/}
									</Group>

									<Group noWrap spacing={10} mt={3}>
										<Pin size={16} className={classes.icon} />
										<Text size="xs" color="dimmed">
											{element.location}
										</Text>
									</Group>

									<Group noWrap spacing={10} mt={5}>
										<Users size={16} className={classes.icon} />
										<Text size="xs" color="dimmed">
											{element._count.members} Members
										</Text>
									</Group>
								</div>
							</Group>
						</Grid.Col>
					))}
			</Grid>
			<Group position="center" pt="md">
				<Pagination total={data?.pages || 1} radius="xs" page={activePage} onChange={setPage} siblings={1} />
			</Group>
		</Page>
	);
};

export default Faq;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}

import {
	Avatar,
	Badge,
	Button,
	Code,
	Grid,
	Group,
	Stack,
	Text,
	Tooltip,
	rem,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import {
	IconConfetti,
	IconCrane,
	IconExternalLink,
	IconLogout,
	IconPencil,
	IconPin,
} from '@tabler/icons-react';

import Page from '@/components/Page';
import { useUser } from '@/hooks/useUser';
import thumbnail from '@/public/images/thumbnails/me.png';
import getCountryName from '@/utils/ISOCountries';
import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Pin } from 'tabler-icons-react';

const MePage: NextPage = () => {
	const user = useUser();
	const { data } = useSWR(`/users/${user?.user?.id}`);
	const { t } = useTranslation('me');
	const scheme = useMantineColorScheme();
	const theme = useMantineTheme();
	const router = useRouter();

	return (
		<Page
			head={{
				title: t('head.title'),
				image: thumbnail,
			}}
			requiredPermissions={{ permissions: ['account.info'] }}
			loading={!data}
		>
			{data && (
				<>
					<p>{t('description')}</p>
					<h2>{t('account.title')}</h2>
					<Text>
						{t('account.minecraft') + ' '}
						<Code>{data.minecraft}</Code>
					</Text>
					<Text>
						{t('account.id') + ' '}
						<Code>{data.id}</Code>
					</Text>
					<Group>
						<Button
							leftSection={<IconPencil />}
							component={Link}
							href={`/me/settings/general`}
							mt="md"
						>
							{t('account.settings')}
						</Button>

						<Button
							leftSection={<IconLogout />}
							mt="md"
							onClick={() => {
								window.localStorage.removeItem('auth-permission-state');
								signOut({ callbackUrl: '/', redirect: true });
							}}
							variant="outline"
						>
							{t('common:auth.signout')}
						</Button>
					</Group>
					{data.createdBuildTeams.length > 0 && (
						<>
							<h2>{t('owned.title')}</h2>
							<p>{t('owned.description')}</p>
							<Grid mb="md">
								{data.createdBuildTeams?.map((element: any, i: number) => (
									<Grid.Col key={i} span={{ sm: 6 }}>
										<Group
											wrap="nowrap"
											style={{
												backgroundColor:
													scheme.colorScheme === 'dark'
														? theme.colors.dark[6]
														: theme.colors.gray[1],
												borderRadius: theme.radius.xs,
											}}
											p="md"
										>
											<Avatar
												src={element.icon}
												size={94}
												radius="md"
												alt={element.name + ' Logo'}
											/>
											<div>
												<Group justify="space-between">
													<Text size="lg" fw={500}>
														{element.name}
													</Text>
												</Group>

												<Group wrap="nowrap" gap={10} mt={3}>
													{element.creatorId == user.user.id ? (
														<Badge variant="gradient" gradient={{ from: 'red', to: 'orange' }}>
															{t('common:owner')}
														</Badge>
													) : (
														<Badge variant="gradient" gradient={{ from: 'grape.6', to: 'grape' }}>
															{t('common:manager')}
														</Badge>
													)}
													{data.joinedBuildTeams.length > 0 &&
														data.joinedBuildTeams.some((b: any) => b.id == element.id) && (
															<Badge variant="gradient">{t('common:builder')}</Badge>
														)}
												</Group>
												<Button
													mt="xs"
													variant="gradient"
													size="xs"
													leftSection={<IconPencil />}
													component={Link}
													href={`/teams/${element.slug}/manage/settings`}
												>
													{t('owned.action')}
												</Button>
											</div>
										</Group>
									</Grid.Col>
								))}
							</Grid>
						</>
					)}
					<h2>{t('teams.title')}</h2>
					<p>{t('teams.description')}</p>
					<Grid mb="md">
						{data.joinedBuildTeams.length > 0 ? (
							data.joinedBuildTeams
								?.filter((e: any) => !data.createdBuildTeams.some((b: any) => b.id == e.id))
								.map((element: any, i: number) => (
									<Grid.Col key={i} span={{ sm: 6 }}>
										<Group
											wrap="nowrap"
											style={{
												backgroundColor:
													scheme.colorScheme === 'dark'
														? theme.colors.dark[6]
														: theme.colors.gray[1],
												borderRadius: theme.radius.xs,
												cursor: 'pointer',
											}}
											p="md"
											onClick={() => router.push(`/teams/${element.slug}`)}
										>
											<Avatar
												src={element.icon}
												size={94}
												radius="md"
												alt={element.name + ' Logo'}
											/>
											<div>
												<Group justify="space-between">
													<Text size="lg" fw={500}>
														{element.name}
													</Text>
												</Group>
												<Badge variant="gradient">{t('common:builder')}</Badge>

												<Group wrap="nowrap" gap={10} mt={8}>
													<Pin size={16} />
													<Text size="xs" c="dimmed">
														{element.location
															.split(', ')
															.slice(0, 3)
															.map((e: string) => getCountryName(e))
															.join(', ')}
													</Text>
												</Group>
											</div>
										</Group>
									</Grid.Col>
								))
						) : (
							<Grid.Col
								span={12}
								style={{
									backgroundColor:
										scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
									borderRadius: theme.radius.xs,
									cursor: 'pointer',
									minHeight: '10vh',
								}}
								p="md"
							>
								<Stack align="center" m="md">
									<Text fw="bold" size="lg">
										{t('teams.empty.description')}
									</Text>
									<Button
										leftSection={<IconExternalLink />}
										variant="gradient"
										component={Link}
										href="/teams"
									>
										{t('teams.empty.action')}
									</Button>
								</Stack>
							</Grid.Col>
						)}
					</Grid>

					<h2>{t('claims.title')}</h2>
					<p>{t('claims.description')}</p>
					<Grid mb="md" mih="10vh" grow>
						{data.claims
							?.concat(data.claimsBuilder?.map((b: any) => ({ ...b, builder: true })))
							.map((element: any, i: number) => (
								<Grid.Col key={i} span={{ sm: 6 }}>
									<Group
										wrap="nowrap"
										style={{
											backgroundColor:
												scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
											borderRadius: theme.radius.xs,
											cursor: 'pointer',
										}}
										p="md"
									>
										<Avatar
											size={96}
											radius="md"
											color={element.finished ? 'green' : 'orange'}
											alt={element.name + ' Icon'}
										>
											<IconPin size="2rem" />
										</Avatar>
										<div>
											<Group justify="space-between">
												<Tooltip label={element.name}>
													<Text size="lg" fw={500} style={{ wordWrap: 'break-word' }} lineClamp={1}>
														{element.name}
													</Text>
												</Tooltip>
											</Group>
											<Group wrap="nowrap" gap={10} mt={3}>
												{element.finished ? (
													<Badge
														variant="gradient"
														gradient={{ from: 'green', to: 'lime' }}
														leftSection={
															<IconConfetti style={{ width: rem(16), height: rem(16) }} />
														}
													>
														{t('claims.status.finished')}
													</Badge>
												) : (
													<Badge
														variant="gradient"
														gradient={{ from: 'orange', to: 'yellow' }}
														leftSection={<IconCrane style={{ width: rem(12), height: rem(12) }} />}
													>
														{t('claims.status.building')}
													</Badge>
												)}
												{element.builder ? (
													<Badge variant="gradient">{t('common:builder')}</Badge>
												) : (
													<Badge variant="gradient" gradient={{ from: 'red', to: 'orange' }}>
														{t('common:owner')}
													</Badge>
												)}
											</Group>
											<Group justify="space-between">
												<Button
													mt="xs"
													variant="gradient"
													size="xs"
													leftSection={<IconPencil />}
													component={Link}
													disabled={element.builder}
													href={`/map/edit?id=${element.id}`}
												>
													{t('claims.action')}
												</Button>
											</Group>
										</div>
									</Group>
								</Grid.Col>
							))}
						<Grid.Col
							span={{ sm: 6 }}
							style={{
								borderRadius: theme.radius.xs,
								cursor: 'pointer',
								minHeight: '10vh',
							}}
							p="md"
						>
							<Stack align="center" m="md">
								<Text fw="bold" size="lg">
									{t('claims.create.description')}
								</Text>
								<Button
									leftSection={<IconExternalLink />}
									variant="gradient"
									component={Link}
									href="/map/edit"
								>
									{t('claims.create.action')}
								</Button>
							</Stack>
						</Grid.Col>
					</Grid>
				</>
			)}
		</Page>
	);
};

export default MePage;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'me'])),
		},
	};
}

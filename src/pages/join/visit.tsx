import {
	ActionIcon,
	Button,
	Center,
	Container,
	Grid,
	Group,
	Pagination,
	rem,
	Stack,
	Stepper,
	Text,
	Title,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import {
	IconBox,
	IconBuildingCommunity,
	IconChevronDown,
	IconChevronLeft,
	IconExternalLink,
	IconPrompt,
	IconSearch,
	IconServer,
} from '@tabler/icons-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import BackgroundImage from '@/components/BackgroundImage';
import Page from '@/components/Page';
import SearchInput from '@/components/SearchInput';
import thumbnail from '@/public/images/join/visit.webp';
import fetcher from '@/utils/Fetcher';
import getCountryName from '@/utils/ISOCountries';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Visit: NextPage = ({ data }: any) => {
	const { t } = useTranslation('getstarted');
	const scheme = useMantineColorScheme();
	const theme = useMantineTheme();
	const router = useRouter();
	const [search, setSearch] = useState<string | undefined>(undefined);
	const [selected, setSelected] = useState<any>(undefined);
	const { scrollY, scrollYProgress } = useScroll();
	const [activePage, setPage] = useState(1);
	const titleOp = useTransform(scrollY, [0, 500], ['0', '1']);

	const locations: any = [];
	data?.forEach((element: any) =>
		!element.location.includes('glb')
			? element.location.includes(', ')
				? element.location.split(', ').map((part: any) =>
						locations.push({
							location: getCountryName(part),
							raw: part,
							team: element.name,
							tid: element.id,
							ip: element.ip,
							slug: element.slug,
						}),
					)
				: locations.push({
						location: getCountryName(element.location),
						raw: element.location,
						team: element.name,
						tid: element.id,
						ip: element.ip,
						slug: element.slug,
					})
			: null,
	);

	return (
		<Page fullWidth title="Visit" description="Visit Building the Earth">
			<BackgroundImage
				rootStyle={{
					width: '100%',
					height: '95vh',
				}}
				src={thumbnail}
				sizes="100vw"
			>
				<div
					style={{
						height: '100%',
						position: 'absolute',
						top: 0,
						right: 0,
						width: '100%',
					}}
				>
					<Center
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: '#00000077',
							padding: 16,
						}}
					>
						<Title
							style={{ color: '#ffffff', fontSize: 64, textShadow: '0px 0px 28px #000' }}
							ta="center"
							order={1}
						>
							{t('visit.title')}
						</Title>
					</Center>
					<Center
						style={{
							width: '100%',
							height: '0%',
							position: 'absolute',
							bottom: '5%',
							left: 0,
						}}
					>
						<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
							<ActionIcon
								component={Link}
								styles={{ root: { height: 64, width: 64, textShadow: '0px 0px 28px #000' } }}
								radius="xs"
								variant="transparent"
								href="#more"
							>
								<IconChevronDown size={64} color="white" />
							</ActionIcon>
						</motion.div>
					</Center>
				</div>
			</BackgroundImage>
			<Container
				style={{
					background: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					overflow: 'hidden',
					width: '100%',
					minHeight: '100vh',
				}}
				my="xl"
			>
				<motion.h1
					id="more"
					style={{
						opacity: titleOp,
						margin: 'var(--mantine-spacing-xl) 0px',
						padding: 'var(--mantine-spacing-xl) 0px',
						color: 'var(--mantine-color-white)',
					}}
				>
					{t('visit.title')}
				</motion.h1>
				<p>{t('visit.description')}</p>
				<SearchInput onSearch={(search) => setSearch(search)} />
				<Grid mt="xl" pt="xl" gutter={{ base: '3%' }}>
					{locations
						?.filter((element: any) => !element.location.includes('Globe'))
						?.filter(
							(element: any) =>
								element.location?.toLowerCase().includes(search?.toLowerCase() || '') ||
								element.team?.toLowerCase().includes(search?.toLowerCase() || ''),
						)
						.sort((a: any, b: any) => a.location.localeCompare(b.location))
						.slice(activePage * 8 - 8, activePage * 8)
						.map((element: any, i: number) => (
							<Grid.Col key={i} span={{ sm: 5.75 }} mb="md" mr="md">
								<Group
									wrap="nowrap"
									style={{
										backgroundColor:
											scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
										borderRadius: 0,
										cursor: 'pointer',
										boxShadow: 'var(--mantine-shadow-block)',
									}}
									p="md"
									onClick={() => {
										setSelected({
											...element,
											type:
												element.ip && element.ip != 'buildtheearth.net' ? 'standalone' : 'network',
										});
										router.push('#country');
									}}
								>
									<span
										className={`fi fi-${element.raw} fis`}
										style={{ height: 90, width: 90, borderRadius: '50%' }}
									></span>
									<div>
										<Stack gap={'xs'}>
											<Text fs="xl" fw="bold">
												{element.location.split(', ').slice(0, 3).join(', ')}
											</Text>
											<Text size="md">Team: {element.team}</Text>
										</Stack>
									</div>
								</Group>
							</Grid.Col>
						))}
				</Grid>
				<Pagination
					mt="xl"
					total={Math.ceil(
						locations
							?.filter((element: any) => !element.location.includes('Globe'))
							?.filter(
								(element: any) =>
									element.location?.toLowerCase().includes(search?.toLowerCase() || '') ||
									element.team?.toLowerCase().includes(search?.toLowerCase() || ''),
							).length / 8,
					)}
					value={activePage}
					onChange={setPage}
				/>
			</Container>
			{selected && (
				<Container
					style={{
						background: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						overflow: 'hidden',
						width: '100%',
						minHeight: '100vh',
					}}
					my="xl"
				>
					<h1
						id="country"
						style={{
							margin: 'var(--mantine-spacing-xl) 0px',
							padding: 'var(--mantine-spacing-xl) 0px',
							color: 'var(--mantine-color-white)',
						}}
					>
						{t('visit.country.title', { country: selected.location })}
					</h1>
					<Stepper active={1} orientation="vertical" my="xl" size="lg">
						<Stepper.Step
							label={t('visit.country.step0.title')}
							description={t('visit.country.step0.description')}
							icon={<IconSearch style={{ width: rem(18), height: rem(18) }} />}
						/>
						<Stepper.Step
							label={t('visit.country.step1.title')}
							description={t('visit.country.step1.description')}
							icon={<IconBox style={{ width: rem(18), height: rem(18) }} />}
						/>
						{selected.type == 'standalone' ? (
							<Stepper.Step
								label={
									<div
										dangerouslySetInnerHTML={{
											__html: t('visit.country.step2.title', {
												ip: selected?.ip,
											}),
										}}
									/>
								}
								description={t('visit.country.step2.description', { ip: selected?.ip })}
								icon={<IconServer style={{ width: rem(18), height: rem(18) }} />}
							/>
						) : (
							<>
								<Stepper.Step
									label={
										<div
											dangerouslySetInnerHTML={{
												__html: t('visit.country.step2.title', { ip: 'buildtheearth.net' }),
											}}
										/>
									}
									description={t('visit.country.step2.description', { ip: 'buildtheearth.net' })}
									icon={<IconServer style={{ width: rem(18), height: rem(18) }} />}
								/>
								<Stepper.Step
									label={t('visit.country.step3.title', { slug: selected?.slug })}
									description={t('visit.country.step3.description', { slug: selected?.slug })}
									icon={<IconPrompt style={{ width: rem(18), height: rem(18) }} />}
								/>
							</>
						)}
						<Stepper.Step
							label={t('visit.country.step4.title', { country: selected?.location })}
							description={t('visit.country.step4.description', { country: selected?.location })}
							icon={<IconBuildingCommunity style={{ width: rem(18), height: rem(18) }} />}
						/>
					</Stepper>
					<Group>
						<Button mt="xl" component={Link} href="/join#more" leftSection={<IconChevronLeft />}>
							{' '}
							{t('visit.back')}
						</Button>
						<Button
							mt="xl"
							component={Link}
							href={`/teams/${selected?.slug}`}
							leftSection={<IconExternalLink />}
						>
							{' '}
							{t('visit.open')}
						</Button>
					</Group>
				</Container>
			)}
		</Page>
	);
};

export default Visit;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/buildteams');

	return {
		props: { data: res, ...(await serverSideTranslations(locale, ['common', 'getstarted'])) },
		revalidate: 60 * 60 * 24, // Every day
	};
}

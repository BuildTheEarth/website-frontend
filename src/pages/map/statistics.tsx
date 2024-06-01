import { Divider, Grid, GridCol, GridColProps, NumberFormatter, Space, Text } from '@mantine/core';

import Counter from '@/components/Counter';
import Page from '@/components/Page';
import { StatsGrid } from '@/components/Stats';
import { StatsGroup } from '@/components/stats/StatsGroup';
import thumbnail from '@/public/images/thumbnails/about.webp';
import fetcher from '@/utils/Fetcher';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const EARTH_AREA = 510_100_000_000_000_000;
const EARTH_LAND_AREA = 149_000_000_000_000_000;
const EARTH_WATER_AREA = 361_000_000_000_000_000;

const EUROPE_AREA = 10_530_000_000_000;
const NORTH_AMERICA_AREA = 24_710_000_000_000;
const AFRICA_AREA = 30_370_000_000_000;
const ASIA_AREA = 44_580_000_000_000;

const MapPage: NextPage = ({ data, areaPercentage, days }: any) => {
	const router = useRouter();
	const { t } = useTranslation('map');
	return (
		<Page head={{ title: t('stats.title'), image: thumbnail }} smallPadding noBg>
			<StatsGroup
				data={[
					{
						title: t('stats.global.buildings'),
						value: <Counter value={data.total.buildings} direction="up" />,
						description: '',
					},
					{
						title: t('stats.global.area'),
						value: <Counter value={data.total.area} direction="up" suffix=" m²" />,
					},
					{
						title: t('stats.global.claims'),
						value: <Counter value={data.total.claims} direction="up" />,
						description: '',
					},
				]}
			/>
			<Space h="xl" />
			<Grid grow>
				<GridCol span={6}>
					<StatsGrid title={t('stats.average.buildings')} isText>
						<NumberFormatter
							suffix=" Buildings"
							value={data.average.buildings}
							decimalScale={2}
							thousandSeparator
						/>
					</StatsGrid>
				</GridCol>
				<GridCol span={6}>
					<StatsGrid title={t('stats.average.area')} isText>
						<NumberFormatter
							suffix=" m²"
							value={data.average.area}
							decimalScale={2}
							thousandSeparator
						/>
					</StatsGrid>
				</GridCol>
				<GridCol span={12}>
					<h2>{t('stats.largestClaim')}</h2>
				</GridCol>
				{data.largest.area.map((claim: any, i: number) => (
					<GridCol key={claim.id} span={4}>
						<StatsGrid
							title={`${claim.name} ${claim.city ? '- ' + claim.city : ''}`.trim()}
							isText
							onClick={() => router.push(`/map?claim=${claim.id}`)}
							paperProps={{ style: { height: '100%' } }}
						>
							<NumberFormatter suffix=" m²" value={claim.size} decimalScale={2} thousandSeparator />
						</StatsGrid>
					</GridCol>
				))}
				<GridCol span={12}>
					<h2>{t('stats.mostBuildings')}</h2>
				</GridCol>
				{data.largest.buildings.map((claim: any, i: number) => (
					<GridCol key={claim.id} span={4}>
						<StatsGrid
							title={`${claim.name} ${claim.city ? '- ' + claim.city : ''}`.trim()}
							isText
							onClick={() => router.push(`/map?claim=${claim.id}`)}
							paperProps={{ style: { height: '100%' } }}
						>
							<NumberFormatter suffix=" Buildings" value={claim.buildings} thousandSeparator />
						</StatsGrid>
					</GridCol>
				))}
				<GridCol span={12}>
					<h2>{t('stats.mostBuildTeam')}</h2>
				</GridCol>
				{data.most.team.map((team: any, i: number) => (
					<GridCol key={team.id} span={4}>
						<StatsGrid
							title={team.name}
							isText
							onClick={() => router.push(`/teams/${team.slug}`)}
							paperProps={{ style: { height: '100%' } }}
						>
							<NumberFormatter suffix=" Claims" value={team.count} thousandSeparator />
						</StatsGrid>
					</GridCol>
				))}
				<GridCol span={12}>
					<h2>{t('stats.mostUser')}</h2>
				</GridCol>
				{data.most.user.map((user: any, i: number) => (
					<GridCol key={user.id} span={4}>
						<StatsGrid
							title={user.username || user.minecraft || 'Unknown User - ' + user.discordId}
							isText
							paperProps={{ style: { height: '100%' } }}
						>
							<NumberFormatter suffix=" Claims" value={user.count} thousandSeparator />
						</StatsGrid>
					</GridCol>
				))}
				<GridCol span={12}>
					<h2>{t('stats.total.title')}</h2>
					<Text>{t('stats.total.description')}</Text>
				</GridCol>
				<GridCol span={4}>
					<StatsGrid title="Earth - Total Area" isText paperProps={{ style: { height: '100%' } }}>
						<NumberFormatter
							suffix="%"
							value={(data.total.area / EARTH_AREA) * 100}
							thousandSeparator
							decimalScale={10}
						/>
					</StatsGrid>
				</GridCol>
				<GridCol span={4}>
					<StatsGrid title="Earth - Landmass" isText paperProps={{ style: { height: '100%' } }}>
						<NumberFormatter
							suffix="%"
							value={(data.total.area / EARTH_LAND_AREA) * 100}
							thousandSeparator
							decimalScale={10}
						/>
					</StatsGrid>
				</GridCol>
				<GridCol span={4}>
					<StatsGrid title="Earth - Water" isText paperProps={{ style: { height: '100%' } }}>
						<NumberFormatter
							suffix="%"
							value={(data.total.area / EARTH_WATER_AREA) * 100}
							thousandSeparator
							decimalScale={10}
						/>
					</StatsGrid>
				</GridCol>
				{areaPercentage.map((continent: any, i: number) => (
					<GridCol key={continent.name} span={3}>
						<StatsGrid title={continent.name} isText paperProps={{ style: { height: '100%' } }}>
							<NumberFormatter
								suffix="%"
								value={continent.value}
								thousandSeparator
								decimalScale={10}
							/>
						</StatsGrid>
					</GridCol>
				))}
				{comparisons.map((comparison: any, i: number) =>
					comparison.divide ? (
						<GridCol span={12} key={`comp_${i}`}>
							<Divider my="sm" label={comparison.divide} />
						</GridCol>
					) : (
						<GridCol span={comparison.span || 4} key={`comp_${i}`}>
							<StatsGrid title={comparison.name} isText paperProps={{ style: { height: '100%' } }}>
								<NumberFormatter
									suffix={comparison.asX ? 'x' : '%'}
									value={(data.total.area / comparison.area) * (comparison.asX ? 1 : 100)}
									thousandSeparator
									decimalScale={
										comparison.asX ? comparison.decimals || 0 : comparison.decimals || 2
									}
								/>
							</StatsGrid>
						</GridCol>
					),
				)}
			</Grid>
		</Page>
	);
};

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/map/statistics');
	const areaPercentage = calculatePercentages(res.total.area);
	return {
		props: {
			data: res,
			areaPercentage,
			days: datediff(),
			...(await serverSideTranslations(locale, ['common', 'map'])),
		},
		revalidate: 60 * 60 * 24, // Every 24 hours,
	};
}

function calculatePercentages(area: number) {
	return [
		{ name: 'Europe', value: (area / EUROPE_AREA) * 100 },
		{ name: 'North America', value: (area / NORTH_AMERICA_AREA) * 100 },
		{ name: 'Africa', value: (area / AFRICA_AREA) * 100 },
		{ name: 'Asia', value: (area / ASIA_AREA) * 100 },
	].sort((a, b) => b.value - a.value);
}
function datediff() {
	return Math.round(
		(new Date().getTime() - new Date('2020-03-21T12:00:00+0000').getTime()) / (1000 * 60 * 60 * 24),
	);
}

const comparisons: (
	| {
			name: string;
			area: number;
			asX?: boolean;
			decimals?: number;
			span?: GridColProps['span'];
	  }
	| { divide: string }
)[] = [
	// MICRO STATES
	{
		divide: 'Micro States',
	},
	{
		name: 'Liechtenstein',
		area: 160_000_000,
		asX: true,
		span: 4,
		decimals: 1,
	},
	{
		name: 'San Marino',
		area: 61_000_000,
		asX: true,
		span: 4,
		decimals: 1,
	},
	{
		name: 'Monaco',
		area: 2_080_000,
		asX: true,
		span: 4,
	},
	// CONTRIES
	{
		divide: 'Countries',
	},
	{
		name: 'Russia',
		area: 16_376_870_000_000,
		asX: false,
		span: 3,
		decimals: 4,
	},
	{
		name: 'Mexico',
		area: 1_943_950_000_000,
		asX: false,
		span: 3,
		decimals: 3,
	},
	{
		name: 'Colombia',
		area: 1_038_700_000_000,
		asX: false,
		span: 3,
		decimals: 3,
	},
	{
		name: 'Chile',
		area: 743_812_000_000,
		asX: false,
		span: 3,
	},
	{
		name: 'Sweden',
		area: 407_284_000_000,
		asX: false,
		span: 4,
	},
	{
		name: 'Germany',
		area: 349_390_000_000,
		asX: false,
		span: 4,
	},
	{
		name: 'Italy',
		area: 295_717_000_000,
		asX: false,
		span: 4,
	},
	{
		name: 'New Zealand',
		area: 264_537_000_000,
		asX: false,
		span: 3,
	},
	{
		name: 'Iceland',
		area: 100_830_000_000,
		asX: false,
		span: 3,
	},
	{
		name: 'Austria',
		area: 82_520_000_000,
		asX: false,
		span: 3,
	},
	{
		name: 'United Arab Emirates',
		area: 71_024_000_000,
		asX: false,
		span: 3,
	},
	{
		name: 'Belgium',
		area: 30_280_000_000,
		asX: false,
		span: 4,
	},
	{
		name: 'Jamaica',
		area: 11_000_000_000,
		asX: false,
		span: 4,
	},
	{
		name: 'Malta',
		area: 315_000_000,
		asX: true,
		span: 4,
		decimals: 1,
	},
	// CITIES
	{
		divide: 'Cities',
	},
	{
		name: 'Hongkong',
		area: 2_755_000_000,
		asX: false,
		span: 3,
	},
	{
		name: 'Moscow',
		area: 2_511_000_000,
		asX: false,
		span: 3,
	},
	{
		name: 'Tokyo',
		area: 2_194_000_000,
		asX: false,
		span: 3,
	},
	{
		name: 'London',
		area: 1_572_000_000,
		asX: false,
		span: 3,
	},
	{
		name: 'São Paulo',
		area: 1_521_000_000,
		asX: false,
		span: 4,
	},
	{
		name: 'Toronto',
		area: 630_200_000,
		asX: false,
		span: 4,
	},
	{
		name: 'Paris',
		area: 105_400_000,
		asX: true,
		span: 4,
		decimals: 2,
	},
	// SPORTS
	{
		divide: 'Sports',
	},
	{
		name: 'Golf Courses',
		area: 303_514,
		asX: true,
		span: 3,
	},
	{
		name: 'Cricket Fields',
		area: 17_000,
		asX: true,
		span: 3,
	},
	{
		name: 'Soccer Fields',
		area: 7_140,
		asX: true,
		span: 3,
	},
	{
		name: 'American Football Fields',
		area: 5_350,
		asX: true,
		span: 3,
	},
	{
		name: 'Ice Hockey Fields',
		area: 1_488,
		asX: true,
		span: 4,
	},
	{
		name: 'Tennis Courts',
		area: 261,
		asX: true,
		span: 4,
	},
	{
		name: 'Volleyball Courts',
		area: 162,
		asX: true,
		span: 4,
	},
];

export default MapPage;

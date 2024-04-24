import { generateSiteMap, generateSiteMapContent } from '../utils/Sitemap';

import fetcher from '@/utils/Fetcher';

export default function SiteMap() {
	// getServerSideProps
}

export async function getServerSideProps({ res }: any) {
	const data = await fetcher('/buildteams');

	const content = generateSiteMapContent([
		{
			loc: '/',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			loc: '/map',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			loc: '/map/teams',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			loc: '/map/statistics',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			loc: '/gallery',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.7,
		},
		{
			loc: '/contact',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.7,
		},
		{
			loc: '/teams',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			loc: '/newsletter',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			loc: '/me',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.2,
		},
		{
			loc: '/legal/tos',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.1,
		},
		{
			loc: '/join',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			loc: '/join/visit',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			loc: '/join/build',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			loc: '/faq',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			loc: '/about',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		},
	]);

	const contentTeams = generateSiteMapContent(
		data
			.map((team: any) => [
				{
					loc: `/teams/${team.slug}`,
					lastModified: new Date(),
					changeFrequency: 'weekly',
					priority: 0.8,
				},
				{
					loc: `/teams/${team.slug}/apply`,
					lastModified: new Date(),
					changeFrequency: 'monthly',
					priority: 0.7,
				},
			])
			.flat(),
	);

	const sitemap = generateSiteMap(content.concat(contentTeams));

	res.setHeader('Content-Type', 'text/xml');
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export function generateSiteMap(content: string) {
	return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${content}
            </urlset>`;
}

export function generateSiteMapContent(
	data: { loc: string; lastModified: Date; changeFrequency: string; priority: number }[],
): string {
	return data
		.map(
			(d) => `<url>
                        <loc>${`http://buildtheearth.net${d.loc}`}</loc>
                        <lastmod>${d.lastModified.toISOString().split('T')[0]}</lastmod>
                        <changefreq>${d.changeFrequency}</changefreq>
                        <priority>${d.priority}</priority>
                    </url>`,
		)
		.join('');
}

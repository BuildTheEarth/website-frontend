import nextConfig from 'next.config';
export function generateSiteMap(content: string) {
	return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
                ${content}
            </urlset>`;
}

export function generateSiteMapContent(
	data: { loc: string; lastModified: Date; changeFrequency: string; priority: number }[],
): string {
	return data
		.map(
			(d) => `<url>
                        <loc>${`https://buildtheearth.net${d.loc}`}</loc>
                        <lastmod>${d.lastModified.toISOString().split('T')[0]}</lastmod>
                        ${nextConfig.i18n?.locales
													.map(
														(locale) =>
															` <xhtml:link rel="alternate" hreflang="${locale}" href="https://buildtheearth.net/${locale}${d.loc}"/>`,
													)
													.join('')}
                    </url>`,
		)
		.join('');
}

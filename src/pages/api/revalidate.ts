import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.query.secret !== process.env.NEXTAUTH_SECRET) return res.status(401).json({ message: 'Invalid secret' });

	if (!req.query.path && !req.query.paths) return res.status(400).json({ message: 'Missing path' });

	const paths = JSON.parse((req.query.paths as string) || `["${req.query.path}"]`);

	paths.map(async (path: string) => {
		try {
			await res.revalidate(path);
			console.log(`[${new Date().toISOString()}] Revalidated ${path}`);
			return { revalidated: true, path };
		} catch (err) {
			return { revalidated: false, path };
		}
	});

	return res.json(paths);
}

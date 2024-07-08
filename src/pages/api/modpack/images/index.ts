import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const modpackData = await fetch("https://api.buildtheearth.net/api/v1/jsonstore/modpack")
	
	const jsonModpackData = await modpackData.json()

	res.send(jsonModpackData);
}

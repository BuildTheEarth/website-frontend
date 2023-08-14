export default async function fetcher(route: string, ...props: any) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + route, ...props);
	return res.json();
}

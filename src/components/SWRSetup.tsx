import { useSession } from 'next-auth/react';
import { SWRConfig } from 'swr';

export default function SWRSetup({ content }: any) {
	const session = useSession();
	// if (session.status == 'loading') {
	// 	return <LoadingOverlay visible />;
	// }
	return (
		<SWRConfig
			value={{
				refreshInterval: 0,
				fetcher: (resource: any, init: any) => {
					if (!resource.includes('/undefined')) {
						return fetch(process.env.NEXT_PUBLIC_API_URL + resource, {
							headers: {
								'Access-Control-Allow-Origin': '*',
								Authorization: 'Bearer ' + session.data?.accessToken,
								...init?.headers,
							},
							...init,
						})
							.then((res) => res.json())
							.then((d) => d);
					}
				},
				shouldRetryOnError: true,
				errorRetryInterval: 2,
				errorRetryCount: 2,
				revalidateIfStale: false,
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
			}}
		>
			{content}
		</SWRConfig>
	);
}

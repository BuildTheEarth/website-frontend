import { LoadingOverlay } from '@mantine/core';
import Page from './Page';
import { SWRConfig } from 'swr';
import SWRProvider from './SWRProvider';
import { useSession } from 'next-auth/react';

export default function SWRSetup({ content }: any) {
	const session = useSession();
	// if (session.status == 'loading') {
	// 	return <LoadingOverlay visible />;
	// }
	return (
		<SWRConfig
			value={{
				refreshInterval: 0,
				fetcher: (resource: any, init: any) =>
					!resource.includes('/undefined') &&
					fetch(process.env.NEXT_PUBLIC_API_URL + resource, {
						headers: {
							'Access-Control-Allow-Origin': '*',
							Authorization: 'Bearer ' + session.data?.accessToken,
							...init?.headers,
						},
						...init,
					})
						.then((res) => res.json())
						.then((d) => d),
				shouldRetryOnError: true,
				revalidateIfStale: false,
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
			}}
		>
			{content}
		</SWRConfig>
	);
}

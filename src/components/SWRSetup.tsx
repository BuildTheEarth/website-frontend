import { showNotification } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
import { SWRConfig } from 'swr';

export default function SWRSetup({ children }: any) {
	const session = useSession();
	// if (session.status == 'loading') {
	// 	return <LoadingOverlay visible />;
	// }
	return (
		<SWRConfig
			value={{
				// refreshInterval: 0,
				fetcher: async (resource: any, init: any) => {
					if (!resource.includes('/undefined') && !resource.includes('/null')) {
						const res = await fetch(process.env.NEXT_PUBLIC_API_URL + resource, {
							headers: {
								'Access-Control-Allow-Origin': '*',
								Authorization: session.data?.accessToken
									? 'Bearer ' + session.data?.accessToken
									: undefined,
								...init?.headers,
							},
							...init,
						});

						const json = await res.json();

						if (!res.ok || json.error) {
							throw new Error(json.message, { cause: res.status });
						}

						return json;
					}
				},
				shouldRetryOnError: true,
				errorRetryInterval: 1000,
				errorRetryCount: 2,
				revalidateIfStale: false,
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
				onError: (err, key) => {
					console.error(`'${err}' on request to ${key} (${err.cause})`);
					if (err.cause != 401) {
						showNotification({
							title: 'Error during request',
							message: err.message.replace('Error: ', ''),
							color: 'red',
						});
					}
				},
			}}
		>
			{children}
		</SWRConfig>
	);
}

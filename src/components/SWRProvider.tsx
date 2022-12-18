import React from 'react';
import { SWRConfig } from 'swr';
import { useSession } from 'next-auth/react';

const SWRProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: session } = useSession();

	return (
		<SWRConfig
			value={{
				refreshInterval: 0,
				fetcher: (resource: string, init: any) =>
					fetch(resource.startsWith('/') ? process.env.NEXT_PUBLIC_API_URL + resource : resource, {
						...init,
						headers: { Authorization: session?.accessToken && `Bearer ${session?.accessToken}` },
					}).then((res) => res.json()),
				shouldRetryOnError: false,
				revalidateIfStale: false,
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
			}}
		>
			{children}
		</SWRConfig>
	);
};

export default SWRProvider;

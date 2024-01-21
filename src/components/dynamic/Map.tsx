import dynamic from 'next/dynamic';

export const DynamicMap = dynamic(() => import('../map/Map'), {
	ssr: false,
});
export const DynamicClaimDrawer = dynamic(() =>
	import('../map/ClaimDrawer').then((mod) => mod.ClaimDrawer),
);
export const DynamicMapContextMenu = dynamic(() =>
	import('../map/MapContextMenu').then((mod) => mod.MapContextMenu),
);

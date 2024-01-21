import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import mapboxgl from 'mapbox-gl';
import { osmTypeToReadable } from './OSM';

export default async function fetcher(route: string, ...props: any) {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + route, ...props);
	return res.json();
}
export async function globalFetcher(route: string, ...props: any) {
	const res = await fetch(route, ...props);
	return res.json();
}
export const searchInOSM = async (query: string, map?: mapboxgl.Map) => {
	const result: any[] = [];
	const res = await fetch(`https://photon.komoot.io/api/?q=${query}`);
	const data = await res.json();

	data.features.slice(0, 5).forEach((feature: any) => {
		let featureType = feature.properties.osm_key;

		const coords = feature.geometry.coordinates;
		const readable = osmTypeToReadable(feature);
		result.push({
			label: readable.name,
			description: readable.description,
			onClick: () => {
				map?.flyTo({
					center: coords,
					zoom: readable.zoom,
				});
				if (map) {
					const marker = new mapboxgl.Marker({ color: 'red' });
					marker
						.setLngLat(coords)
						.setPopup(new mapboxgl.Popup({ closeButton: false }).setHTML(readable.name))
						.addTo(map);
				}
			},
			leftSection: readable.icon,
			group: 'OpenStreetMap',
		});
	});

	return result;
};
interface FetchOptions {
	method?: string;
	headers?: any;
	body?: any;
	bodyParser?: (values: any) => any;
	onError?: (error: { message: string; error: true; errors: any[] }) => void;
	onSuccess?: (data: any) => void;
	errorNotification?: {
		title?: string;
	};
	successNotification?: {
		title: string;
		message?: string;
		color?: string;
		icon?: any;
	};
}

export function handleFetch(
	route: string,
	{
		method,
		headers,
		body: body2,
		onError,
		onSuccess,
		errorNotification,
		successNotification,
		bodyParser,
	}: FetchOptions,
) {
	return async (values: any) => {
		const body = bodyParser ? bodyParser(values) : values;
		const res = await fetch(process.env.NEXT_PUBLIC_API_URL + route, {
			method: method || 'POST',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: JSON.stringify({ ...body2, ...body }),
		});

		const json = await res.json();

		if (!res.ok || json.error) {
			showNotification({
				title: errorNotification?.title || 'Update failed',
				message: json.message,
				color: 'red',
			});
			onError && onError(json);
		} else {
			successNotification &&
				showNotification({
					title: successNotification.title,
					message: successNotification.message || 'All Data has been saved',
					color: successNotification.color || 'green',
					icon: successNotification.icon || <IconCheck />,
				});
			onSuccess && onSuccess(json);
		}
	};
}

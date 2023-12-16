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

import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-style-switcher/styles.css';

import * as React from 'react';

import { LoadingOverlay, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import axios, { AxiosResponse } from 'axios';

import { IconCheck } from '@tabler/icons';
import MapLoader from './MapLoader';
import mapboxgl from 'mapbox-gl';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

interface IMap {
	initialOptions?: Omit<mapboxgl.MapboxOptions, 'container'>;
	onMapLoaded?(map: mapboxgl.Map): void;
	onMapRemoved?(): void;
	allowFullscreen?: boolean;
	savePos?: boolean;
	themeControls?: boolean;
	layerSetup?(map: mapboxgl.Map): void;
}

const styles: MapboxStyleDefinition[] = [
	{
		title: 'Dark',
		uri: 'mapbox://styles/nudelsuppe/cl7hfjfa0002h14o7h6ai832o',
	},
	{
		title: 'Light',
		uri: 'mapbox://styles/mapbox/light-v9',
	},
	{ title: 'Outdoors', uri: 'mapbox://styles/mapbox/outdoors-v11' },
	{ title: 'Satellite', uri: 'mapbox://styles/mapbox/satellite-streets-v11' },
	{ title: 'Streets', uri: 'mapbox://styles/mapbox/streets-v11' },
];

function Map({
	initialOptions = {},
	onMapLoaded,
	onMapRemoved,
	allowFullscreen,
	savePos = true,
	themeControls = true,
	layerSetup,
}: IMap) {
	// Mapbox map
	const [map, setMap] = React.useState<mapboxgl.Map>();
	// Next Router
	const router = useRouter();
	// Boolean if position from url was loaded
	const [posSet, setPosSet] = React.useState(false);
	// Boolean if map is loading (-> Display mapLoader)
	const [loading, setLoading] = React.useState(true);
	// Mantine Theme
	const theme = useMantineColorScheme();
	// Ref to the map div
	const mapNode = React.useRef(null);

	// Update Query Parameters with position
	React.useEffect(() => {
		if (posSet) return;
		const initialZoom = router.query.z?.toString();
		const initialLat = router.query.lat?.toString();
		const initialLng = router.query.lng?.toString();
		if (initialLat && initialLng && initialZoom) {
			map?.flyTo({
				center: [parseFloat(initialLng), parseFloat(initialLat)],
				zoom: parseFloat(initialZoom),
			});
			setPosSet(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query]);

	// Setup Map
	React.useEffect(() => {
		const node = mapNode.current;

		if (typeof window === 'undefined' || node === null) return;

		const mapboxMap = new mapboxgl.Map({
			container: node,
			accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
			style: theme.colorScheme == 'dark' ? styles[0].uri : styles[1].uri,
			zoom: 1,
			antialias: true,
			...initialOptions,
		});

		setMap(mapboxMap);

		mapboxMap.getCanvas().style.cursor = 'default';

		mapboxMap.once('load', async (ev: any) => {
			onMapLoaded && (await onMapLoaded(mapboxMap));
			setLoading(false);

			layerSetup && (await layerSetup(mapboxMap));

			if (allowFullscreen) mapboxMap.addControl(new mapboxgl.FullscreenControl());
			if (themeControls)
				mapboxMap.addControl(
					new MapboxStyleSwitcherControl(styles, {
						defaultStyle: theme.colorScheme == 'dark' ? 'Dark' : 'Light',
					}),
				);
		});

		// Move to pos from query
		if (savePos) {
			mapboxMap.on('moveend', () => {
				triggerPosChange();
			});
		}
		const triggerPosChange = () => {
			const zoom = Math.round(mapboxMap.getZoom() * 10) / 10;
			const pos = mapboxMap.getCenter();
			router.push({ query: { ...router.query, z: zoom, lat: pos.lat, lng: pos.lng } }, undefined, {
				shallow: true,
			});
		};

		return () => {
			mapboxMap.remove();
			if (onMapRemoved) onMapRemoved();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div style={{ width: '100%', height: '100%', position: 'relative' }}>
			<LoadingOverlay visible={loading} />
			<div
				ref={mapNode}
				style={{
					width: '100%',
					height: '100%',
				}}
			/>
		</div>
	);
}

// Map Event Helper Functions

export function mapHoverEffect(map: any, layer: string, source: string, text: (feature: any) => string) {
	// Hover effect
	let hoveredStateId: string | number | undefined = undefined;
	const popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false,
	});

	map.on('mousemove', layer, (e: any) => {
		if (!e.features) {
			popup.remove();
			return;
		}
		if (e?.features.length > 0) {
			// Hover effect
			if (hoveredStateId !== undefined) {
				map.setFeatureState({ source: source, id: hoveredStateId }, { hover: false });
			}
			hoveredStateId = e.features[0].id;
			map.setFeatureState({ source: source, id: hoveredStateId }, { hover: true });

			// Tooltip
			const features = map.queryRenderedFeatures(e.point, {
				layers: [layer],
			});

			popup
				.setLngLat(e.lngLat)
				//@ts-ignore
				.setText(text(features[0]))
				.addTo(map);
		}
	});
	map.on('mouseleave', layer, () => {
		if (hoveredStateId !== undefined) {
			map.setFeatureState({ source: source, id: hoveredStateId }, { hover: false });
		}
		hoveredStateId = undefined;

		popup.remove();
	});
}
export function mapClickEvent(map: any, layer: string, callback: (feature: any) => void) {
	map.on('click', (e: any) => {
		// Find features intersecting the bounding box.
		const selectedFeatures = map.queryRenderedFeatures(e.point, {
			layers: [layer],
		});
		if (selectedFeatures.length > 0) {
			callback(selectedFeatures[0]);
		}
	});
}
export function mapCopyCoordinates(map: any, clipboard: any) {
	map.on('contextmenu', (e: any) => {
		const user = JSON.parse(window.localStorage.getItem('auth') || '{}');
		clipboard.copy(e.lngLat.lat + ', ' + e.lngLat.lng);
		showNotification({
			title: 'Coordinates copied',
			message: 'Paste them anywhere.',
			icon: <IconCheck size={18} />,
			color: 'teal',
		});
	});
}
// Map Load Helper Functions

export async function mapLoadGeoJson(
	map: any,
	url: string | AxiosResponse,
	layer: string,
	layerType: string,
	source: string,
	paint: any,
	outline?: boolean | any,
	afterFetch?: (geojson: any) => void,
) {
	var geojson = null;
	if (typeof url == 'string') {
		geojson = await axios.get(url);
	} else {
		geojson = url;
	}

	afterFetch && afterFetch(geojson);

	if (!map.getSource(source)) {
		map.addSource(source, {
			type: 'geojson',
			data: geojson.data,
		});
	}

	map.addLayer({
		id: layer,
		type: layerType,
		source: source,
		paint: paint,
	});
	if (outline)
		mapLoadGeoJson(
			map,
			geojson,
			layer + '-outline',
			'line',
			source,
			typeof outline == 'boolean' ? paint : outline,
			false,
		);
}

// Map Color Helper Functions

export const mapStatusColorPolygon = {
	'fill-color': [
		'match',
		['get', 'status'],
		0,
		'rgb(201, 42, 42)',
		1,
		'rgb(16, 152, 173)',
		2,
		'rgb(245, 159, 0)',
		3,
		'rgb(245, 159, 0)',
		4,
		'rgb(55, 178, 77)',
		'rgb(201, 42, 42)',
	],
	'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.37],
};
export const mapStatusColorLine = {
	'line-color': [
		'match',
		['get', 'status'],
		0,
		'rgb(201, 42, 42)',
		1,
		'rgb(16, 152, 173)',
		2,
		'rgb(245, 159, 0)',
		3,
		'rgb(245, 159, 0)',
		4,
		'rgb(55, 178, 77)',
		'rgb(201, 42, 42)',
	],
	'line-width': 2,
};

export default Map;

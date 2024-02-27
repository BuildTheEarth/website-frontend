import 'mapbox-gl-style-switcher/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import * as React from 'react';

import { LoadingOverlay, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import mapboxgl, { GeolocateControl } from 'mapbox-gl';
import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';

import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/router';

interface IMap {
	initialOptions?: Omit<mapboxgl.MapboxOptions, 'container'>;
	onMapLoaded?(map: mapboxgl.Map): void;
	onMapRemoved?(): void;
	allowFullscreen?: boolean;
	savePos?: boolean;
	themeControls?: boolean;
	src?: string;
	initialStyle?: number;
	layerSetup?(map: mapboxgl.Map): void;
	onContextMenu?(event: any): void;
}

const styles: MapboxStyleDefinition[] = [
	{
		title: 'Dark',
		uri: 'mapbox://styles/mapbox/dark-v11',
	},
	{ title: 'Streets', uri: 'mapbox://styles/mapbox/streets-v12' },
	{ title: 'Satellite', uri: 'mapbox://styles/mapbox/satellite-v9' },
	{
		title: 'Navigation',
		uri: 'mapbox://styles/mapbox/navigation-day-v1',
	},
];

function Map({
	initialOptions = {},
	onMapLoaded,
	onMapRemoved,
	allowFullscreen,
	savePos = true,
	themeControls = true,
	layerSetup,
	src,
	initialStyle,
	onContextMenu,
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
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	// Ref to the map div
	const mapNode = React.useRef(null);

	// Update Query Parameters with position
	React.useEffect(() => {
		if (posSet) return;
		const initialZoom = router.query.z?.toString();
		const initialLat = router.query.lat?.toString();
		const initialLng = router.query.lng?.toString();
		const initialTheme = router.query.theme?.toString();
		if (initialLat && initialLng && initialZoom) {
			map?.flyTo({
				center: [parseFloat(initialLng), parseFloat(initialLat)],
				zoom: parseFloat(initialZoom),
			});
			setPosSet(true);
		}
		if (initialTheme && parseInt(initialTheme) < styles.length) {
			map?.setStyle(styles[parseInt(initialTheme)].uri);
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
			style: initialStyle || scheme.colorScheme == 'dark' ? styles[0].uri : styles[1].uri,
			attributionControl: false,
			zoom: 1,
			antialias: true,
			//@ts-ignore
			projection: 'mercator',
			...initialOptions,
		});

		setMap(mapboxMap);

		mapboxMap.getCanvas().style.cursor = 'default';

		mapboxMap.once('load', async (ev: any) => {
			onMapLoaded && (await onMapLoaded(mapboxMap));
			setLoading(false);

			src &&
				mapLoadGeoJson(
					mapboxMap,
					src,
					'claims',
					'fill',
					'claims-source',
					mapStatusColorPolygon,
					mapStatusColorLine,
				);

			layerSetup && (await layerSetup(mapboxMap));

			if (allowFullscreen) mapboxMap.addControl(new mapboxgl.FullscreenControl());
			if (themeControls)
				mapboxMap.addControl(
					new MapboxStyleSwitcherControl(styles, {
						defaultStyle: scheme.colorScheme == 'dark' ? 'Dark' : 'Light',
					}),
				);

			mapboxMap.addControl(
				new GeolocateControl({
					positionOptions: { enableHighAccuracy: true },
					showUserLocation: true,
				}),
			);
			mapboxMap.addControl(new mapboxgl.NavigationControl());

			mapboxMap.on('style.load', async () => {
				src &&
					mapLoadGeoJson(
						mapboxMap,
						src,
						'claims',
						'fill',
						'claims-source',
						mapStatusColorPolygon,
						mapStatusColorLine,
					);
				layerSetup && (await layerSetup(mapboxMap));
			});
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
			router.push(
				{
					query: {
						...router.query,
						z: zoom,
						lat: pos.lat,
						lng: pos.lng,
					},
				},
				undefined,
				{
					shallow: true,
				},
			);
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
				onContextMenu={onContextMenu}
				style={{
					width: '100%',
					height: '100%',
				}}
			/>
		</div>
	);
}

// Map Event Helper Functions
export function mapCursorHover(map: any, layer: string) {
	map.on('mouseenter', layer, () => {
		map.getCanvas().style.cursor = 'pointer';
	});

	map.on('mouseleave', layer, () => {
		map.getCanvas().style.cursor = '';
	});
}

export function mapClickEvent(map: any, layer: string, callback: (features: any[]) => void) {
	map.on('click', layer, (e: any) => {
		if (e.features.length > 0) {
			callback(e.features);
		}
	});
}

export function mapCopyCoordinates(map: any, clipboard: any) {
	map.on('contextmenu', (e: any) => {
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
	map: mapboxgl.Map,
	url: string,
	layer: string,
	layerType: any,
	source: string,
	paint: any,
	outline?: boolean | any,
) {
	if (!map.getSource(source)) {
		map.addSource(source, {
			type: 'geojson',
			data: url,
		});
	}

	map.addLayer({
		id: layer,
		type: layerType,
		source: source,
		paint: paint,
	});
	if (outline) {
		map.addLayer({
			id: layer + '-outline',
			type: 'line',
			source: source,
			paint: typeof outline == 'boolean' ? paint : outline,
		});
	}
}

// Map Color Helper Functions

export const mapStatusColorPolygon = {
	'fill-color': ['case', ['==', ['get', 'finished'], true], 'rgb(55, 178, 77)', 'rgb(201, 42, 42)'],
	'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.37],
};
export const mapStatusColorLine = {
	'line-color': ['case', ['==', ['get', 'finished'], true], 'rgb(55, 178, 77)', 'rgb(201, 42, 42)'],
	'line-width': 2,
};

export default Map;

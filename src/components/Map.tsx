import 'mapbox-gl/dist/mapbox-gl.css';

import React from 'react';
import mapboxgl from 'mapbox-gl';

function MapboxMap() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_map, setMap] = React.useState<mapboxgl.Map>();

	const mapNode = React.useRef(null);

	React.useEffect(() => {
		const node = mapNode.current;
		if (typeof window === 'undefined' || node === null) return;

		const mapboxMap = new mapboxgl.Map({
			container: node,
			accessToken: process.env.MAPBOX_API_TOKEN,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-122.4, 37.75],
			zoom: 11,
		});

		setMap(mapboxMap);

		return () => {
			mapboxMap.remove();
		};
	}, []);

	return <div ref={mapNode} style={{ width: '100%', height: '90%' }} />;
}

export default MapboxMap;

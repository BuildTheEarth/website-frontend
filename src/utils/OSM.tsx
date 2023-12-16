import {
	IconAerialLift,
	IconBuilding,
	IconBuildingBridge,
	IconFiretruck,
	IconLineDashed,
	IconPin,
	IconPlaneTilt,
	IconRoad,
	IconShip,
	IconTank,
	IconTractor,
	IconTrain,
	IconTree,
} from '@tabler/icons-react';

export function osmTypeToReadable(feature: any): {
	description: string;
	name: string;
	zoom: number;
	icon: any;
	color: string;
} {
	return {
		description: typeToDescription(feature),
		name: typeToName(feature),
		zoom: typeToZoom(feature.properties.osm_key),
		icon: typeToIcon(feature.properties.osm_key),
		color: typeToColor(feature.properties.osm_key),
	};
}

function typeToName(feature: any): string {
	let name = feature.properties.name;

	if (!name) {
		name = typeToAddress(feature);
	}
	return name;
}

function typeToDescription(feature: any): string {
	let name = feature.properties.name;

	if (name) {
		return typeToAddress(feature);
	}

	return 'Address';
}

function typeToAddress(feature: any): string {
	let address = feature.properties.street;

	if (feature.properties.housenumber) {
		if (!address) {
			address = feature.properties.housenumber;
		} else {
			address += ' ' + feature.properties.housenumber;
		}
	}

	if (feature.properties.city) {
		if (!address) {
			address = feature.properties.city;
		} else {
			address += ', ' + feature.properties.city;
		}
	}

	if (feature.properties.country) {
		if (!address) {
			address = feature.properties.country;
		} else {
			address += ', ' + feature.properties.country;
		}
	}

	return address;
}

function typeToZoom(type: string): number {
	switch (type.toLowerCase()) {
		case 'boundary':
			return 10;
		case 'bridge':
			return 13;
		case 'building':
			return 15;
		case 'historic':
			return 15;
		case 'office':
			return 15;
		case 'craft':
			return 12;
		case 'emergency':
			return 15;
		case 'highway':
			return 11;
		case 'military':
			return 13;
		case 'natural':
			return 10;
		case 'railway':
			return 11;
		default:
			return 10;
	}
}

function typeToIcon(type: string): any {
	switch (type.toLowerCase()) {
		case 'aerialway':
			return <IconAerialLift />;
		case 'aeroway':
			return <IconPlaneTilt />;
		case 'boundary':
			return <IconLineDashed />;
		case 'bridge':
			return <IconBuildingBridge />;
		case 'building':
			return <IconBuilding />;
		case 'historic':
			return <IconBuilding />;
		case 'office':
			return <IconBuilding />;
		case 'craft':
			return <IconTractor />;
		case 'emergency':
			return <IconFiretruck />;
		case 'highway':
			return <IconRoad />;
		case 'military':
			return <IconTank />;
		case 'natural':
			return <IconTree />;
		case 'railway':
			return <IconTrain />;
		case 'waterway':
			return <IconShip />;
		default:
			return <IconPin />;
	}
}

function typeToColor(type: string): string {
	switch (type.toLowerCase()) {
		case 'boundary':
			return 'purple';
		case 'historic':
			return 'dark';
		case 'emergency':
			return 'orange';
		case 'highway':
			return 'yellow';
		case 'military':
			return 'green';
		case 'natural':
			return 'lime';
		case 'waterway':
			return 'blue';
		default:
			return 'gray';
	}
}

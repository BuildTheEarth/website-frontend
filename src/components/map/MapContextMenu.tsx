/* eslint-disable react-hooks/exhaustive-deps */

import { MenuDivider, MenuItem, MenuLabel, rem } from '@mantine/core';
import {
	IconBrandBing,
	IconBrandGoogleMaps,
	IconBrandMinecraft,
	IconFile,
	IconMap,
	IconPin,
	IconSquare,
	IconWorld,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ContextMenu, ContextMenuProps } from '../ContextMenu';

import { fromGeoObject } from '@bte-germany/terraconvert';
import { useClipboard } from '@mantine/hooks';
import Link from 'next/link';

interface MapContextMenuProps extends ContextMenuProps {
	oLat?: number | null;
	oLng?: number | null;
}

export function MapContextMenu({
	contextMenuInfo,
	setContextMenuInfo,
	oLat,
	oLng,
}: MapContextMenuProps) {
	const clipboard = useClipboard();
	const [{ lat, lng }, setCoords] = useState({ lat: oLat, lng: oLng });
	const [data, setData] = useState<any>();

	useEffect(() => {
		setCoords({ lat: oLat, lng: oLng });
		if (oLat && oLng) {
			setData({
				mc: fromGeoObject(oLat, oLng),
			});
		}
	}, [contextMenuInfo]);

	return (
		<ContextMenu contextMenuInfo={contextMenuInfo} setContextMenuInfo={setContextMenuInfo}>
			{!(lat && lng && data) ? (
				<MenuItem disabled>No coordinates</MenuItem>
			) : (
				<>
					<MenuLabel>Copy</MenuLabel>
					<MenuItem
						onClick={() => clipboard.copy(`${lat}, ${lng}`)}
						leftSection={<IconPin style={{ width: rem(14), height: rem(14) }} />}
					>
						Coordinates
					</MenuItem>
					<MenuItem
						onClick={() => clipboard.copy(`${data.mc?.x.toFixed(0)} ${data.mc?.z.toFixed(0)}`)}
						disabled={!data.mc}
						leftSection={<IconBrandMinecraft style={{ width: rem(14), height: rem(14) }} />}
					>
						Block Coordinates
					</MenuItem>
					<MenuItem
						onClick={() =>
							clipboard.copy(`${Math.floor(data.mc?.x / 16)} ${Math.floor(data.mc?.z / 16)}`)
						}
						disabled={!data.mc}
						leftSection={<IconSquare style={{ width: rem(14), height: rem(14) }} />}
					>
						Chunk Coordinates
					</MenuItem>
					<MenuItem
						onClick={() =>
							clipboard.copy(
								`r.${Math.floor(data.mc?.x / 16) >> 5}.${Math.floor(data.mc?.z / 16) >> 5}.mca`,
							)
						}
						disabled={!data.mc}
						leftSection={<IconFile style={{ width: rem(14), height: rem(14) }} />}
					>
						Region File Name
					</MenuItem>
					<MenuDivider />
					<MenuLabel>Open</MenuLabel>
					<MenuItem
						component={Link}
						target="_blank"
						href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
						disabled={!data.mc}
						leftSection={<IconBrandGoogleMaps style={{ width: rem(14), height: rem(14) }} />}
					>
						Google Maps
					</MenuItem>
					<MenuItem
						component={Link}
						target="_blank"
						href={`https://bing.com/maps/default.aspx?cp=${lat}~${lng}&lvl=18`}
						disabled={!data.mc}
						leftSection={<IconBrandBing style={{ width: rem(14), height: rem(14) }} />}
					>
						Bing Maps
					</MenuItem>
					<MenuItem
						component={Link}
						target="_blank"
						href={`http://www.openstreetmap.org/?lat=${lat}&lon=${lng}&zoom=18&layers=M`}
						disabled={!data.mc}
						leftSection={<IconMap style={{ width: rem(14), height: rem(14) }} />}
					>
						OpenStreetMaps
					</MenuItem>
					<MenuItem
						component={Link}
						target="_blank"
						href={`https://earth.google.com/web/@${lat},${lng},12400d`}
						disabled={!data.mc}
						leftSection={<IconWorld style={{ width: rem(14), height: rem(14) }} />}
					>
						Google Earth Web
					</MenuItem>
				</>
			)}
		</ContextMenu>
	);
}

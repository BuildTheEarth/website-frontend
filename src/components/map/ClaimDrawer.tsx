import { Alert, Avatar, Button, Center, Drawer, Flex, Group, Loader, ScrollArea, Text } from '@mantine/core';
import { Icon123, IconBuilding, IconCheck, IconCopy, IconCrane, IconDotsCircleHorizontal, IconPencil, IconPin, IconRuler2, IconUser, IconUsersGroup, IconZoomIn } from '@tabler/icons-react';

import { StatsGrid } from '../Stats';
import classes from '../styles/components/Card.module.css';
import { domainToASCII } from 'url';
import { getAreaOfPolygon } from 'geolib';
import mapboxgl from 'mapbox-gl';
import { showNotification } from '@mantine/notifications';
import { useClipboard } from '@mantine/hooks';
import useSWR from 'swr';
import { useUser } from '../../hooks/useUser';

interface ClaimDrawerProps {
	setOpen: (bool: boolean) => void;
	open: boolean;
	id: string | null;
	map?: mapboxgl.Map;
}

export function ClaimDrawer(props: ClaimDrawerProps) {
	const { data, isValidating } = useSWR('/claims/' + props.id);
	const { user } = useUser();
	const clipboard = useClipboard();

	if (props.id == null) return <></>;

	return (
		<Drawer opened={props.open} onClose={() => props.setOpen(false)} title={`Claim Details`} size="md" overlayProps={{ blur: 3 }} lockScroll scrollAreaComponent={ScrollArea.Autosize}>
			{isValidating || !data ? (
				<Center h="100%" w="100%">
					<Loader mt={'xl'} />
				</Center>
			) : (
				<>
					<StatsGrid title="Name" icon={IconPin} paperProps={{ mb: 'md' }}>
						{data.name}
					</StatsGrid>
					{!data.finished && (
						<Alert color="red" mb="md" radius="md" title="Claim Status" icon={<IconCrane />}>
							This Claim is still under construction and not completed yet.
						</Alert>
					)}
					<StatsGrid title="Team" icon={IconUsersGroup} paperProps={{ mb: 'md' }}>
						<Flex justify="flex-start" align="center" direction="row" wrap="wrap" gap="md">
							<Avatar src={data.buildTeam.icon} size={60} component="a" href={`/teams/${data.buildTeam.id}`} />
							<Text size="xl" fw={700}>
								{data.buildTeam.name}
							</Text>
						</Flex>
					</StatsGrid>
					<StatsGrid title="Owner" icon={IconUser} paperProps={{ mb: 'md' }}>
						<Flex justify="flex-start" align="center" direction="row" wrap="wrap" gap="md">
							<Avatar size={60}>{data.owner.name?.at(0)}</Avatar>
							<Text size="xl" fw={700}>
								{data.owner.name}
							</Text>
						</Flex>
					</StatsGrid>
					{data.builders && (
						<StatsGrid title="Builders" icon={IconUsersGroup} paperProps={{ mb: 'md' }}>
							<Avatar.Group>
								{data.builders.slice(0, 4).map((b: any) => (
									<Avatar key={b.id}>{b?.name?.at(0)}</Avatar>
								))}
								{data.builders.length > 4 && <Avatar>+{data.builders.length - 4}</Avatar>}
							</Avatar.Group>
						</StatsGrid>
					)}
					<StatsGrid title="Area" icon={IconRuler2} paperProps={{ mb: 'md' }} isText>
						{Math.round(getAreaOfPolygon(data.area.map((p: string) => p.split(', ').map(Number)))).toLocaleString()} m²
					</StatsGrid>
					<Group grow>
						<Button
							leftSection={<IconCopy />}
							onClick={() => {
								const coords = data.center.split(', ');
								clipboard.copy(coords[1] + ', ' + coords[0]);
								showNotification({
									title: 'Coordinates copied',
									message: 'Paste them anywhere.',
									icon: <IconCheck size={18} />,
									color: 'teal',
								});
							}}
						>
							Copy Coordinates
						</Button>
						{props.map && (
							<Button
								leftSection={<IconZoomIn />}
								onClick={() => {
									props.map?.flyTo({ center: data.center.split(', ').map(Number), zoom: 15 });
								}}
							>
								Zoom to fit
							</Button>
						)}
					</Group>
					{data.owner?.id == user?.id && (
						<Button component="a" variant="outline" leftSection={<IconPencil />} href={`/me/claims/${props.id}`} mt="md" fullWidth>
							Edit Claim
						</Button>
					)}
				</>
			)}
		</Drawer>
	);
}

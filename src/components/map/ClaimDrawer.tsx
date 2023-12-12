import {
	Alert,
	Avatar,
	Button,
	Center,
	Drawer,
	Flex,
	Group,
	Loader,
	ScrollArea,
	Text,
} from '@mantine/core';
import {
	IconCheck,
	IconCopy,
	IconCrane,
	IconLink,
	IconPencil,
	IconPin,
	IconRuler2,
	IconUser,
	IconUsersGroup,
	IconZoomIn,
} from '@tabler/icons-react';

import { useClipboard } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { getAreaOfPolygon } from 'geolib';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import { useUser } from '../../hooks/useUser';
import { StatsGrid } from '../Stats';

interface ClaimDrawerProps {
	setOpen: (bool: boolean) => void;
	open: boolean;
	id: string | null;
	map?: mapboxgl.Map;
	t: any;
}

export function ClaimDrawer(props: ClaimDrawerProps) {
	const { data, isLoading } = useSWR('/claims/' + props.id);
	const { user } = useUser();
	const t = props.t;
	const clipboard = useClipboard();

	if (props.id == null) return <></>;

	return (
		<Drawer
			opened={props.open}
			onClose={() => props.setOpen(false)}
			title={t('claim.details.title')}
			size="md"
			overlayProps={{ blur: 3 }}
			lockScroll
			scrollAreaComponent={ScrollArea.Autosize}
		>
			{isLoading || !data ? (
				<Center h="100%" w="100%">
					<Loader mt={'xl'} />
				</Center>
			) : (
				<>
					<StatsGrid title={t('claim.details.name')} icon={IconPin} paperProps={{ mb: 'md' }}>
						{data.name}
					</StatsGrid>
					{!data.finished && (
						<Alert
							color="red"
							mb="md"
							radius="md"
							title={t('claim.details.status.title')}
							icon={<IconCrane />}
						>
							{t('claim.details.status.description')}
						</Alert>
					)}
					<StatsGrid
						title={t('claim.details.team')}
						icon={IconUsersGroup}
						paperProps={{ mb: 'md' }}
					>
						<Flex justify="flex-start" align="center" direction="row" wrap="wrap" gap="md">
							<Avatar
								src={data.buildTeam.icon}
								size={60}
								component="a"
								href={`/teams/${data.buildTeam.id}`}
							/>
							<Text size="xl" fw={700}>
								{data.buildTeam.name}
							</Text>
						</Flex>
					</StatsGrid>
					<StatsGrid title={t('claim.details.owner')} icon={IconUser} paperProps={{ mb: 'md' }}>
						<Flex justify="flex-start" align="center" direction="row" wrap="wrap" gap="md">
							<Avatar size={60}>{data.owner.name?.at(0)}</Avatar>
							<Text size="xl" fw={700}>
								{data.owner.name}
							</Text>
						</Flex>
					</StatsGrid>
					{data.builders && (
						<StatsGrid
							title={t('claim.details.builders')}
							icon={IconUsersGroup}
							paperProps={{ mb: 'md' }}
						>
							<Avatar.Group>
								{data.builders.slice(0, 4).map((b: any) => (
									<Avatar key={b.id}>{b?.name?.at(0)}</Avatar>
								))}
								{data.builders.length > 4 && <Avatar>+{data.builders.length - 4}</Avatar>}
							</Avatar.Group>
						</StatsGrid>
					)}
					<StatsGrid
						title={t('claim.details.area')}
						icon={IconRuler2}
						paperProps={{ mb: 'md' }}
						isText
					>
						{Math.round(
							getAreaOfPolygon(data.area.map((p: string) => p.split(', ').map(Number))),
						).toLocaleString()}{' '}
						m²
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
							{t('claim.details.actions.coordinates')}
						</Button>
						{props.map && (
							<Button
								leftSection={<IconZoomIn />}
								onClick={() => {
									props.map?.flyTo({ center: data.center.split(', ').map(Number), zoom: 15 });
								}}
							>
								{t('claim.details.actions.zoom')}
							</Button>
						)}
					</Group>
					<Group grow mt="md">
						<Button
							leftSection={<IconLink />}
							variant="outline"
							onClick={() => {
								clipboard.copy('https://beta.buildtheearth.net/map?claim=' + data.id);
								showNotification({
									title: 'Link copied',
									message: 'Share it anywhere.',
									icon: <IconCheck size={18} />,
									color: 'teal',
								});
							}}
						>
							{t('claim.details.actions.link')}
						</Button>
						{data.owner?.id == user?.id && (
							<Button
								component="a"
								variant="outline"
								leftSection={<IconPencil />}
								href={`/me/claims/${props.id}`}
								disabled={!data?.buildTeam?.allowBuilderClaim}
							>
								{t('claim.details.actions.edit')}
							</Button>
						)}
					</Group>
				</>
			)}
		</Drawer>
	);
}

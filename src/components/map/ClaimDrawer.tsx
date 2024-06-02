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
	Title,
	Tooltip,
} from '@mantine/core';
import {
	IconAddressBook,
	IconBuilding,
	IconBuildingCommunity,
	IconCheck,
	IconCopy,
	IconCrane,
	IconInfoCircle,
	IconLink,
	IconPencil,
	IconPin,
	IconRuler2,
	IconUser,
	IconUsersGroup,
	IconZoomIn,
} from '@tabler/icons-react';

import { usePermissions } from '@/hooks/usePermissions';
import { useUser } from '@/hooks/useUser';
import { useClipboard } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import mapboxgl from 'mapbox-gl';
import Link from 'next/link';
import useSWR from 'swr';
import { StatsGrid } from '../Stats';
import { ClaimDrawerImages } from './ClaimDrawerImages';

interface ClaimDrawerProps {
	setOpen: (bool: boolean) => void;
	open: boolean;
	id: string | null;
	map?: mapboxgl.Map;
	t: any;
}

export function ClaimDrawer(props: ClaimDrawerProps) {
	const { data, isLoading } = useSWR('/claims/' + props.id + '?builders=true');
	const { user } = useUser();
	const permissions = usePermissions();
	const t = props.t;
	const clipboard = useClipboard();

	if (props.id == null) return <></>;

	return (
		<Drawer
			opened={props.open}
			onClose={() => props.setOpen(false)}
			title={t('claim.details.title')}
			zIndex={9999}
			size="md"
			overlayProps={{ opacity: 0.5 }}
			scrollAreaComponent={ScrollArea.Autosize}
		>
			{isLoading || !data ? (
				<Center h="100%" w="100%">
					<Loader mt={'xl'} />
				</Center>
			) : (
				<>
					{data.images && (
						<ClaimDrawerImages id={props.id} images={data.images} editable={false} t={t} />
					)}
					{!data.finished && (
						<Alert
							color="red"
							mb="md"
							radius="md"
							title={t('claim.details.status.title')}
							icon={<IconCrane />}
							variant="outline"
						>
							{t('claim.details.status.description')}
						</Alert>
					)}
					{data.city != data.name && (
						<StatsGrid title={t('claim.details.name')} icon={IconPin} paperProps={{ mb: 'md' }}>
							<Title order={3} lineClamp={2}>
								{data.name}
							</Title>
						</StatsGrid>
					)}
					{data.city && (
						<StatsGrid
							title={t('claim.details.city')}
							icon={IconBuildingCommunity}
							paperProps={{ mb: 'md' }}
							isText
						>
							{data.city}
						</StatsGrid>
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
								component={Link}
								href={`/teams/${data.buildTeam.slug}`}
								alt={data.buildTeam.name + ' Logo'}
							/>
							<Text size="xl" fw={700}>
								{data.buildTeam.name}
							</Text>
						</Flex>
					</StatsGrid>
					{data.owner?.id && (
						<StatsGrid title={t('claim.details.owner')} icon={IconUser} paperProps={{ mb: 'md' }}>
							<Flex justify="flex-start" align="center" direction="row" wrap="wrap" gap="md">
								<Avatar size={60} alt={data.owner.username + 's Avatar'} color="teal">
									{' '}
									{data.owner.username?.at(0).toUpperCase()}
								</Avatar>
								<Text size="xl" fw={700}>
									{data.owner.username}
								</Text>
							</Flex>
						</StatsGrid>
					)}
					{data.description && (
						<StatsGrid
							title={t('claim.details.description')}
							icon={IconInfoCircle}
							paperProps={{ mb: 'md' }}
						>
							<Text lineClamp={10} fz="sm">
								{data.description}
							</Text>
						</StatsGrid>
					)}
					{data.builders.length > 0 && (
						<StatsGrid
							title={t('claim.details.builders')}
							icon={IconUsersGroup}
							paperProps={{ mb: 'md' }}
						>
							<Avatar.Group>
								{data.builders.map((b: any) => (
									<Tooltip label={b?.username || 'Username is not defined'} key={b.id}>
										<Avatar
											alt={b?.username + 's Avatar'}
											color="grape"
											aria-label={b?.username || 'Username is not defined'}
										>
											{b?.username?.at(0).toUpperCase()}
										</Avatar>
									</Tooltip>
								))}
								{data._count?.builders > 10 && <Avatar>+{data._count.builders - 10}</Avatar>}
							</Avatar.Group>
						</StatsGrid>
					)}
					<StatsGrid
						title={t('claim.details.buildings')}
						icon={IconBuilding}
						paperProps={{ mb: 'md' }}
						isText
					>
						{data.buildings}
					</StatsGrid>
					<StatsGrid
						title={t('claim.details.area')}
						icon={IconRuler2}
						paperProps={{ mb: 'md' }}
						isText
					>
						{data.size?.toLocaleString()}
						m²
					</StatsGrid>
					<StatsGrid
						title={t('claim.details.address')}
						icon={IconAddressBook}
						paperProps={{ mb: 'md' }}
					>
						<Text lineClamp={10} fz="sm">
							{data.osmName}
						</Text>
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
								clipboard.copy('https://buildtheearth.net/map?claim=' + data.id);
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
						{(data.owner?.id == user?.id ||
							permissions.has('team.claim.list', data.buildTeam.id)) && (
							<Button
								component={Link}
								variant="outline"
								leftSection={<IconPencil />}
								href={`/map/edit/?id=${props.id}`}
								// disabled={!data?.buildTeam?.allowBuilderClaim}
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

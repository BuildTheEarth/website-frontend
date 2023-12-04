import { Alert, Anchor, Button, Grid, Group, Switch, TextInput } from '@mantine/core';
import {
	IconAlertCircle,
	IconCheck,
	IconChevronLeft,
	IconDeviceFloppy,
	IconQuestionMark,
} from '@tabler/icons-react';

import Map from '../../../components/map/Map';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { NextPage } from 'next';
import Page from '../../../components/Page';
import fetcher from '../../../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../hooks/useUser';

const ClaimPage: NextPage = ({ claimId, data }: any) => {
	const [polygon, setPolygon] = useState<any>({
		type: 'Feature',
		id: data?.id,
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [data?.area.map((p: string) => p.split(', ').map(Number))],
		},
	});
	const [draw, setDraw] = useState(new MapboxDraw({ displayControlsDefault: false }));
	const { t } = useTranslation('map');
	const user = useUser();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [additionalData, setAdditionalData] = useState({
		name: data.name,
		id: data.id,
		finished: data.finished,
		active: data.active,
	});

	const editData = (property: string, value: any) => {
		setAdditionalData({ ...additionalData, [property]: value });
	};

	const handleSubmit = () => {
		setLoading(true);
		fetch(process.env.NEXT_PUBLIC_API_URL + `/claims/${additionalData.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify({ ...additionalData, area: polygon.geometry.coordinates[0] }),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					showNotification({
						title: 'Update failed',
						message: res.error,
						color: 'red',
					});
					setLoading(false);
				} else {
					showNotification({
						title: 'Claim updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					setAdditionalData({ ...data, ...res });
					setLoading(false);
				}
			});
	};

	return (
		<Page
			head={{
				title: t('edit.title'),
				image: 'https://cdn.buildtheearth.net/static/thumbnails/me.png',
			}}
			smallPadding
			requiredPermissions={['account.edit', 'account.info']}
			loading={!data}
		>
			{!data ? (
				<></>
			) : (
				<Grid>
					<Grid.Col span={{ md: 6 }}>
						<TextInput
							label={t('edit.name')}
							required
							defaultValue={additionalData.name}
							onChange={(e) => editData('name', e.target.value)}
							mb="md"
						/>
						<Switch
							defaultChecked={additionalData.finished}
							label={t('edit.finished')}
							onChange={(e) => editData('finished', e.target.checked)}
							mb="md"
						/>
						<Switch
							defaultChecked={additionalData.active}
							label={t('edit.active')}
							onChange={(e) => editData('active', e.target.checked)}
							mb="md"
						/>
						<h3>{t('edit.builders.title')}</h3>
						<Alert
							variant="light"
							color="yellow"
							mb="xl"
							icon={<IconAlertCircle />}
							title={t('edit.builders.alert')}
						>
							{t('edit.builders.description')}
						</Alert>
						<Group>
							<Button
								variant="outline"
								component="a"
								href={
									router.query.z && router.query.lat && router.query.lng
										? `/map?z=${router.query.z}&lat=${router.query.lat}&lng=${router.query.lng}`
										: '/map'
								}
								leftSection={<IconChevronLeft />}
							>
								{t('common:button.back')}
							</Button>
							<Button
								onClick={handleSubmit}
								disabled={!user?.token}
								loading={loading}
								leftSection={<IconDeviceFloppy />}
							>
								{t('common:button.save')}
							</Button>
						</Group>
						<Alert
							variant="light"
							color="blue"
							mt="xl"
							icon={<IconQuestionMark />}
							title={t('edit.help.title')}
						>
							{t('edit.help.description')}
							<br />
							<Anchor
								href="https://docs.buildtheearth.net/docs/building/guidebook/"
								target="_blank"
							>
								https://docs.buildtheearth.net
							</Anchor>
						</Alert>
					</Grid.Col>
					<Grid.Col span={{ md: 6 }}>
						<div style={{ height: '100%', width: '100%', minHeight: '50vh' }}>
							<Map
								initialOptions={{ center: data?.center.split(', ').map(Number), zoom: 12 }}
								layerSetup={(map) => {
									map.addControl(draw, 'top-right');
									draw.add(polygon);
									draw.changeMode('direct_select', { featureId: polygon.id });
								}}
								onMapLoaded={(map) => {
									map.on('draw.update', (e) => setPolygon(e.features[0]));
								}}
							/>
						</div>
					</Grid.Col>
				</Grid>
			)}
		</Page>
	);
};

export default ClaimPage;

export async function getServerSideProps(context: any) {
	const res = await fetcher('/claims/' + context.query.id);
	return {
		props: {
			claimId: context.query.id,
			data: res,
			...(await serverSideTranslations(context.locale, ['common', 'map'])),
		},
	};
}

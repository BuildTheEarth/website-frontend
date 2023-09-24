import {
	ActionIcon,
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	Group,
	Input,
	Select,
	Switch,
	TextInput,
	Textarea,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons';
import { useEffect, useState } from 'react';

import Page from '../../../../components/Page';
import RTE from '../../../../components/RTE';
import SettingsTabs from '../../../../components/SettingsTabs';
import fetcher from '../../../../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useUser } from '../../../../hooks/useUser';
import { v4 as uuidv4 } from 'uuid';

const Settings = ({ data: tempData }: any) => {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const user = useUser();
	const [data, setData] = useState(tempData);
	const [allowSocial, setAllowSocial] = useState(false);
	const [allowSettings, setAllowSettings] = useState(false);

	useEffect(() => {
		if (!user.isLoading) {
			setAllowSettings(user.hasPermission('team.settings.edit'));
			setAllowSocial(user.hasPermission('team.socials.edit'));
		}
	}, [user]);

	const handleSave = (e: any) => {
		e.preventDefault();
		const uploadingData = { ...data, socials: undefined, _count: undefined };
		console.log(uploadingData);
		fetch(process.env.NEXT_PUBLIC_API_URL + `/buildteams/${uploadingData.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify(uploadingData),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.errors) {
					showNotification({
						title: 'Update failed',
						message: res.error,
						color: 'red',
					});
				} else {
					showNotification({
						title: 'Settings updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					console.log(res);
					setData({ ...data, ...res });
				}
			});
	};

	const handleUpdate = (id: string, d: any) => {
		const updatedData = { ...data };
		updatedData[id] = d;
		setData(updatedData);
	};
	const handleAddSocial = (d: any) => {
		const updatedSocial = [...data.socials, d];

		setData({ ...data, socials: updatedSocial });
	};
	const handleDeleteSocial = (id: string) => {
		const updatedSocial = data.socials.filter((d: any) => d.id !== id);
		setData({ ...data, socials: updatedSocial });
	};
	const handleUpdateSocial = (i: number, id: string, d: any) => {
		const updatedData = { ...data };
		updatedData.socials[i][id] = d;

		setData(updatedData);
	};

	return (
		<Page
			smallPadding
			head={{
				title: 'Settings',
				image: 'https://cdn.buildtheearth.net/static/placeholder.webp',
			}}
			seo={{ nofollow: true, noindex: true }}
		>
			<SettingsTabs team={data?.id}>
				{data && (
					<>
						<form onSubmit={handleSave}>
							<h3>General Settings</h3>
							<Grid grow>
								<Grid.Col span={{ md: 6 }}>
									<TextInput
										required
										label="BuildTeam Name"
										description="The name that should be displayed on the Build Team List."
										mb="md"
										defaultValue={data.name}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('name', e.target.value)}
									/>
									<TextInput
										required
										label="Logo URL"
										description="The logo that should be displayed on the Build Team List."
										mb="md"
										defaultValue={data.icon}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('icon', e.target.value)}
									/>
									<TextInput
										required
										label="Background Image URL"
										description="The background image that should be displayed on the Build Team Page."
										mb="md"
										defaultValue={data.backgroundImage}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('backgroundImage', e.target.value)}
									/>
									<TextInput
										required
										label="Locations"
										description="A comma seperated list of countries that the Build Team is building in. If its a global Build Team this should be set to `Global`"
										mb="md"
										defaultValue={data.location}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('location', e.target.value)}
									/>
									<Switch
										label="Trial Applications"
										description="If new Users should be able to apply as Trial to the Build Team and then build their builder application builds on the Build Team´s server."
										defaultChecked={data.allowTrial}
										mb="md"
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('allowTrial', e.target.checked)}
									/>
								</Grid.Col>
								<Grid.Col span={{ md: 6 }}>
									<Input.Wrapper label="About" mt="md" description="The about section on the Build Team Page." mb="md">
										<RTE
											style={{
												root: {
													marginTop: '5px',
												},
												content: {
													backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
												},
												toolbar: {
													backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
												},
											}}
											value={data.about}
											onChange={(e) => allowSettings && handleUpdate('about', e)}
										/>
									</Input.Wrapper>
									<TextInput
										required
										label="Build Team Slug"
										description="A short form of the Build Team name that can be used in the URL. Has to be unique, coordinate with BTE Staff. Use the countrie´s two-letter code if possible."
										defaultValue={data.slug}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('slug', e.target.value)}
									/>
								</Grid.Col>
							</Grid>
							<h4>Messages</h4>
							<Grid grow>
								<Grid.Col span={{ md: 6 }}>
									<Textarea
										label="Acception Message"
										mb="md"
										description="The Message the Discord Bot should send Users if they get accepted as Builders."
										defaultValue={data.acceptionMessage}
										minRows={9}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('acceptionMessage', e.target.value)}
									/>
								</Grid.Col>
								<Grid.Col span={{ md: 6 }}>
									<Textarea
										label="Rejection Message"
										mb="md"
										description="The Message the Discord Bot should send Users if they get rejected from beeing a Builders."
										defaultValue={data.rejectionMessage}
										minRows={9}
										disabled={!allowSettings}
										onChange={(e) => handleUpdate('rejectionMessage', e.target.value)}
									/>
								</Grid.Col>
							</Grid>
							<Textarea
								label="Trial Acception Message"
								mb="md"
								disabled={!allowSettings || !data.allowTrial}
								description="The Message the Discord Bot should send Users if they get accepted as Trials."
								defaultValue={data.trialMessage}
								placeholder="Trial Applcations disabled"
								minRows={9}
								style={{ maxWidth: '49.5%' }}
								onChange={(e) => handleUpdate('trialMessage', e.target.value)}
							/>
							<Button type="submit" disabled={!allowSettings}>
								Save
							</Button>
						</form>
						<Divider mt="md" />
						<h3>Socials</h3>
						<form>
							<Button
								leftSection={<IconPlus />}
								mb="md"
								onClick={() => handleAddSocial({ id: uuidv4(), buildTeamId: data.id })}
								disabled={!allowSocial}
							>
								Add Social Link
							</Button>
							{data.socials.map((social: any, i: number) => (
								<Group grow key={social.id} mb="md" style={{ alignItems: 'flex-end', display: 'flex' }}>
									<Select
										required
										label="Type"
										placeholder="Select Type"
										searchable
										nothingFoundMessage="No Types Found"
										data={[
											{ value: 'discord', label: 'Discord' },
											{ value: 'twitter', label: 'Twitter' },
											{ value: 'instagram', label: 'Instagram' },
											{ value: 'youtube', label: 'Youtube' },
											{ value: 'twitch', label: 'Twitch' },
											{ value: 'tiktok', label: 'TikTok' },
											{ value: 'website', label: 'Website' },
										]}
										defaultValue={social.icon}
										disabled={!allowSocial}
										onChange={(e) => handleUpdateSocial(i, 'icon', e)}
									/>
									<TextInput
										required
										label="Social Name"
										defaultValue={social.name}
										disabled={!allowSocial}
										onChange={(e) => handleUpdateSocial(i, 'name', e.target.value)}
									/>
									<TextInput
										required
										label="URL"
										defaultValue={social.url}
										disabled={!allowSocial}
										onChange={(e) => handleUpdateSocial(i, 'url', e.target.value)}
									/>
									<Button
										variant="outline"
										style={{ width: '80%' }}
										leftSection={<IconTrash />}
										disabled={!allowSocial}
										onClick={() => handleDeleteSocial(social.id)}
									>
										Delete
									</Button>
								</Group>
							))}
							<Button type="submit" disabled={!allowSocial}>
								Save
							</Button>
						</form>
					</>
				)}
			</SettingsTabs>
		</Page>
	);
};

export default Settings;
export async function getStaticProps({ locale, params }: any) {
	const res = await fetcher(`/buildteams/${params.team}`);
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
			data: res,
		},
	};
}

export async function getStaticPaths() {
	const res = await fetcher('/buildteams');
	return {
		paths: res.map((team: any) => ({
			params: {
				team: team.id,
			},
		})),
		fallback: true,
	};
}

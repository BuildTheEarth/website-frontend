import {
	ActionIcon,
	Box,
	Button,
	Divider,
	Flex,
	Group,
	Select,
	Switch,
	TextInput,
	Textarea,
	useMantineTheme,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons';

import Page from '../../../../components/Page';
import SettingsTabs from '../../../../components/SettingsTabs';
import fetcher from '../../../../utils/Fetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Settings = ({ data: tempData }: any) => {
	const theme = useMantineTheme();
	const router = useRouter();
	const [data, setData] = useState(tempData);

	const handleSave = () => {
		console.log(data);
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
				image: '/images/placeholder.webp',
			}}
			seo={{ nofollow: true, noindex: true }}
		>
			<SettingsTabs>
				{data && (
					<form onSubmit={handleSave}>
						<h3>General Settings</h3>
						<Group grow>
							<div>
								<TextInput
									required
									label="BuildTeam Name"
									description="The name that should be displayed on the Build Team List."
									mb="md"
									defaultValue={data.name}
									onChange={(e) => handleUpdate('title', e.target.value)}
								/>
								<TextInput
									required
									label="Logo URL"
									description="The logo that should be displayed on the Build Team List."
									mb="md"
									defaultValue={data.icon}
									onChange={(e) => handleUpdate('icon', e.target.value)}
								/>
								<TextInput
									required
									label="Background Image URL"
									description="The background image that should be displayed on the Build Team Page."
									mb="md"
									defaultValue={data.backgroundImage}
									onChange={(e) => handleUpdate('backgroundImage', e.target.value)}
								/>
								<TextInput
									required
									label="Locations"
									description="A comma seperated list of countries that the Build Team is building in. If its a global Build Team this should be set to `Global`"
									mb="md"
									defaultValue={data.location}
									onChange={(e) => handleUpdate('location', e.target.value)}
								/>
								<Switch
									label="Trial Applications"
									description="If new Users should be able to apply as Trial to the Build Team and then build their builder application builds on the Build Team´s server."
									defaultChecked={data.allowTrial}
									mb="md"
									onChange={(e) => handleUpdate('allowTrial', e.target.checked)}
								/>
							</div>
							<div>
								<Textarea
									label="About Build Team"
									mb="md"
									description="The about section on the Build Team Page."
									defaultValue={data.about}
									minRows={9}
									onChange={(e) => handleUpdate('about', e.target.value)}
								/>
								<TextInput
									required
									label="Build Team Slug"
									description="A short form of the Build Team name that can be used in the URL. Has to be unique, coordinate with BTE Staff. Use the countrie´s two-letter code if possible."
									defaultValue={data.slug}
									onChange={(e) => handleUpdate('slug', e.target.value)}
								/>
							</div>
						</Group>
						<Divider />
						<h3>Socials</h3>
						<Button
							leftIcon={<IconPlus />}
							mb="md"
							onClick={() => handleAddSocial({ id: uuidv4(), buildTeamId: data.id })}
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
									nothingFound="No Types Found"
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
									onChange={(e) => handleUpdateSocial(i, 'icon', e)}
								/>
								<TextInput
									required
									label="Social Name"
									defaultValue={social.name}
									onChange={(e) => handleUpdateSocial(i, 'name', e.target.value)}
								/>
								<TextInput
									required
									label="URL"
									defaultValue={social.url}
									onChange={(e) => handleUpdateSocial(i, 'url', e.target.value)}
								/>
								<Button
									variant="outline"
									style={{ maxWidth: '12%' }}
									leftIcon={<IconTrash />}
									onClick={() => handleDeleteSocial(social.id)}
								>
									Delete
								</Button>
							</Group>
						))}
						<Divider />
						<h3>Messages</h3>
						<Group grow>
							<Textarea
								label="Acception Message"
								mb="md"
								description="The Message the Discord Bot should send Users if they get accepted as Builders."
								defaultValue={data.acceptionMessage}
								minRows={9}
								onChange={(e) => handleUpdate('acceptionMessage', e.target.value)}
							/>

							<Textarea
								label="Rejection Message"
								mb="md"
								description="The Message the Discord Bot should send Users if they get rejected from beeing a Builders."
								defaultValue={data.rejectionMessage}
								minRows={9}
								onChange={(e) => handleUpdate('rejectionMessage', e.target.value)}
							/>
						</Group>
						<Textarea
							label="Trial Acception Message"
							mb="md"
							disabled={!data.allowTrial}
							description="The Message the Discord Bot should send Users if they get accepted as Trials."
							defaultValue={data.trialMessage}
							minRows={9}
							style={{ maxWidth: '49.5%' }}
							onChange={(e) => handleUpdate('trialMessage', e.target.value)}
						/>
						<Button type="submit">Save</Button>
					</form>
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

/*
 name,
      icon,
      backgroundImage,
      socials,
      invite,
      about,
      location,
      slug,*/

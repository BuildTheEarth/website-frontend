/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Badge, Button, Card, Flex, Group, Tabs, Text, TextInput, Title, rem } from '@mantine/core';
import { IconAlertCircle, IconBroadcast, IconBrowser, IconCheck, IconDeviceFloppy, IconKey, IconLink, IconReload, IconSettings } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

import { Discord } from '@icons-pack/react-simple-icons';
import { NextPage } from 'next';
import Page from '../../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../hooks/useUser';

const Settings: NextPage = ({ type }: any) => {
	const user = useUser();
	const { data, isLoading } = useSWR(`/users/${user?.user?.id}/kc`);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation('me');

	const form = useForm({});

	useEffect(() => {
		if (!isLoading) form.setValues({ username: data.username, email: data.email, avatar: data.avatar, firstName: data.firstName, lastName: data.lastName, name: data.name });
	}, [isLoading]);

	const handleSubmit = (e: any) => {
		setLoading(true);
		fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${user?.user?.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user.token,
			},
			body: JSON.stringify(e),
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
						title: 'Settings updated',
						message: 'All Data has been saved',
						color: 'green',
						icon: <IconCheck />,
					});
					setLoading(false);
				}
			});
	};

	return (
		<Page
			head={{
				title: 'Account Settings',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/me.png',
			}}
			requiredPermissions={['account.edit', 'account.info']}
			loading={!data}
		>
			<Tabs value={type} onChange={(v) => router.push({ query: { type: v } })}>
				<Tabs.List>
					<Tabs.Tab value="general" leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
						Profile Information
					</Tabs.Tab>
					<Tabs.Tab value="security" leftSection={<IconKey style={{ width: rem(14), height: rem(14) }} />}>
						Security Details
					</Tabs.Tab>
					<Tabs.Tab value="accounts" leftSection={<IconLink style={{ width: rem(14), height: rem(14) }} />}>
						Linked Accounts
					</Tabs.Tab>
					<Tabs.Tab value="session" leftSection={<IconBroadcast style={{ width: rem(14), height: rem(14) }} />}>
						Active Sessions
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="general" mt="md">
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput label="Username" {...form.getInputProps('username')} required placeholder="johnDoe" />
						<Group grow mt="md">
							<TextInput label="First Name" {...form.getInputProps('firstName')} placeholder="John" />
							<TextInput label="Last Name" {...form.getInputProps('lastName')} placeholder="Doe" />
						</Group>
						<TextInput label="Email" {...form.getInputProps('email')} required mt="md" placeholder="john.doe@mail.com" />
						<TextInput label="Minecraft Username" {...form.getInputProps('name')} mt="md" placeholder="notch" />
						<TextInput label="Avatar" {...form.getInputProps('avatar')} mt="md" placeholder="https://..." />
						<Group mt="md">
							<Button type="submit" leftSection={<IconDeviceFloppy />} loading={loading}>
								{t('common:button.save')}
							</Button>
							<Button
								variant="outline"
								onClick={() => {
									form.reset();
									form.setValues({ username: data.username, email: data.email, avatar: data.avatar, firstName: data.firstName, lastName: data.lastName, name: data.name });
								}}
								leftSection={<IconReload />}
								loading={loading}
							>
								{t('common:button.reset')}
							</Button>
						</Group>
					</form>
				</Tabs.Panel>

				<Tabs.Panel value="security" mt="md">
					<Alert color="red" icon={<IconAlertCircle />} title={t('settings.security.alert')}>
						{t('settions.security.description')}
					</Alert>
				</Tabs.Panel>

				<Tabs.Panel value="accounts" mt="md">
					<DiscordLinkedAccount isLinked={data.federatedIdentities.filter((i: any) => i.identityProvider === 'discord').length > 0} data={data.federatedIdentities.filter((i: any) => i.identityProvider === 'discord')[0]} reload={() => mutate(`/users/${user?.user?.id}/kc`)} />
				</Tabs.Panel>
				<Tabs.Panel value="session" mt="md">
					{data.sessions?.map((s: any, i: number) => (
						<Card mb={'md'} withBorder key={i}>
							<Flex align={'center'} gap={'md'}>
								<IconBrowser />
								<Flex gap={5} direction={'column'} style={{ flex: 1 }}>
									<Flex align={'center'} gap={'xs'}>
										<Text fw={'bold'}>{s.ipAddress}</Text>
									</Flex>
									<Text fw="bold" size="sm">
										Start:{' '}
										<Text c="dimmed" span>
											{new Date(s.start).toLocaleDateString()}
										</Text>{' '}
										Last Seen:{' '}
										<Text c="dimmed" span>
											{new Date(s.lastAccess).toLocaleDateString()}
										</Text>
									</Text>
								</Flex>
							</Flex>
						</Card>
					))}
				</Tabs.Panel>
			</Tabs>
		</Page>
	);
};

export default Settings;

export async function getServerSideProps({ locale, params }: any) {
	return {
		props: {
			type: params.type,
			...(await serverSideTranslations(locale, ['common', 'me'])),
		},
	};
}

const DiscordLinkedAccount = ({ isLinked, data, sessionData, reload }: any) => {
	// const [discordLinkUrl, setDiscordLinkUrl] = useState('');
	// const { data: session } = useSession();
	// const [unlinkLoading, setUnlinkLoading] = useState(false);

	// async function hash(string: string) {
	// 	const utf8 = new TextEncoder().encode(string);
	// 	const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
	// 	const base64Hash = Buffer.from(hashBuffer).toString('base64');
	// 	return base64Hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	// }

	// const generateDiscordLinkURL = async () => {
	// 	const nonce = crypto.randomUUID();
	// 	const input = nonce + session?.user.session_state + session?.user.azp + 'discord';
	// 	console.log('input', input);
	// 	const digest = await hash(input);
	// 	const link = `https://auth.buildtheearth.net/realms/website/broker/discord/link?client_id=frontend&redirect_uri=${encodeURIComponent(window.location.href)}&nonce=${nonce}&hash=${digest}`;
	// 	setDiscordLinkUrl(link);
	// 	console.log(discordLinkUrl, link);
	// };

	// const unlink = async () => {
	// 	setUnlinkLoading(true);
	// 	await axios.delete(`https://auth.buildtheearth.net/realms/website/account/linked-accounts/discord`, { headers: { authorization: 'Bearer ' + sessionData.accessToken } });
	// 	await reload();
	// 	setUnlinkLoading(false);
	// };

	// useEffect(() => {
	// 	generateDiscordLinkURL();
	// }, []);

	return (
		<Card mb={'md'} withBorder>
			<Flex align={'center'} gap={'md'}>
				<Discord />
				<Flex gap={5} direction={'column'} style={{ flex: 1 }}>
					<Flex align={'center'} gap={'xs'}>
						<Text fw={'bold'}>Discord</Text>
						{!isLinked && (
							<Badge gradient={{ from: 'orange', to: 'yellow' }} variant="gradient">
								Not Linked
							</Badge>
						)}
					</Flex>
					{isLinked && <Text>{data.userName}</Text>}
				</Flex>
				{/* {isLinked ? (
					<Button onClick={unlink} loading={unlinkLoading} leftSection={<IconUnlink size={18} />}>
						Unlink
					</Button>
				) : (
					<Button component={'a'} href={discordLinkUrl} disabled={!discordLinkUrl} leftSection={<IconLink size={18} />}>
						Link
					</Button>
				)} */}
				<Button leftSection={<IconLink size={18} />}>Link</Button>
			</Flex>
		</Card>
	);
};

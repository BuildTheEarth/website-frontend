import { Discord, Github } from '@icons-pack/react-simple-icons';
import { Alert, Badge, Button, Card, Flex, Group, rem, Tabs, Text, TextInput } from '@mantine/core';
import {
	IconAlertCircle,
	IconBroadcast,
	IconBrowser,
	IconCheck,
	IconDeviceFloppy,
	IconKey,
	IconLink,
	IconReload,
	IconSettings,
	IconWorld,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import Page from '@/components/Page';
import { useAccessToken } from '@/hooks/useAccessToken';
import { useUser } from '@/hooks/useUser';
import thumbnail from '@/public/images/thumbnails/me.png';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

/* eslint-disable react-hooks/exhaustive-deps */

const Settings: NextPage = ({ type }: any) => {
	const user = useUser();
	const { accessToken } = useAccessToken();
	const { data, isLoading } = useSWR(`/users/${user?.user?.id}/kc`);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation('me');

	const form = useForm({});

	useEffect(() => {
		if (!isLoading && data)
			form.setValues({
				username: data.username,
				email: data.email,
				avatar: data.avatar,
				firstName: data.firstName,
				lastName: data.lastName,
			});
	}, [isLoading]);

	const handleSubmit = (e: any) => {
		setLoading(true);
		const body = {
			username: e.username || undefined,
			email: e.email || undefined,
			avatar: e.avatar || undefined,
			firstName: e.firstName || undefined,
			lastName: e.lastName || undefined,
		};
		fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${user?.user?.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
			body: JSON.stringify(body),
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
				image: thumbnail,
			}}
			requiredPermissions={{ permissions: ['account.edit', 'account.info'] }}
			loading={!data}
		>
			{data && (
				<Tabs value={type} onChange={(v) => router.push({ query: { type: v } })}>
					<Tabs.List>
						<Tabs.Tab
							value="general"
							leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
						>
							Profile Information
						</Tabs.Tab>
						<Tabs.Tab
							value="security"
							leftSection={<IconKey style={{ width: rem(14), height: rem(14) }} />}
						>
							Security Details
						</Tabs.Tab>
						<Tabs.Tab
							value="accounts"
							leftSection={<IconLink style={{ width: rem(14), height: rem(14) }} />}
						>
							Linked Accounts
						</Tabs.Tab>
						<Tabs.Tab
							value="session"
							leftSection={<IconBroadcast style={{ width: rem(14), height: rem(14) }} />}
						>
							Active Sessions
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="general" mt="md">
						<form onSubmit={form.onSubmit(handleSubmit)}>
							<TextInput
								label="Username"
								{...form.getInputProps('username')}
								required
								placeholder="johnDoe"
							/>
							<Group grow mt="md">
								<TextInput
									label="First Name"
									{...form.getInputProps('firstName')}
									placeholder="John"
								/>
								<TextInput
									label="Last Name"
									{...form.getInputProps('lastName')}
									placeholder="Doe"
								/>
							</Group>
							<TextInput
								label="Email"
								{...form.getInputProps('email')}
								required
								mt="md"
								placeholder="john.doe@mail.com"
							/>
							<TextInput
								label="Avatar"
								{...form.getInputProps('avatar')}
								mt="md"
								placeholder="https://..."
							/>
							<Group mt="md">
								<Button type="submit" leftSection={<IconDeviceFloppy />} loading={loading}>
									{t('common:button.save')}
								</Button>
								<Button
									variant="outline"
									onClick={() => {
										form.reset();
										form.setValues({
											username: data.username,
											email: data.email,
											avatar: data.avatar,
											firstName: data.firstName,
											lastName: data.lastName,
										});
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
							{t('settings.security.description')}
						</Alert>
					</Tabs.Panel>

					<Tabs.Panel value="accounts" mt="md">
						{data && (
							<>
								<SocialAccount socialName="discord" identities={data.federatedIdentities} />
								<SocialAccount socialName="github" identities={data.federatedIdentities} />
							</>
						)}
					</Tabs.Panel>

					<Tabs.Panel value="session" mt="md">
						{data.sessions?.map((s: any, i: number) => (
							<Card mb={'md'} withBorder key={i}>
								<Flex align={'center'} gap={'md'}>
									<IconBrowser size={'3rem'} />
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
			)}
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

const SocialAccount = ({ identities, socialName }: any) => {
	const { data: session } = useSession();
	const user = useUser();
	const identity = identities.filter((i: any) => i.identityProvider === socialName)[0];
	const isLinked = identity != null;

	return (
		<Card mb={'md'} withBorder>
			<Flex align={'center'} gap={'md'}>
				{socialName === 'discord' ? (
					<Discord size={'3rem'} />
				) : socialName == 'github' ? (
					<Github size={'3rem'} />
				) : (
					<IconWorld size={'3rem'} />
				)}
				<Flex gap={5} direction={'column'} style={{ flex: 1 }}>
					<Flex align={'center'} gap={'xs'}>
						<Text fw={'bold'}>{capitalize(socialName)}</Text>
					</Flex>
					{!isLinked ? (
						<Badge gradient={{ from: 'orange', to: 'yellow' }} variant="gradient" size="sm">
							Not Linked
						</Badge>
					) : (
						<Text size="sm">{identity.userName.replace('#0', '')}</Text>
					)}
				</Flex>
			</Flex>
		</Card>
	);
};
function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

import { Button, Center, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import Page from '../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function ErrorPage() {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { t } = useTranslation('errors');
	const router = useRouter();
	return (
		<Page fullWidth seo={{ nofollow: true, noindex: true }}>
			<div
				style={{
					width: '100%',
					position: 'relative',
				}}
			>
				<div
					style={{
						backgroundColor:
							scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						background: `url("https://cdn.buildtheearth.net/static/thumbnails/error.png")`,
						filter: 'brightness(0.5)',
						width: '100%',
						height: 'calc(100vh - 60px)',
					}}
				></div>
				<Center
					style={{
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
					}}
				>
					<div>
						<Title
							style={{ color: '#ffffff', fontSize: 220, userSelect: 'none' }}
							ta="center"
							order={1}
						>
							500
						</Title>
						<Title style={{ color: '#ffffff' }} ta="center" order={1}>
							{t([`500.title`, 'fallback.title'], { error: 500 })}
						</Title>
						<Title style={{ color: theme.colors.gray[4] }} ta="center" order={3}>
							{t([`500.message`, 'fallback.message'], { error: 500 })}
							<br />
							<Button
								variant="outline"
								size="xl"
								style={{
									color: 'white',
									borderColor: 'white',
									borderWidth: 3,
									marginTop: 'calc(var(--mantine-spacing-xl)*1.5)',
								}}
								onClick={() => router.back()}
							>
								{t('button.back', { ns: 'common' })}
							</Button>
						</Title>
					</div>
				</Center>
			</div>
			<div></div>
		</Page>
	);
}
export default ErrorPage;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'errors'])),
		},
	};
}

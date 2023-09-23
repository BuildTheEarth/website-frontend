import { Button, Center, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import Page from '../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function ErrorPage(props: any) {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { t } = useTranslation('errors');
	const code = props.code || props.statuscode;
	const router = useRouter();
	return (
		<Page fullWidth>
			<div
				style={{
					width: '100%',
					position: 'relative',
				}}
			>
				<div
					style={{
						backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						background: `url("/images/placeholder.webp")`,
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
						<Title style={{ color: '#ffffff', fontSize: 220, userSelect: 'none' }} ta="center" order={1}>
							{code}
						</Title>
						<Title style={{ color: '#ffffff' }} ta="center" order={1}>
							{t([`${code}.title`, 'fallback.title'], { error: code })}
						</Title>
						<Title style={{ color: theme.colors.gray[4] }} ta="center" order={3}>
							{t([`${code}.message`, 'fallback.message'], { error: code })}
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
								Go Back
							</Button>
						</Title>
					</div>
				</Center>
			</div>
			<div></div>
		</Page>
	);
}
export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'errors'])),
		},
	};
}
export default ErrorPage;

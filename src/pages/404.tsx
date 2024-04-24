import { Button, Center, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import Page from '@/components/Page';
import thumbnail from '@/public/images/thumbnails/error.png';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';

function ErrorPage() {
	const { t } = useTranslation('common');
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const router = useRouter();
	return (
		<Page fullWidth seo={{ nofollow: true, noindex: true }}>
			<div
				style={{
					width: '100%',
					position: 'relative',
				}}
			>
				<Image
					src={thumbnail}
					alt="Error Image"
					style={{
						filter: 'brightness(0.5)',
						width: '100%',
						height: '100vh',
						objectFit: 'cover',
					}}
				/>
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
							404
						</Title>
						<Title style={{ color: '#ffffff' }} ta="center" order={1}>
							While we are busy building the earth, we have not yet built this page.
						</Title>
						<Title style={{ color: theme.colors.gray[4] }} ta="center" order={3}>
							We can&apos;t find the page you&apos;re looking for. Please check the URL and try
							again.
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
								{t('button.back')}
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
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

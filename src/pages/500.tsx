import { Button, Center, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import Page from '@/components/Page';
import thumbnail from '@/public/images/thumbnails/error.png';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';

function ErrorPage() {
	const theme = useMantineTheme();
	const scheme = useMantineColorScheme();
	const { t } = useTranslation('common');
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
							500
						</Title>
						<Title style={{ color: '#ffffff' }} ta="center" order={1}>
							Internal Server Error
						</Title>
						<Title style={{ color: theme.colors.gray[4] }} ta="center" order={3}>
							We&apos;re having some issues with our server, please try again later.
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

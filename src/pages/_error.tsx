import { Button, Center, Title, useMantineTheme } from '@mantine/core';

import Page from '../components/Page';
import { useRouter } from 'next/router';
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

function ErrorPage(props: any) {
	const theme = useMantineTheme();
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
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						background: `url("/images/placeholder.png")`,
						filter: 'brightness(0.5)',
						width: '100%',
						height: 'calc(100vh - 60px)',
						marginTop: 60,
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
						<Title style={{ color: '#ffffff', fontSize: 220 }} align="center" order={1}>
							{code}
						</Title>
						<Title style={{ color: '#ffffff' }} align="center" order={1}>
							{t([`${code}.title`, 'fallback.title'], { error: code })}
						</Title>
						<Title style={{ color: theme.colors.gray[4] }} align="center" order={3}>
							{t([`${code}.message`, 'fallback.message'], { error: code })}
							<br />
							<Button
								variant="outline"
								size="xl"
								style={{ color: 'white', borderColor: 'white', borderWidth: 3, marginTop: theme.spacing.xl * 1.5 }}
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
export function getServerSideProps({ res, err }: any) {
	if (new Date().getDate() === 1 && new Date().getMonth() === 4) {
		res.statusCode = 418;
	}

	return {
		props: {
			code: res.statusCode,
		},
	};
}
export default ErrorPage;

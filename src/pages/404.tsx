import { Button, Center, Title, useMantineTheme } from '@mantine/core';

import Page from '../components/Page';
import { useRouter } from 'next/router';

function ErrorPage() {
	const theme = useMantineTheme();
	const status = {
		code: 404,
		title: 'Not Found',
		message: "We can't find the page you're looking for. Please check the URL and try again.",
	};
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
							{status.code}
						</Title>
						<Title style={{ color: '#ffffff' }} align="center" order={1}>
							{status.title}
						</Title>
						<Title style={{ color: theme.colors.gray[4] }} align="center" order={3}>
							{status.message}
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
export default ErrorPage;

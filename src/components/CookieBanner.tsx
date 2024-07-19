import { Button, CloseButton, Group, Paper, Text } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { hasCookie } from 'cookies-next';
import classes from '../styles/components/CookieBanner.module.css';

export default function CookieBanner() {
	const [showing, setShowing] = useState(false);

	useEffect(() => {
		setShowing(!hasCookie('mtm_cookie_consent'));
	}, []);

	const handleAcceptAll = () => {
		//@ts-ignore
		window._paq = window._paq || [];
		//@ts-ignore
		window._paq.push(['rememberCookieConsentGiven']);
		setShowing(false);
	};
	const handleAcceptEssential = () => {
		setShowing(false);
	};

	return (
		<AnimatePresence>
			{showing && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0, duration: 0.4 }}
					exit={{ opacity: 0 }}
					className={classes.container}
				>
					<Paper withBorder p="lg" radius="md" shadow="md" className={classes.container}>
						<Group justify="space-between" mb="xs">
							<Text fz="md" fw={500}>
								Allow cookies
							</Text>
							<CloseButton
								mr={-9}
								mt={-9}
								size="sm"
								onClick={() => setShowing(false)}
								aria-label="Close Cookie Banner"
							/>
						</Group>
						<Text c="dimmed" fz="xs">
							On our website, we use cookies. You can opt to allow only essential cookies, such as
							authentication cookies, or opt to include analytics cookies as well, enabling us to
							enhance your website experience.
						</Text>
						<Group justify="flex-end" mt="md">
							<Button variant="outline" size="sm" onClick={handleAcceptEssential}>
								Accept essential
							</Button>
							<Button variant="outline" size="sm" onClick={handleAcceptAll}>
								Accept all
							</Button>
						</Group>
					</Paper>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

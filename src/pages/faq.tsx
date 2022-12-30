import { Accordion, createStyles } from '@mantine/core';

import { NextPage } from 'next';
import Page from '../components/Page';
import React from 'react';
import { useTranslation } from 'react-i18next';

const elements = [
	{
		title: 'How can I start building, what version and settings do I need?',
		content:
			'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!',
	},
	{
		title: 'How can we support the project financially?',
		content:
			'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!',
	},
	{
		title: 'I am having crashes on startup, run out of RAM?',
		content:
			'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!',
	},
	{
		title: 'Is there a Multiplayer server for this project?',
		content:
			'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!',
	},
	{
		title: 'Roads don`t show up',
		content:
			'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!',
	},
	{
		title: 'How do I teleport to a specific place?',
		content:
			'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!',
	},
	{
		title: 'Install Java for mismatching architectures',
		content:
			'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!',
	},
	{
		title: 'Why am I spawning on a mushroom island?',
		content:
			'To build on this project, you need to have a legitimate copy of Minecraft: Java Edition installed. Next, download and run the appropriate installer for your OS. Windows Installer (ZIP) macOS Installer (DMG) Linux Executable (TAR) Universal Installer (JAR) If you encounter any issues, hop onto the #support channel on our Discord!',
	},
];
const useStyles = createStyles((theme, _params, getRef) => {
	const control = getRef('control');

	return {
		control: {
			ref: control,
		},

		item: {
			border: 'none',
		},

		itemOpened: {
			[`& .${control}`]: {},
		},
	};
});

const Faq: NextPage = () => {
	const { classes } = useStyles();
	const { t } = useTranslation('faq');
	return (
		<Page
			head={{
				title: t('head.title'),
				image: '/images/placeholder.png',
				large: true,
			}}
		>
			<Accordion variant="separated">
				{elements.map((element, idx) => (
					<Accordion.Item value={element.title} key={idx}>
						<Accordion.Control>{element.title}</Accordion.Control>
						<Accordion.Panel>{element.content}</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</Page>
	);
};

export default Faq;

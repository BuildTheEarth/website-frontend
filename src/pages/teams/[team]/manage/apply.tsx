import { CalendarEvent, LetterT } from 'tabler-icons-react';

import { DNDItem } from '../../../../components/dnd/DNDItem';
import { NextPage } from 'next';
import Page from '../../../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Apply: NextPage = () => {
	return (
		<Page
			head={{
				title: 'Edit Application Questions',
				image: '/images/placeholder.webp',
				large: true,
			}}
		>
			<DNDItem
				data={[
					{
						position: 1,
						icon: <LetterT />,
						title: 'What is your Minecraft name?',
						subtitle: 'Short text input',
						content: 'nö',
					},
					{
						position: 2,
						icon: <LetterT />,
						title: 'What is your Minecraft name?',
						subtitle: 'Short text input',
						content: 'nö',
					},
				]}
			></DNDItem>
		</Page>
	);
};
export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}
export default Apply;

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

import {
	ApplicationQuestions,
	generateInitialValues,
	generateValidation,
} from '../../../../utils/application/ApplicationQuestions';
import { CalendarEvent, LetterT } from 'tabler-icons-react';

import { DNDItem } from '../../../../components/dnd/DNDItem';
import LongTextQuestion from '../../../../components/application/questions/LongTextQuestion';
import { NextPage } from 'next';
import Page from '../../../../components/Page';
import TextQuestion from '../../../../components/application/questions/TextQuestion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from '@mantine/form';

const data = [
	{
		id: 't',
		type: 'SHORT_INPUT',
		props: { title: 'test' },
	},
	{
		id: 'urlt',
		type: 'URL',
		props: { title: 'url' },
	},
];

const Apply: NextPage = () => {
	const form = useForm({
		initialValues: generateInitialValues(data),
		validate: generateValidation(data),
	});
	return (
		<Page
			head={{
				title: 'Edit Application Questions',
				image: '/images/placeholder.webp',
				large: true,
			}}
		>
			{data.map((d, i) => {
				const Question = ApplicationQuestions[d.type];
				return <Question key={i} id={d.id} {...d.props} form={form.getInputProps(d.id)} />;
			})}
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

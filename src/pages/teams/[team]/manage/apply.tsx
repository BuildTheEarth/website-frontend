import {
	ApplicationQuestions,
	generateInitialValues,
	generateValidation,
} from '../../../../utils/application/ApplicationQuestions';

import { NextPage } from 'next';
import Page from '../../../../components/Page';
import UrlQuestion from '../../../../components/application/questions/UrlQuestion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from '@mantine/form';

const data = [
	{
		id: 't',
		type: 'SHORT_INPUT',
		props: { title: 'Text Input' },
	},
	{
		id: 'urlt',
		type: 'LONG_INPUT',
		props: { title: 'Long Text Input' },
	} /*
	{
		id: 'fafw',
		type: 'DROPDOWN',
		props: { title: 'url' },
	},*/,
	{
		id: 'dwead',
		type: 'CITY',
		props: { title: 'City Input' },
	},
	{
		id: 'gght',
		type: 'URL',
		props: { title: 'URL Input' },
	},
	{
		id: 'dwrg',
		type: 'MINECRAFT',
		props: { title: 'Minecraft Name' },
	},
	{
		id: 't4g',
		type: 'SLIDER',
		props: { title: 'Slider Input' },
	},
	{
		id: 'gmioe',
		type: 'IMAGE',
		props: { title: 'Image Input' },
	},
	{
		id: 'dwr4thb',
		type: 'CHECKBOX',
		props: { title: 'Checkbox Input' },
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

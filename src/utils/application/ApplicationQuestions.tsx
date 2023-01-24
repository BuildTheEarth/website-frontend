import { CSSProperties } from '@mantine/styles/lib/tss/types/css-object';
import LongTextQuestion from '../../components/application/questions/LongTextQuestion';
import { Text } from '@mantine/core';
import TextQuestion from '../../components/application/questions/TextQuestion';
import UrlQuestion from '../../components/application/questions/UrlQuestion';

export const ApplicationQuestions: { [key: string]: any } = {
	TEXT: Text,
	SHORT_INPUT: TextQuestion,
	LONG_INPUT: LongTextQuestion,
	DROPDOWN: Text,
	CITY: Text,
	URL: UrlQuestion,
	MINECRAFT: Text,
	SLIDER: Text,
	IMAGE: Text,
	CHECKBOX: Text,
};

export interface ApplicationQuestion {
	id: string;
	title: string;
	description?: string;
	placeholder: string;
	required?: boolean;
	form?: any;
	style?: CSSProperties;
}

export function generateInitialValues(data: any) {
	const initialValues: any = {};
	data.forEach((d: any) => {
		initialValues[d.id] = '';
	});
	return initialValues;
}
export function generateValidation(data: any) {
	const validation: any = {};
	data.forEach((d: any) => {
		validation[d.id] = (value: any) => ApplicationQuestions[d.type].validation(value, d.props);
	});
	return validation;
}

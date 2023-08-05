import { CSSProperties } from '@mantine/styles/lib/tss/types/css-object';
import CheckboxQuestion from '../../components/application/questions/CheckboxQuestion';
import CityQuestion from '../../components/application/questions/CityQuestion';
import DropdownQuestion from '../../components/application/questions/DropdownQuestion';
import ImageUploadQuestion from '../../components/application/questions/ImageUploadQuestion';
import LongTextQuestion from '../../components/application/questions/LongTextQuestion';
import MinecraftQuestion from '../../components/application/questions/MinecraftQuestion';
import SliderQuestion from '../../components/application/questions/SliderQuestion';
import { Text } from '@mantine/core';
import TextQuestion from '../../components/application/questions/TextQuestion';
import UrlQuestion from '../../components/application/questions/UrlQuestion';

export const ApplicationQuestions: { [key: string]: any } = {
	TEXT: Text,
	SHORT_INPUT: TextQuestion,
	LONG_INPUT: LongTextQuestion,
	DROPDOWN: DropdownQuestion,
	CITY: CityQuestion,
	URL: UrlQuestion,
	MINECRAFT: MinecraftQuestion,
	SLIDER: SliderQuestion,
	IMAGE: ImageUploadQuestion,
	CHECKBOX: CheckboxQuestion,
};

export interface ApplicationQuestion {
	id: string;
	title: string;
	subtitle?: string;
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
		console.log('t', d.type, ApplicationQuestions[d.type].validation('https://google.com', d.props));
	});
	return validation;
}

import CheckboxQuestion from '@/components/application/questions/CheckboxQuestion';
import CityQuestion from '@/components/application/questions/CityQuestion';
import DropdownQuestion from '@/components/application/questions/DropdownQuestion';
import ImageUploadQuestion from '@/components/application/questions/ImageUploadQuestion';
import LongTextQuestion from '@/components/application/questions/LongTextQuestion';
import MinecraftQuestion from '@/components/application/questions/MinecraftQuestion';
import SliderQuestion from '@/components/application/questions/SliderQuestion';
import TextDisplay from '@/components/application/questions/TextDisplay';
import TextQuestion from '@/components/application/questions/TextQuestion';
import UrlQuestion from '@/components/application/questions/UrlQuestion';
import { MantineStyleProp } from '@mantine/core';

export const ApplicationQuestions: { [key: string]: any } = {
	TEXT: TextDisplay,
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
	icon?: string;
	onChange?: (v: any) => void;
	error?: boolean | string;
	style?: MantineStyleProp;
	disabled?: boolean;
	value?: any;
	readonly?: boolean;
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

export function toReadable(question: typeof ApplicationQuestions) {
	switch (question) {
		case TextQuestion:
			return 'Short Input';
		case LongTextQuestion:
			return 'Long Input';
		case DropdownQuestion:
			return 'Dropdown';
		case CityQuestion:
			return 'City';
		case UrlQuestion:
			return 'URL';
		case MinecraftQuestion:
			return 'Minecraft Username';
		case SliderQuestion:
			return 'Slider';
		case ImageUploadQuestion:
			return 'Image Upload';
		case CheckboxQuestion:
			return 'Checkbox';
		default:
			return 'Text';
	}
}

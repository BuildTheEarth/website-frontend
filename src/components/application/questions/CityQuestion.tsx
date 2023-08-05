import { IconBuilding, IconTextSize } from '@tabler/icons';
import { TextInput, Textarea } from '@mantine/core';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';

export interface CityQuestionProps extends ApplicationQuestion {
	country?: string;
}

function validation(value: any, props: CityQuestionProps): boolean {
	//TODO: Validate City
	return true;
}

const CityQuestion = (props: CityQuestionProps) => {
	return (
		<TextInput
			{...props.form}
			icon={<IconBuilding />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			autosize
			minRows={2}
			maxRows={5}
			{...props.form}
		/>
	);
};

CityQuestion.validation = validation;
CityQuestion.icon = IconTextSize;
export default CityQuestion;

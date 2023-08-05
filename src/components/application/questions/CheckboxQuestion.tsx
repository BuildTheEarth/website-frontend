import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import { IconTextSize } from '@tabler/icons';
import { Switch } from '@mantine/core';

export interface CheckboxQuestionProps extends ApplicationQuestion {
	ifTrue?: ApplicationQuestion[];
	ifFalse?: ApplicationQuestion[];
}

function validation(value: any, props: CheckboxQuestionProps): boolean {
	return true;
}

const CheckboxQuestion = (props: CheckboxQuestionProps) => {
	return (
		<Switch
			{...props.form}
			required={props.required}
			description={props.subtitle}
			label={props.title}
			style={props.style}
			{...props.form}
		/>
	);
};

CheckboxQuestion.validation = validation;
CheckboxQuestion.icon = IconTextSize;
export default CheckboxQuestion;

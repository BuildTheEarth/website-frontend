import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import { IconTextSize } from '@tabler/icons';
import { TextInput } from '@mantine/core';

export interface TextQuestionProps extends ApplicationQuestion {
	validation?: string;
	length?: number;
}

function validation(value: any, props: TextQuestionProps): boolean {
	return true;
}

const TextQuestion = (props: TextQuestionProps) => {
	return (
		<TextInput
			{...props.form}
			icon={<IconTextSize />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			{...props.form}
		/>
	);
};

TextQuestion.validation = validation;
TextQuestion.icon = IconTextSize;
export default TextQuestion;

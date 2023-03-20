import { TextInput, Textarea } from '@mantine/core';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import { IconTextSize } from '@tabler/icons';

export interface LongTextQuestionProps extends ApplicationQuestion {
	validation?: string;
	length?: number;
}

function validation(value: any, props: LongTextQuestionProps): boolean {
	return value.split().length <= (props.length || 200);
}

const LongTextQuestion = (props: LongTextQuestionProps) => {
	return (
		<Textarea
			{...props.form}
			icon={<IconTextSize />}
			required={props.required}
			description={props.description}
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

LongTextQuestion.validation = validation;
LongTextQuestion.icon = IconTextSize;
export default LongTextQuestion;

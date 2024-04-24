import { NumberInput, Textarea } from '@mantine/core';

import Icon from '@/components/Icon';
import { ApplicationQuestion } from '@/utils/application/ApplicationQuestions';
import { IconTextSize } from '@tabler/icons-react';

export interface LongTextQuestionProps extends ApplicationQuestion {
	additionalData: {
		length?: number;
	};
}

function validation(props: LongTextQuestionProps): (value: string) => void {
	return (value: string) => {
		return value.split('').length > (props.additionalData.length || 200)
			? `Text is too long, please reduce it to ${props.additionalData.length || 200} characters`
			: false;
	};
}

const LongTextQuestion = (props: LongTextQuestionProps) => {
	return (
		<Textarea
			leftSection={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			autosize
			minRows={2}
			maxRows={5}
			onChange={(e) => props.onChange && props.onChange(e.target.value)}
			error={props.error}
			disabled={props.disabled}
			readOnly={props.readonly}
			value={props.value}
		/>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return (
		<>
			<NumberInput
				label="Maximum Length"
				max={200}
				description="How long can the text be?"
				defaultValue={editingQuestion?.additionalData.length}
				onChange={(e) => handleUpdateEditingQuestion({ length: e }, true)}
			/>
		</>
	);
};

LongTextQuestion.edit = EditQuestion;
LongTextQuestion.mockdata = {
	length: 200,
};
LongTextQuestion.validation = validation;
LongTextQuestion.icon = IconTextSize;
export default LongTextQuestion;

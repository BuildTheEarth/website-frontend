import { NumberInput, Textarea } from '@mantine/core';

import Icon from '@/components/Icon';
import { ApplicationQuestion } from '@/utils/application/ApplicationQuestions';
import { IconTextSize } from '@tabler/icons-react';

export interface TextQuestionProps extends ApplicationQuestion {
	additionalData: {
		length?: number;
	};
}

function validation(props: TextQuestionProps): (value: string) => void {
	return (value: string) => {
		return value.split('').length > (props.additionalData.length || 200)
			? `Text is too long, please reduce it to ${props.additionalData.length || 200} characters`
			: false;
	};
}

const TextQuestion = (props: TextQuestionProps) => {
	return (
		<Textarea
			leftSection={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			onChange={(e) => props.onChange && props.onChange(e.target.value)}
			error={props.error}
			autosize
			minRows={1}
			maxRows={3}
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

TextQuestion.edit = EditQuestion;
TextQuestion.mockdata = {};
TextQuestion.validation = validation;
TextQuestion.icon = IconTextSize;
export default TextQuestion;

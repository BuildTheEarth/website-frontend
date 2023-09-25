import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconTextSize } from '@tabler/icons';
import { TextInput } from '@mantine/core';

export interface TextQuestionProps extends ApplicationQuestion {
	additionalData: {
		validation?: string;
		length?: number;
	};
}

function validation(value: any, props: TextQuestionProps): boolean {
	return true;
}

const TextQuestion = (props: TextQuestionProps) => {
	return (
		<TextInput
			{...props.form}
			icon={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			{...props.form}
		/>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return <></>;
};

TextQuestion.edit = EditQuestion;
TextQuestion.mockdata = {};
TextQuestion.validation = validation;
TextQuestion.icon = IconTextSize;
export default TextQuestion;

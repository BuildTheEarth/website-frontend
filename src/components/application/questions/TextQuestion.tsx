import { NumberInput, TextInput } from '@mantine/core';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconTextSize } from '@tabler/icons';

export interface TextQuestionProps extends ApplicationQuestion {
	additionalData: {
		length?: number;
	};
}

function validation(value: any, props: TextQuestionProps): boolean {
	return true;
}

const TextQuestion = (props: TextQuestionProps) => {
	return <TextInput {...props.form} icon={<Icon name={props.icon} />} required={props.required} description={props.subtitle} placeholder={props.placeholder} label={props.title} style={props.style} {...props.form} />;
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return (
		<>
			<NumberInput label="Maximum Length" max={200} description="How long can the text be?" defaultValue={editingQuestion?.additionalData.length} onChange={(e) => handleUpdateEditingQuestion({ length: e }, true)} />
		</>
	);
};

TextQuestion.edit = EditQuestion;
TextQuestion.mockdata = {};
TextQuestion.validation = validation;
TextQuestion.icon = IconTextSize;
export default TextQuestion;

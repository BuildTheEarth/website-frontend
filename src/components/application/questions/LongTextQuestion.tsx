import { NumberInput, Textarea } from '@mantine/core';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconTextSize } from '@tabler/icons';

export interface LongTextQuestionProps extends ApplicationQuestion {
	additionalData: {
		validation?: string;
		length?: number;
	};
}

function validation(value: any, props: LongTextQuestionProps): boolean {
	return value.split().length <= (props.additionalData.length || 200);
}

const LongTextQuestion = (props: LongTextQuestionProps) => {
	return <Textarea {...props.form} icon={<Icon name={props.icon} />} required={props.required} description={props.subtitle} placeholder={props.placeholder} label={props.title} style={props.style} autosize minRows={2} maxRows={5} {...props.form} />;
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return (
		<>
			<NumberInput label="Maximum Length" max={200} description="How long can the text be?" defaultValue={editingQuestion?.additionalData.length} onChange={(e) => handleUpdateEditingQuestion({ length: e }, true)} />
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

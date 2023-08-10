import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconTextSize } from '@tabler/icons';
import { Textarea } from '@mantine/core';

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
	return (
		<Textarea
			{...props.form}
			icon={<Icon name={props.icon} />}
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

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return <></>;
};

LongTextQuestion.edit = EditQuestion;
LongTextQuestion.mockdata = {};
LongTextQuestion.validation = validation;
LongTextQuestion.icon = IconTextSize;
export default LongTextQuestion;

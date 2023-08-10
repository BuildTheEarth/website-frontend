import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconCheckbox } from '@tabler/icons';
import { Switch } from '@mantine/core';

export interface CheckboxQuestionProps extends ApplicationQuestion {
	additionalData: {
		ifTrue?: ApplicationQuestion[];
		ifFalse?: ApplicationQuestion[];
	};
}

function validation(value: any, props: CheckboxQuestionProps): boolean {
	return true;
}

const CheckboxQuestion = (props: CheckboxQuestionProps) => {
	return (
		<Switch
			{...props.form}
			icon={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			label={props.title}
			style={props.style}
			{...props.form}
		/>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return <></>;
};

CheckboxQuestion.edit = EditQuestion;
CheckboxQuestion.mockdata = {};
CheckboxQuestion.validation = validation;
CheckboxQuestion.icon = IconCheckbox;
export default CheckboxQuestion;

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconCheckbox } from '@tabler/icons';
import { Switch } from '@mantine/core';

export interface CheckboxQuestionProps extends ApplicationQuestion {
	additionalData: {};
}

function validation(props: CheckboxQuestionProps): (value: string) => void {
	return (value: string) => {
		return false;
	};
}

const CheckboxQuestion = (props: CheckboxQuestionProps) => {
	return <Switch onLabel={<Icon name={props.icon} />} offLabel={<Icon name={props.icon} />} required={props.required} description={props.subtitle} label={props.title} style={props.style} onChange={(e) => props.onChange && props.onChange(e.target.checked)} error={props.error} />;
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return undefined;
};

CheckboxQuestion.edit = EditQuestion;
CheckboxQuestion.mockdata = {};
CheckboxQuestion.validation = validation;
CheckboxQuestion.icon = IconCheckbox;
export default CheckboxQuestion;

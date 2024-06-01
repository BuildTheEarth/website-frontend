import Icon from '@/components/Icon';
import { ApplicationQuestion } from '@/utils/application/ApplicationQuestions';
import { Switch } from '@mantine/core';
import { IconCheckbox } from '@tabler/icons-react';

export interface CheckboxQuestionProps extends ApplicationQuestion {
	additionalData: {};
}

function validation(props: CheckboxQuestionProps): (value: string) => void {
	return (value: string) => {
		return false;
	};
}

const CheckboxQuestion = (props: CheckboxQuestionProps) => {
	return (
		<Switch
			onLabel={<Icon name={props.icon} />}
			offLabel={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			label={props.title}
			style={props.style}
			onChange={(e) => props.onChange && props.onChange(e.target.checked)}
			error={props.error}
			disabled={props.disabled}
			readOnly={props.readonly}
			checked={props.value}
		/>
	);
};

const EditQuestion: any = undefined;

CheckboxQuestion.edit = EditQuestion;
CheckboxQuestion.mockdata = {};
CheckboxQuestion.validation = validation;
CheckboxQuestion.icon = IconCheckbox;
export default CheckboxQuestion;

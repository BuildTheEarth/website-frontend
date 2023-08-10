import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconSelect } from '@tabler/icons';
import { MultiSelect } from '@mantine/core';

export interface DropdownQuestionProps extends ApplicationQuestion {
	additionalData: {
		maxSelect?: number;
		options: {
			value: string;
			label: string;
		};
		conditions?: ApplicationQuestion;
	};
}

function validation(value: any, props: DropdownQuestionProps): boolean {
	// TODO
	return true;
}

const DropdownQuestion = (props: DropdownQuestionProps) => {
	return (
		<MultiSelect
			{...props.form}
			icon={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			label={props.title}
			data={props.additionalData.options}
			style={props.style}
			limit={props.additionalData.maxSelect}
			{...props.form}
		/>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return <></>;
};

DropdownQuestion.edit = EditQuestion;
DropdownQuestion.mockdata = {
	maxSelect: 1,
	options: [
		{ value: 'Option 1', label: 'Option 1' },
		{ value: 'Option 2', label: 'Option 2' },
	],
};
DropdownQuestion.validation = validation;
DropdownQuestion.icon = IconSelect;
export default DropdownQuestion;

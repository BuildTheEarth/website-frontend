import { MultiSelect, NumberInput, TagsInput } from '@mantine/core';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconSelect } from '@tabler/icons';

export interface DropdownQuestionProps extends ApplicationQuestion {
	additionalData: {
		maxSelect?: number;
		options: string[];
		conditions?: ApplicationQuestion;
	};
}

function validation(value: any, props: DropdownQuestionProps): boolean {
	// TODO
	return true;
}

const DropdownQuestion = (props: DropdownQuestionProps) => {
	return <MultiSelect {...props.form} icon={<Icon name={props.icon} />} required={props.required} description={props.subtitle} label={props.title} data={props.additionalData.options} style={props.style} limit={props.additionalData.maxSelect} {...props.form} />;
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return (
		<>
			<NumberInput label="Maximum Selections" description="How many options can be selected at once" defaultValue={editingQuestion?.additionalData.maxSelect} onChange={(e) => handleUpdateEditingQuestion({ maxSelect: e }, true)} />
			<TagsInput mt="md" label="Options" description="Press enter to add new option" defaultValue={editingQuestion?.additionalData.options} onChange={(e) => handleUpdateEditingQuestion({ options: e }, true)} />
		</>
	);
};

DropdownQuestion.edit = EditQuestion;
DropdownQuestion.mockdata = {
	maxSelect: 1,
	options: ['Option 1', 'Option 2', 'Option 3'],
};
DropdownQuestion.validation = validation;
DropdownQuestion.icon = IconSelect;
export default DropdownQuestion;

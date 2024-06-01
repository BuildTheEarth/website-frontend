import { MultiSelect, NumberInput, TagsInput } from '@mantine/core';

import Icon from '@/components/Icon';
import { ApplicationQuestion } from '@/utils/application/ApplicationQuestions';
import { IconSelect } from '@tabler/icons-react';

export interface DropdownQuestionProps extends ApplicationQuestion {
	additionalData: {
		maxSelect?: number;
		options: string[];
	};
}

function validation(props: DropdownQuestionProps): (value: string) => void {
	return (value: string) => {
		return false;
	};
}

const DropdownQuestion = (props: DropdownQuestionProps) => {
	return (
		<MultiSelect
			leftSection={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			label={props.title}
			data={props.additionalData.options}
			style={props.style}
			maxValues={props.additionalData.maxSelect}
			onChange={(e) => props.onChange && props.onChange(e)}
			error={props.error}
			disabled={props.disabled}
			readOnly={props.readonly}
			value={props.value && JSON.parse(props.value)}
		/>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return (
		<>
			<NumberInput
				label="Maximum Selections"
				description="How many options can be selected at once"
				defaultValue={editingQuestion?.additionalData.maxSelect}
				onChange={(e) => handleUpdateEditingQuestion({ maxSelect: e }, true)}
			/>
			<TagsInput
				mt="md"
				label="Options"
				description="Press enter to add new option"
				defaultValue={editingQuestion?.additionalData.options}
				onChange={(e) => handleUpdateEditingQuestion({ options: e }, true)}
			/>
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

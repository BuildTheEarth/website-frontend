import { IconBuilding, IconTextSize } from '@tabler/icons';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import { MultiSelect } from '@mantine/core';

export interface DropdownQuestionProps extends ApplicationQuestion {
	maxSelect?: number;
	conditions?: ApplicationQuestion;
}

function validation(value: any, props: DropdownQuestionProps): boolean {
	// TODO
	return true;
}

const DropdownQuestion = (props: DropdownQuestionProps) => {
	return (
		<MultiSelect
			{...props.form}
			icon={<IconBuilding />}
			required={props.required}
			description={props.subtitle}
			label={props.title}
			style={props.style}
			limit={props.maxSelect}
			{...props.form}
		/>
	);
};

DropdownQuestion.validation = validation;
DropdownQuestion.icon = IconTextSize;
export default DropdownQuestion;

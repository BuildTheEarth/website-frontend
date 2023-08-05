import { IconBuilding, IconTextSize } from '@tabler/icons';
import { TextInput, Textarea } from '@mantine/core';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';

export interface MinecraftQuestionProps extends ApplicationQuestion {
	allowBedrock?: boolean;
}

function validation(value: any, props: MinecraftQuestionProps): boolean {
	// TODO: validate
	return true;
}

const MinecraftQuestion = (props: MinecraftQuestionProps) => {
	return (
		<TextInput
			{...props.form}
			icon={<IconBuilding />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			{...props.form}
		/>
	);
};

MinecraftQuestion.validation = validation;
MinecraftQuestion.icon = IconTextSize;
export default MinecraftQuestion;

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconDeviceGamepad } from '@tabler/icons';
import { TextInput } from '@mantine/core';

export interface MinecraftQuestionProps extends ApplicationQuestion {
	additionalData: {
		allowBedrock?: boolean;
	};
}

function validation(value: any, props: MinecraftQuestionProps): boolean {
	// TODO: validate
	return true;
}

const MinecraftQuestion = (props: MinecraftQuestionProps) => {
	return (
		<TextInput
			{...props.form}
			icon={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			{...props.form}
		/>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return <></>;
};

MinecraftQuestion.edit = EditQuestion;
MinecraftQuestion.mockdata = { allowBedrock: false };
MinecraftQuestion.validation = validation;
MinecraftQuestion.icon = IconDeviceGamepad;
export default MinecraftQuestion;

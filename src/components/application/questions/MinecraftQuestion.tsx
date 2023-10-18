import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconDeviceGamepad } from '@tabler/icons';
import { TextInput } from '@mantine/core';

export interface MinecraftQuestionProps extends ApplicationQuestion {
	additionalData: {};
}

function validation(props: MinecraftQuestionProps): (value: string) => void {
	return (value: string) => {
		return /^[a-zA-Z0-9_]{2,16}$/gm.test(value) ? false : 'Not a valid Minecraft Name';
	};
}

const MinecraftQuestion = (props: MinecraftQuestionProps) => {
	return <TextInput leftSection={<Icon name={props.icon} />} required={props.required} description={props.subtitle} placeholder={props.placeholder} label={props.title} style={props.style} onChange={(e) => props.onChange && props.onChange(e.target.value)} error={props.error} />;
};

const EditQuestion = undefined;

MinecraftQuestion.edit = EditQuestion;
MinecraftQuestion.mockdata = {};
MinecraftQuestion.validation = validation;
MinecraftQuestion.icon = IconDeviceGamepad;
export default MinecraftQuestion;

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconLink } from '@tabler/icons';
import { TextInput } from '@mantine/core';

export interface UrlQuestionProps extends ApplicationQuestion {
	additionalData: {};
}

function validation(value: any, props: UrlQuestionProps): boolean {
	return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
		value,
	);
}

const UrlQuestion = (props: UrlQuestionProps) => {
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

const EditQuestion = undefined;

UrlQuestion.edit = EditQuestion;
UrlQuestion.mockdata = {};
UrlQuestion.validation = validation;
UrlQuestion.icon = IconLink;
export default UrlQuestion;

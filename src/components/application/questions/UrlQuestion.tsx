import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import { IconLink } from '@tabler/icons';
import { TextInput } from '@mantine/core';

export interface UrlQuestionProps extends ApplicationQuestion {}

function validation(value: any, props: UrlQuestionProps): boolean {
	return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
		value,
	);
}

const UrlQuestion = (props: UrlQuestionProps) => {
	return (
		<TextInput
			{...props.form}
			icon={<IconLink />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			{...props.form}
		/>
	);
};

UrlQuestion.validation = validation;
UrlQuestion.icon = IconLink;
export default UrlQuestion;

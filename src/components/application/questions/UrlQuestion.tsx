import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconLink } from '@tabler/icons';
import { TextInput } from '@mantine/core';

export interface UrlQuestionProps extends ApplicationQuestion {
	additionalData: {};
}

function validation(props: UrlQuestionProps): (value: string) => void {
	return (value: string) => {
		return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(value) ? false : 'Not a valid URL';
	};
}

const UrlQuestion = (props: UrlQuestionProps) => {
	return <TextInput leftSection={<Icon name={props.icon} />} required={props.required} description={props.subtitle} placeholder={props.placeholder} label={props.title} style={props.style} onChange={(e) => props.onChange && props.onChange(e.target.value)} error={props.error} disabled={props.disabled} />;
};

const EditQuestion = undefined;

UrlQuestion.edit = EditQuestion;
UrlQuestion.mockdata = {};
UrlQuestion.validation = validation;
UrlQuestion.icon = IconLink;
export default UrlQuestion;

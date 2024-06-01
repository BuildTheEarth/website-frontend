import { ActionIcon, TextInput } from '@mantine/core';
import { IconExternalLink, IconLink } from '@tabler/icons-react';

import Icon from '@/components/Icon';
import { ApplicationQuestion } from '@/utils/application/ApplicationQuestions';
import Link from 'next/link';

export interface UrlQuestionProps extends ApplicationQuestion {
	additionalData: {};
}

function validation(props: UrlQuestionProps): (value: string) => void {
	return (value: string) => {
		return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%.,_!\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.,!~#?&\/=]*)$/.test(
			value,
		)
			? false
			: 'Not a valid URL';
	};
}

const UrlQuestion = (props: UrlQuestionProps) => {
	return (
		<TextInput
			leftSection={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			onChange={(e) => props.onChange && props.onChange(e.target.value)}
			error={props.error}
			disabled={props.disabled}
			readOnly={props.readonly}
			value={props.value}
			rightSection={
				props.value && (
					<ActionIcon component={Link} href={props.value} variant="subtle" target="_blank">
						<IconExternalLink style={{ width: '70%', height: '70%' }} stroke={1.5} />
					</ActionIcon>
				)
			}
		/>
	);
};

const EditQuestion: any = undefined;

UrlQuestion.edit = EditQuestion;
UrlQuestion.mockdata = {};
UrlQuestion.validation = validation;
UrlQuestion.icon = IconLink;
export default UrlQuestion;

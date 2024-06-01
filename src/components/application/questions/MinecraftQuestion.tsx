import { ActionIcon, TextInput } from '@mantine/core';
import { IconDeviceGamepad, IconExternalLink } from '@tabler/icons-react';

import Icon from '@/components/Icon';
import { ApplicationQuestion } from '@/utils/application/ApplicationQuestions';
import Link from 'next/link';

export interface MinecraftQuestionProps extends ApplicationQuestion {
	additionalData: {};
}

function validation(props: MinecraftQuestionProps): (value: string) => void {
	return (value: string) => {
		return /^[a-zA-Z0-9_]{2,16}$/gm.test(value) ? false : 'Not a valid Minecraft Name';
	};
}

const MinecraftQuestion = (props: MinecraftQuestionProps) => {
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
					<ActionIcon
						component={Link}
						href={`https://namemc.com/${props.value}`}
						variant="subtle"
						target="_blank"
					>
						<IconExternalLink style={{ width: '70%', height: '70%' }} stroke={1.5} />
					</ActionIcon>
				)
			}
		/>
	);
};

const EditQuestion: any = undefined;

MinecraftQuestion.edit = EditQuestion;
MinecraftQuestion.mockdata = {};
MinecraftQuestion.validation = validation;
MinecraftQuestion.icon = IconDeviceGamepad;
export default MinecraftQuestion;

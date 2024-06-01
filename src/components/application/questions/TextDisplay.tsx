import { ApplicationQuestion } from '@/utils/application/ApplicationQuestions';
import { Text } from '@mantine/core';
import { IconLetterT } from '@tabler/icons-react';

export interface TextDisplayProps extends ApplicationQuestion {
	additionalData: {};
}

function validation(props: TextDisplayProps): (value: string) => void {
	return (value: string) => {
		return false;
	};
}

const TextDisplay = (props: TextDisplayProps) => {
	return (
		<>
			<Text style={props.style}>{props.title}</Text>
			{props.subtitle && (
				<Text c="dimmed" size="sm">
					{props.subtitle}
				</Text>
			)}
		</>
	);
};

const EditQuestion: any = undefined;

TextDisplay.edit = EditQuestion;
TextDisplay.mockdata = {};
TextDisplay.validation = validation;
TextDisplay.icon = IconLetterT;
export default TextDisplay;

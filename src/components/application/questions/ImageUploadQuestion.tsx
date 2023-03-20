import { IconBuilding, IconTextSize } from '@tabler/icons';
import { Slider, TextInput, Textarea } from '@mantine/core';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';

export interface ImageUploadQuestionProps extends ApplicationQuestion {
	maxSize?: number;
	maxAmount?: number;
}

function validation(value: any, props: ImageUploadQuestionProps): boolean {
	// TODO: Somehow split it
	return value.split(';').length <= (props.maxAmount || 1);
}

const ImageUploadQuestion = (props: ImageUploadQuestionProps) => {
	return (
		<TextInput
			{...props.form}
			icon={<IconBuilding />}
			required={props.required}
			description={props.description}
			label={props.title}
			style={props.style}
			{...props.form}
		/>
	);
};

ImageUploadQuestion.validation = validation;
ImageUploadQuestion.icon = IconTextSize;
export default ImageUploadQuestion;

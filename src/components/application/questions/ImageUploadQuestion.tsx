import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconPhoto } from '@tabler/icons';
import { TextInput } from '@mantine/core';

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
			icon={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			label={props.title}
			style={props.style}
			{...props.form}
		/>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return undefined;
};

ImageUploadQuestion.edit = EditQuestion;
ImageUploadQuestion.mockdata = { maxSize: 100, maxAmount: 1 };
ImageUploadQuestion.validation = validation;
ImageUploadQuestion.icon = IconPhoto;
export default ImageUploadQuestion;

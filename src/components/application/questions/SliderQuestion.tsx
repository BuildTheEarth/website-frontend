import { IconAdjustments, IconTextSize } from '@tabler/icons';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { Slider } from '@mantine/core';

export interface SliderQuestionProps extends ApplicationQuestion {
	additionalData: {
		steps?: number;
		max?: number;
		min?: number;
		unit?: string;
	};
}

function validation(value: any, props: SliderQuestionProps): boolean {
	return true;
}

const SliderQuestion = (props: SliderQuestionProps) => {
	return (
		<Slider
			{...props.form}
			icon={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			label={props.title}
			style={props.style}
			max={props.additionalData.max}
			min={props.additionalData.min}
			step={props.additionalData.steps}
			{...props.form}
		/>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return <></>;
};

SliderQuestion.edit = EditQuestion;
SliderQuestion.mockdata = { steps: 1, max: 100, min: 0 };
SliderQuestion.validation = validation;
SliderQuestion.icon = IconAdjustments;
export default SliderQuestion;

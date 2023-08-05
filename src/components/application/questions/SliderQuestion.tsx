import { IconBuilding, IconTextSize } from '@tabler/icons';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import { Slider } from '@mantine/core';

export interface SliderQuestionProps extends ApplicationQuestion {
	steps?: number;
	max?: number;
	min?: number;
	unit?: string;
}

function validation(value: any, props: SliderQuestionProps): boolean {
	return true;
}

const SliderQuestion = (props: SliderQuestionProps) => {
	return (
		<Slider
			{...props.form}
			icon={<IconBuilding />}
			required={props.required}
			description={props.subtitle}
			label={props.title}
			style={props.style}
			max={props.max}
			min={props.min}
			step={props.steps}
			{...props.form}
		/>
	);
};

SliderQuestion.validation = validation;
SliderQuestion.icon = IconTextSize;
export default SliderQuestion;

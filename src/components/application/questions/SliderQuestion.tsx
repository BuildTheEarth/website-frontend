import { Group, NumberInput, Slider, TextInput } from '@mantine/core';
import { IconAdjustments, IconTextSize } from '@tabler/icons';

import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';

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
	return <Slider {...props.form} icon={<Icon name={props.icon} />} required={props.required} description={props.subtitle} label={props.title} style={props.style} max={props.additionalData.max} min={props.additionalData.min} step={props.additionalData.steps} {...props.form} />;
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return (
		<>
			<Group grow mb="md">
				<NumberInput label="Slider Steps" defaultValue={editingQuestion?.additionalData.steps} onChange={(e) => handleUpdateEditingQuestion({ steps: e }, true)} />
				<NumberInput label="Maximum Value" defaultValue={editingQuestion?.additionalData.max} onChange={(e) => handleUpdateEditingQuestion({ max: e }, true)} />

				<NumberInput label="Minimum Value" defaultValue={editingQuestion?.additionalData.min} onChange={(e) => handleUpdateEditingQuestion({ min: e }, true)} />
			</Group>
			<TextInput label="Unit" defaultValue={editingQuestion?.additionalData.unit} onChange={(e) => handleUpdateEditingQuestion({ unit: e.target.value }, true)} />
		</>
	);
};

SliderQuestion.edit = EditQuestion;
SliderQuestion.mockdata = { steps: 1, max: 100, min: 0 };
SliderQuestion.validation = validation;
SliderQuestion.icon = IconAdjustments;
export default SliderQuestion;

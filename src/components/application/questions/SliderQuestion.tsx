import { Group, Input, NumberInput, Slider, Stack, TextInput } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

import { ApplicationQuestion } from '@/utils/application/ApplicationQuestions';

export interface SliderQuestionProps extends ApplicationQuestion {
	additionalData: {
		steps?: number;
		max?: number;
		min?: number;
		unit?: string;
	};
}

function validation(props: SliderQuestionProps): (value: string) => void {
	return (value: string) => {
		return false;
	};
}

const SliderQuestion = (props: SliderQuestionProps) => {
	return (
		<Stack style={props.style} gap={0}>
			<Input.Label>{props.title}</Input.Label>
			<Input.Description>{props.subtitle}</Input.Description>
			<Slider
				label={(value) =>
					props.additionalData.unit ? `${value} ${props.additionalData.unit}` : value
				}
				max={props.additionalData.max}
				min={props.additionalData.min}
				step={props.additionalData.steps}
				onChange={(e) => !props.readonly && props.onChange && props.onChange(e)}
				disabled={props.disabled}
				value={props.value}
			/>
			<Input.Error mt={4}>{props.error}</Input.Error>
		</Stack>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return (
		<>
			<Group grow mb="md">
				<NumberInput
					label="Slider Steps"
					defaultValue={editingQuestion?.additionalData.steps}
					onChange={(e) => handleUpdateEditingQuestion({ steps: e }, true)}
				/>
				<NumberInput
					label="Maximum Value"
					defaultValue={editingQuestion?.additionalData.max}
					onChange={(e) => handleUpdateEditingQuestion({ max: e }, true)}
				/>

				<NumberInput
					label="Minimum Value"
					defaultValue={editingQuestion?.additionalData.min}
					onChange={(e) => handleUpdateEditingQuestion({ min: e }, true)}
				/>
			</Group>
			<TextInput
				label="Unit"
				defaultValue={editingQuestion?.additionalData.unit}
				onChange={(e) => handleUpdateEditingQuestion({ unit: e.target.value }, true)}
			/>
		</>
	);
};

SliderQuestion.edit = EditQuestion;
SliderQuestion.mockdata = { steps: 1, max: 100, min: 0 };
SliderQuestion.validation = validation;
SliderQuestion.icon = IconAdjustments;
export default SliderQuestion;

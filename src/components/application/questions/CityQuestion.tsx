import { ApplicationQuestion } from '../../../utils/application/ApplicationQuestions';
import Icon from '../../Icon';
import { IconBuildingSkyscraper } from '@tabler/icons';
import { TextInput } from '@mantine/core';

export interface CityQuestionProps extends ApplicationQuestion {
	additionalData: {
		country?: string;
	};
}

function validation(value: any, props: CityQuestionProps): boolean {
	//TODO: Validate City
	return true;
}

const CityQuestion = (props: CityQuestionProps) => {
	return (
		<TextInput
			{...props.form}
			icon={<Icon name={props.icon} />}
			required={props.required}
			description={props.subtitle}
			placeholder={props.placeholder}
			label={props.title}
			style={props.style}
			autosize
			minRows={2}
			maxRows={5}
			{...props.form}
		/>
	);
};

const EditQuestion = ({ editingQuestion, handleUpdateEditingQuestion }: any) => {
	return (
		<>
			<TextInput
				required
				defaultValue={editingQuestion?.additionalData.country}
				label="Country"
				description="The country to autocomplete"
				mb="md"
				onChange={(e) => handleUpdateEditingQuestion({ additionalData: { country: e.target.value } })}
			/>
		</>
	);
};

CityQuestion.edit = EditQuestion;
CityQuestion.mockdata = {};
CityQuestion.validation = validation;
CityQuestion.icon = IconBuildingSkyscraper;
export default CityQuestion;

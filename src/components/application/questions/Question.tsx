import { Divider } from '@mantine/core';
import { Edit } from 'tabler-icons-react';
import { ApplicationQuestions } from '../../../utils/application/ApplicationQuestions';

const Question = (props: any) => {
	const QuestionType = ApplicationQuestions[props.type];
	return <QuestionType {...props} />;
};
export const EditQuestion = (props: any) => {
	const EditQuestionType = ApplicationQuestions[props.type].edit;
	if (EditQuestionType == null || EditQuestionType == undefined) return null;
	return (
		<>
			<Divider my="md" label="Additional Data" labelPosition="center" />
			<EditQuestionType {...props} />
		</>
	);
};

export default Question;

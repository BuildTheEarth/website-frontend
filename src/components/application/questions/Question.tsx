import { ApplicationQuestion, ApplicationQuestions } from '../../../utils/application/ApplicationQuestions';
import { Divider, Switch } from '@mantine/core';

import { IconTextSize } from '@tabler/icons';

const Question = (props: any) => {
	const QuestionType = ApplicationQuestions[props.type];
	return <QuestionType {...props} />;
};
export const EditQuestion = (props: any) => {
	const EditQuestionType = ApplicationQuestions[props.type].edit;
	if (EditQuestionType == null) return null;
	return (
		<>
			<Divider my="md" label="Additional Data" labelPosition="center" />
			<EditQuestionType {...props} />
		</>
	);
};

export default Question;

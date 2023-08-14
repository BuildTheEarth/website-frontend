import { Accordion, Button, Flex, Skeleton, useMantineTheme } from '@mantine/core';

import { IconEdit } from '@tabler/icons';
import { NextPage } from 'next';
import Page from '../../components/Page';
import SearchInput from '../../components/SearchInput';
import fetcher from '../../utils/Fetcher';
import sanitizeHtml from 'sanitize-html';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useUser } from '../../hooks/useUser';

const Faq: NextPage = ({ data }: any) => {
	const router = useRouter();
	const [search, setSearch] = useState('');
	const { t } = useTranslation('faq');
	const user = useUser();
	return (
		<Page
			head={{
				title: t('head.title'),
				image: '/images/placeholder.webp',
				large: true,
			}}
			title="FAQ"
			description="Answers to all frrequently asked Questions about the BuildTheEarth Project"
		>
			<Flex justify="flex-end" align="center" direction="row" mb="md">
				<SearchInput onSearch={(search) => setSearch(search)} />
				{(user.hasPermission('faq.add') || user.hasPermission('faq.edit') || user.hasPermission('faq.remove')) && (
					<Button leftIcon={<IconEdit />} onClick={() => router.push('faq/manage')} ml="md">
						Edit Questions
					</Button>
				)}
			</Flex>
			<Accordion variant="separated">
				{data
					?.filter((element: any) => element.question.toLowerCase().includes(search.toLowerCase()))
					.map((element: any) => (
						<Accordion.Item value={element.id} key={element.id}>
							<Accordion.Control>{element.question}</Accordion.Control>
							<Accordion.Panel>
								<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(element.answer) }} />
							</Accordion.Panel>
						</Accordion.Item>
					))}
			</Accordion>
		</Page>
	);
};

export default Faq;

export async function getStaticProps({ locale }: any) {
	const res = await fetcher('/faq');
	console.log(res?.length);

	return { props: { data: res, ...(await serverSideTranslations(locale, ['common', 'faq'])) } };
}

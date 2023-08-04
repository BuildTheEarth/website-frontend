import { Accordion, ActionIcon, Button, Flex, Group, Skeleton, TextInput, useMantineTheme } from '@mantine/core';
import { IconEdit, IconSearch } from '@tabler/icons';
import React, { useState } from 'react';

import { NextPage } from 'next';
import Page from '../../components/Page';
import SearchInput from '../../components/SearchInput';
import sanitizeHtml from 'sanitize-html';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';
import { useUser } from '../../hooks/useUser';

const Faq: NextPage = () => {
	const router = useRouter();
	const [search, setSearch] = useState('');
	const { t } = useTranslation('faq');
	const { data } = useSWR(`/faq`);
	const user = useUser();
	const theme = useMantineTheme();
	return (
		<Page
			head={{
				title: t('head.title'),
				image: '/images/placeholder.webp',
				large: true,
			}}
		>
			<Flex justify="flex-end" align="center" direction="row" mb="md">
				<SearchInput onSearch={(search) => setSearch(search)} />
				{(user.hasPermission('faq.add') || user.hasPermission('faq.edit') || user.hasPermission('faq.remove')) && (
					<Button leftIcon={<IconEdit />} onClick={() => router.push('faq/manage')} ml="md">
						Edit Questions
					</Button>
				)}
			</Flex>
			{!data &&
				new Array(5).fill(0).map((_, idx) => {
					return <Skeleton height={50} my={'md'} key={idx} />;
				})}
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
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'faq'])),
		},
	};
}

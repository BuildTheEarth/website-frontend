import { Accordion, Button, Flex } from '@mantine/core';

import Page from '@/components/Page';
import SearchInput from '@/components/SearchInput';
import { useIsClient } from '@/hooks/useIsClient';
import { usePermissions } from '@/hooks/usePermissions';
import thumbnail from '@/public/images/thumbnails/faq.png';
import fetcher from '@/utils/Fetcher';
import { IconEdit } from '@tabler/icons-react';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const Faq: NextPage = ({ data }: any) => {
	const router = useRouter();
	const [search, setSearch] = useState('');
	const { t } = useTranslation('faq');
	const permissions = usePermissions();
	const isClient = useIsClient();

	return (
		<Page
			head={{
				title: t('head.title'),
				image: thumbnail,
			}}
			title="FAQ"
			description="Answers to all frrequently asked Questions about the BuildTheEarth Project"
		>
			<Flex justify="flex-end" align="center" direction="row" mb="md">
				<SearchInput onSearch={(search) => setSearch(search)} />
				{permissions.hasAny(['faq.add', 'faq.edit', 'faq.remove']) && (
					<Button leftSection={<IconEdit />} onClick={() => router.push('faq/manage')} ml="md">
						{t('edit')}
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
								<div
									dangerouslySetInnerHTML={{ __html: isClient ? sanitizeHtml(element.answer) : '' }}
								/>
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
	return { props: { data: res, ...(await serverSideTranslations(locale, ['common', 'faq'])) } };
}

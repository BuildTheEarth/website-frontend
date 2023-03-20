import {Accordion, createStyles, Skeleton} from '@mantine/core';

import { NextPage } from 'next';
import Page from '../components/Page';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import useSWR from "swr";
import sanitizeHtml from 'sanitize-html';

const useStyles = createStyles((theme, _params, getRef) => {
	const control = getRef('control');

	return {
		control: {
			ref: control,
		},

		item: {
			border: 'none',
		},

		itemOpened: {
			[`& .${control}`]: {},
		},
	};
});

const Faq: NextPage = () => {
	const { classes } = useStyles();
	const { t } = useTranslation('faq');
	const { data } = useSWR(`/faq`);
	return (
		<Page
			head={{
				title: t('head.title'),
				image: '/images/placeholder.webp',
				large: true,
			}}
		>
			{
				!data &&
				new Array(5).fill(0).map(() => {
					return (
						<Skeleton height={50} my={"md"}/>
					)
				})
			}
			<Accordion variant="separated">
				{data?.map((element: any) => (
					<Accordion.Item value={element.id} key={element.id}>
						<Accordion.Control>{element.question}</Accordion.Control>
						<Accordion.Panel>
							<div dangerouslySetInnerHTML={{__html: sanitizeHtml(element.answer)}} />
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

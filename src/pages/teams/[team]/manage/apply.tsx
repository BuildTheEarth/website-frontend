import { DNDItem } from '../../../../components/dnd/DNDItem';
import { NextPage } from 'next';
import Page from '../../../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Apply: NextPage = () => {
	return (
		<Page
			head={{
				title: 'Edit Application Questions',
				image: '/images/placeholder.webp',
				large: true,
			}}
		>
			<DNDItem
				data={[
					{
						position: 6,
						mass: 12.011,
						symbol: 'C',
						name: 'Carbon',
					},
					{
						position: 7,
						mass: 14.007,
						symbol: 'N',
						name: 'Nitrogen',
					},
					{
						position: 39,
						mass: 88.906,
						symbol: 'Y',
						name: 'Yttrium',
					},
					{
						position: 56,
						mass: 137.33,
						symbol: 'Ba',
						name: 'Barium',
					},
					{
						position: 58,
						mass: 140.12,
						symbol: 'Ce',
						name: 'Cerium',
					},
				]}
			></DNDItem>
		</Page>
	);
};
export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}
export default Apply;

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}
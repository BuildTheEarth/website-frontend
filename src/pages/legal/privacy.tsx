import { Anchor } from '@mantine/core';
import Link from 'next/link';
import { NextPage } from 'next';
import Page from '../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Team: NextPage = () => {
	//TODO: This privacy has to be reworked
	return (
		<Page
			head={{
				title: 'Privacy',
				image: 'https://cdn.buildtheearth.net/static/placeholder.webp',
			}}
			seo={{ nofollow: true, noindex: true }}
		>
			<h1>Privacy</h1>
			<h2>What information we keep</h2>
			<p>
				We do not save any personal information from normal visitors. When you log in to <i>My BuildTheEarth</i> using
				Discord, we save your Discord account ID and any information you explicitly enter on the website, which should
				not include any personal information.
			</p>
			<h2>Log files</h2>
			<p>Build The Earth does not log personally identifyable information such as IP addresses.</p>
			<h2>Third Party Privacy Policies</h2>
			<p>
				Build The Earth&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you
				to consult the respective Privacy Policies of these third-party servers for more detailed information. It may
				include their practices and instructions about how to opt-out of certain options. You can choose to disable
				cookies through your individual browser options.
				<br />
				To know more detailed information about cookie management with specific web browsers, it can be found at the
				browsers&apos; respective websites.
			</p>
			<h2>Children&apos;s Information</h2>
			<p>
				Another part of our priority is adding protection for children while using the internet. We encourage parents
				and guardians to observe, participate in, and/or monitor and guide their online activity.
				<br />
				Build The Earth does not knowingly collect any Personal Identifiable Information from children under the age of
				13. Personal data is only collected when a visitor logs in on <i>My BuildTheEarth</i>, which requires a Discord
				account. It is against Discord&apos;s Terms of Service for children younger than 13 to create an account. If you
				think that your child provided this kind of information on our website, we strongly encourage you{' '}
				<Anchor component={Link} href="/contact">
					contact
				</Anchor>{' '}
				us immediately and we will do our best efforts to promptly remove such information from our records.
			</p>
			<h2>Online Privacy Policy Only</h2>
			<p>
				Our Privacy Policy applies only to our online activities and is valid for visitors to our website with regards
				to the information that they shared and/or collect in Build The Earth. This policy is not applicable to any
				information collected offline or via channels other than this website.
			</p>
		</Page>
	);
};

export default Team;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

import type { Ni18nOptions } from 'ni18n';

const supportedLngs = ['gb', 'de'];

export const ni18nConfig: Ni18nOptions = {
	/**
	 * Set `fallbackLng` to the `supportedLngs` array in order for them all to be loaded
	 */
	fallbackLng: supportedLngs,
	supportedLngs,
	ns: ['default'],
	react: {
		useSuspense: false,
	},
};

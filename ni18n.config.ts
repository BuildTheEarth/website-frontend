// ni18n.config.ts

import type { Ni18nOptions } from 'ni18n';
import { languages } from './src/components/LanguageSwitcher';

export const ni18nConfig: Ni18nOptions = {
	fallbackLng: 'en',
	supportedLngs: ['en', 'de'],
	ns: ['common', 'errors', 'home'],
};

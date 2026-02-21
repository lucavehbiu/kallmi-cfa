import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'sq', 'it', 'de', 'fr'],
  defaultLocale: 'en'
});

export type Locale = (typeof routing.locales)[number];

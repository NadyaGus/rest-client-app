'use server';

import { LOCALE_COOKIE_NAME } from '@/constants';
import { Locale, defaultLocale } from '@/i18n/config';
import { cookies } from 'next/headers';

export async function getUserLocale() {
  return (await cookies()).get(LOCALE_COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(LOCALE_COOKIE_NAME, locale);
}

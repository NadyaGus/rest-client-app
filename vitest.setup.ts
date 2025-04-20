import '@testing-library/jest-dom/vitest';
import { createTranslator, useTranslations } from 'next-intl';
import { beforeAll, Mock, vi } from 'vitest';

vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test-env.supabase.co');
vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'our-test-key');

vi.mock('next-intl', async () => {
  const actual = await vi.importActual('next-intl');

  return {
    ...actual,
    useTranslations: vi.fn(() => vi.fn()),
  };
});

beforeAll(async () => {
  const translate = createTranslator({
    locale: 'en',
    messages: (await import('@/i18n/messages/en.json')).default,
  });

  (useTranslations as Mock).mockImplementation(() => translate);
});

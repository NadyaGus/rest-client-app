import { Header } from '@/components/header';
import messages from '@/i18n/messages/en.json';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, test, expect, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signOut: vi.fn(),
  }),
}));

describe('Header Component', () => {
  test('renders the header with title', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );
    const header = screen.getByRole('heading', { name: 'RESTful Client App' });
    expect(header).toBeInTheDocument();
  });
});

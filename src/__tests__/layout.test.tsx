import RootLayout from '@/app/layout';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    className: 'mock-roboto',
    style: { fontFamily: 'mock-roboto' },
  }),
}));

vi.mock('@mui/material-nextjs/v15-appRouter', () => ({
  AppRouterCacheProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cache-provider">{children}</div>
  ),
}));

vi.mock('@mui/material/styles', () => ({
  createTheme: vi.fn(() => ({})),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}));

describe('RootLayout', () => {
  test('renders all providers and content correctly', () => {
    render(
      <RootLayout>
        <main data-testid="content">Test Content</main>
      </RootLayout>
    );

    expect(screen.getByRole('heading', { name: 'RESTful Client' })).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('cache-provider')).toBeInTheDocument();

    const html = document.documentElement;
    expect(html.className).toContain('mock-roboto');
  });
});

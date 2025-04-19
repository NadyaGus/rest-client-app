import RestClientPage from '@/app/rest-client/[[...opts]]/page';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = () => <div data-testid="loading-skeleton">Loading...</div>;
    DynamicComponent.displayName = 'DynamicComponent';
    return DynamicComponent;
  },
}));

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    use: (promise: Promise<unknown>) => promise,
  };
});

describe('RestClientPage', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('renders with loading state initially', async () => {
    await act(async () => {
      render(<RestClientPage params={Promise.resolve({})} />);
    });

    await waitFor(
      () => {
        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});

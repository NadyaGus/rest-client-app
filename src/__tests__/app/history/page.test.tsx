import HistoryPage from '@/app/history/page';
import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = () => <div data-testid="loading-skeleton">Loading...</div>;
    DynamicComponent.displayName = 'DynamicComponent';
    return DynamicComponent;
  },
}));

describe('HistoryPage', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('renders with loading state initially', () => {
    render(<HistoryPage />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});

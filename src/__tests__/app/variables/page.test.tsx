import VariablesPage from '@/app/variables/page';
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

describe('VariablesPage', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('renders with loading state initially', () => {
    render(<VariablesPage />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});

import Error from '@/app/error';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';

describe('Error', () => {
  const mockReset = vi.fn();
  const mockError = {
    message: 'Test error message',
    name: 'Error',
    digest: 'test-digest',
  };

  afterEach(() => {
    cleanup();
    mockReset.mockClear();
  });

  test('renders error page with correct elements', () => {
    render(<Error error={mockError} reset={mockReset} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  test('clicking Try Again button calls reset function', async () => {
    const user = userEvent.setup();
    render(<Error error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    await user.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});

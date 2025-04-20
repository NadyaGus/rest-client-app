import NotFound from '@/app/not-found';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('NotFound', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders 404 page with correct elements', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'returnHome' })).toBeInTheDocument();
  });

  test('clicking Return Home button navigates to home page', () => {
    render(<NotFound />);

    const [homeButton] = screen.getAllByRole('button', { name: 'returnHome' });
    homeButton.click();

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});

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
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText("The page you're looking for doesn't exist or has been moved.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Return Home' })).toBeInTheDocument();
  });

  test('clicking Return Home button navigates to home page', () => {
    render(<NotFound />);

    const [homeButton] = screen.getAllByRole('button', { name: 'Return Home' });
    homeButton.click();

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});

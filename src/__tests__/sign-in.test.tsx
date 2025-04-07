import SignInPage from '@/app/sign-in/page';
import { createClient } from '@/utils/supabase/client';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';

vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn(),
    },
  })),
}));

const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe('SignInPage', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('renders sign-in form with correct fields', () => {
    render(<SignInPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
  });

  test('handles successful sign-in and redirects to the main page', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({ error: null });
    const mockCreateClient = createClient as unknown as ReturnType<typeof vi.fn>;
    mockCreateClient.mockReturnValue({
      auth: {
        signInWithPassword: mockSignIn,
      },
    });

    const { container } = render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'correct-password' },
    });

    const submitButton = container.querySelector('button[type="submit"]');
    if (!submitButton) {
      throw new Error('Submit button not found');
    }
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'correct-password',
      });
    });

    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });

  test('displays error message on failed sign-in', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({
      error: { message: 'Invalid email or password' },
    });
    const mockCreateClient = createClient as unknown as ReturnType<typeof vi.fn>;
    mockCreateClient.mockReturnValue({
      auth: {
        signInWithPassword: mockSignIn,
      },
    });

    const { container } = render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrong-password' },
    });

    const submitButton = container.querySelector('button[type="submit"]');
    if (!submitButton) {
      throw new Error('Submit button not found');
    }
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });

  test('disables form elements in the loading state', async () => {
    const mockSignIn = vi
      .fn()
      .mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ error: null }), 100)));
    const mockCreateClient = createClient as unknown as ReturnType<typeof vi.fn>;
    mockCreateClient.mockReturnValue({
      auth: {
        signInWithPassword: mockSignIn,
      },
    });

    const { container } = render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'correct-password' },
    });

    const submitButton = container.querySelector('button[type="submit"]');
    if (!submitButton) {
      throw new Error('Submit button not found');
    }
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeDisabled();
      expect(screen.getByLabelText(/password/i)).toBeDisabled();
      expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
    });
  });
});

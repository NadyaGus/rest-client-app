import SignUpPage from '@/app/sign-up/page';
import { createClient } from '@/utils/supabase/client';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';

vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signUp: vi.fn(),
    },
  })),
}));

const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe('SignUpPage', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('renders sign-up form with correct fields', () => {
    render(<SignUpPage />);

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^sign up$/i })).toBeInTheDocument();
  });

  test('handles successful sign-up and redirects to the main page', async () => {
    const mockSignUp = vi.fn().mockResolvedValue({ error: null });
    const mockCreateClient = createClient as unknown as ReturnType<typeof vi.fn>;
    mockCreateClient.mockReturnValue({
      auth: {
        signUp: mockSignUp,
      },
    });

    render(<SignUpPage />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'correct-password' },
    });
    fireEvent.change(screen.getByTestId('confirmPassword'), {
      target: { value: 'correct-password' },
    });

    const submitButton = screen.getByRole('button', { name: /^sign up$/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'correct-password',
      });
    });

    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });

  test('displays error message when passwords do not match', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'correct-password' },
    });
    fireEvent.change(screen.getByTestId('confirmPassword'), {
      target: { value: 'another-password' },
    });

    const submitButton = screen.getByRole('button', { name: /^sign up$/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  test('displays error message on failed sign-up', async () => {
    const mockSignUp = vi.fn().mockResolvedValue({
      error: { message: 'Email already in use' },
    });
    const mockCreateClient = createClient as unknown as ReturnType<typeof vi.fn>;
    mockCreateClient.mockReturnValue({
      auth: {
        signUp: mockSignUp,
      },
    });

    render(<SignUpPage />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'correct-password' },
    });
    fireEvent.change(screen.getByTestId('confirmPassword'), {
      target: { value: 'correct-password' },
    });

    const submitButton = screen.getByRole('button', { name: /^sign up$/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument();
    });
  });

  test('disables form elements in the loading state', async () => {
    const mockSignUp = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ error: null }), 100);
        })
    );

    const mockCreateClient = createClient as unknown as ReturnType<typeof vi.fn>;
    mockCreateClient.mockReturnValue({
      auth: {
        signUp: mockSignUp,
      },
    });

    render(<SignUpPage />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'correct-password' },
    });
    fireEvent.change(screen.getByTestId('confirmPassword'), {
      target: { value: 'correct-password' },
    });

    const submitButton = screen.getByRole('button', { name: /^sign up$/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /email/i })).toBeDisabled();
      expect(screen.getByTestId('password')).toBeDisabled();
      expect(screen.getByTestId('confirmPassword')).toBeDisabled();
      expect(screen.getByRole('button', { name: /signing up/i })).toBeDisabled();
    });
  });
});

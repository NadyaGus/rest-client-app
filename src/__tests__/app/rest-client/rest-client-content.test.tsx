import { RestClientContent } from '@/app/rest-client/[[...opts]]/rest-client-content';
import { ROUTES } from '@/constants';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('RestClientContent', () => {
  const mockRouter = {
    push: vi.fn(),
  };
  const mockReplaceState = vi.fn();

  beforeEach(() => {
    cleanup();
    (useRouter as Mock).mockReturnValue(mockRouter);
    vi.clearAllMocks();
    // Mock window.history.replaceState
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = mockReplaceState;
    return () => {
      window.history.replaceState = originalReplaceState;
    };
  });

  test('renders correctly with initial method', () => {
    const url = 'https://example.com';
    const encodedUrl = 'aHR0cHM6Ly9leGFtcGxlLmNvbQ';
    render(<RestClientContent opts={['GET', encodedUrl]} />);

    const select = screen.getAllByRole('combobox')[0];
    const urlInput = screen.getByPlaceholderText('Enter URL');

    expect(select).toHaveTextContent('GET');
    expect(urlInput).toHaveValue(url);
  });

  test('updates selected method on change', () => {
    const encodedUrl = 'aHR0cHM6Ly9leGFtcGxlLmNvbQ';
    render(<RestClientContent opts={['GET', encodedUrl]} />);

    const select = screen.getAllByRole('combobox')[0];
    fireEvent.mouseDown(select);

    const postOption = screen.getByText('POST');
    fireEvent.click(postOption);

    expect(select).toHaveTextContent('POST');
    expect(mockReplaceState).toHaveBeenCalledWith({}, '', `${ROUTES.restClient.href}/POST/${encodedUrl}`);
  });

  test('updates URL input value on change', () => {
    render(<RestClientContent opts={['GET', 'https://example.com']} />);

    const urlInput = screen.getByPlaceholderText('Enter URL');
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });

    expect(urlInput).toHaveValue('https://example.com');
    expect(mockReplaceState).toHaveBeenLastCalledWith(
      {},
      '',
      `${ROUTES.restClient.href}/GET/aHR0cHM6Ly9leGFtcGxlLmNvbQ`
    );
  });

  test('updates the URL in the browser history when method changes', () => {
    const encodedUrl = 'aHR0cHM6Ly9leGFtcGxlLmNvbQ';
    render(<RestClientContent opts={['GET', encodedUrl]} />);

    const select = screen.getAllByRole('combobox')[0];
    fireEvent.mouseDown(select);

    const putOption = screen.getByText('PUT');
    fireEvent.click(putOption);

    expect(mockReplaceState).toHaveBeenCalledWith({}, '', `${ROUTES.restClient.href}/PUT/${encodedUrl}`);
  });
});

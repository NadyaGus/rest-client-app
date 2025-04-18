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

  beforeEach(() => {
    cleanup();
    (useRouter as Mock).mockReturnValue(mockRouter);
    vi.clearAllMocks();
  });

  test('renders correctly with initial method', () => {
    const url = 'https://example.com';
    const encodedUrl = 'aHR0cHM6Ly9leGFtcGxlLmNvbQ==';
    render(<RestClientContent opts={['GET', encodedUrl]} />);

    const select = screen.getByRole('combobox');
    const input = screen.getByRole('textbox');

    expect(select).toHaveTextContent('GET');
    expect(input).toHaveValue(url);
  });

  test('updates selected method on change', () => {
    const encodedUrl = 'aHR0cHM6Ly9leGFtcGxlLmNvbQ==';
    render(<RestClientContent opts={['GET', encodedUrl]} />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const postOption = screen.getByText('POST');
    fireEvent.click(postOption);

    expect(select).toHaveTextContent('POST');
    expect(useRouter().push).toHaveBeenCalledWith(`${ROUTES.restClient.href}/POST/${encodedUrl}`);
  });

  test('updates URL input value on change', () => {
    render(<RestClientContent opts={['GET', 'https://example.com']} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'https://example.com' } });

    expect(input).toHaveValue('https://example.com');
    expect(useRouter().push).toHaveBeenLastCalledWith(`${ROUTES.restClient.href}/GET/aHR0cHM6Ly9leGFtcGxlLmNvbQ==`);
  });

  test('updates the URL in the browser history when method changes', () => {
    const encodedUrl = 'aHR0cHM6Ly9leGFtcGxlLmNvbQ==';
    render(<RestClientContent opts={['GET', encodedUrl]} />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const putOption = screen.getByText('PUT');
    fireEvent.click(putOption);

    expect(useRouter().push).toHaveBeenCalledWith(`${ROUTES.restClient.href}/PUT/${encodedUrl}`);
  });
});

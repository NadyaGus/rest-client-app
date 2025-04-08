import RestClient from '@/app/rest-client/[[...opts]]/RestClient';
import { ROUTES } from '@/constants';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('RestClient', () => {
  const mockRouter = {
    push: vi.fn(),
  };

  beforeEach(() => {
    cleanup();
    (useRouter as Mock).mockReturnValue(mockRouter);
    vi.clearAllMocks();
  });

  test('renders correctly with initial method', () => {
    render(<RestClient initMethod="GET" initUrl="https://example.com" />);

    const select = screen.getByRole('combobox');
    const input = screen.getByRole('textbox');

    expect(select).toHaveTextContent('GET');
    expect(input).toHaveValue('https://example.com');
  });

  test('updates selected method on change', () => {
    render(<RestClient />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const postOption = screen.getByText('POST');
    fireEvent.click(postOption);

    expect(select).toHaveTextContent('POST');
    expect(useRouter().push).toHaveBeenCalledWith('/rest-client/POST');
  });

  test('updates URL input value on change', () => {
    render(<RestClient />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'https://example.com' } });

    expect(input).toHaveValue('https://example.com');
    expect(useRouter().push).toHaveBeenLastCalledWith(`${ROUTES.restClient.href}/GET/aHR0cHM6Ly9leGFtcGxlLmNvbQ==`);
  });

  test('updates the URL in the browser history when method changes', () => {
    render(<RestClient />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const putOption = screen.getByText('PUT');
    fireEvent.click(putOption);

    expect(useRouter().push).toHaveBeenCalledWith('/rest-client/PUT');
  });
});

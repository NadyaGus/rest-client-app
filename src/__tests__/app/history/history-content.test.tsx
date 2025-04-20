import { HistoryContent } from '@/app/history/history-content';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

interface RequestHistory {
  url: string;
  method: string;
  body: string;
  headers: Array<{ name: string; value: string }>;
  timestamp: number;
}

const mockHistory: RequestHistory[] = [
  {
    url: 'https://api.example.com/test',
    method: 'GET',
    body: '',
    headers: [{ name: 'Content-Type', value: 'application/json' }],
    timestamp: 1234567890,
  },
];

const mockUseHistory = vi.fn(() => ({
  history: [] as RequestHistory[],
}));

vi.mock('@/app/rest-client/hooks/use-history', () => ({
  useHistory: () => mockUseHistory(),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('HistoryContent', () => {
  test('renders empty state when no history is present', () => {
    mockUseHistory.mockReturnValue({ history: [] });
    render(<HistoryContent />);

    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText(/no request history yet/i)).toBeInTheDocument();
  });

  test('renders history list when history is present', () => {
    mockUseHistory.mockReturnValue({ history: mockHistory });
    render(<HistoryContent />);

    expect(screen.getByRole('heading', { name: /history/i })).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com/test')).toBeInTheDocument();
  });
});

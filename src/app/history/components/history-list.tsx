import { Box } from '@mui/material';

import { HistoryItem } from './history-item';

interface RequestHistory {
  url: string;
  method: string;
  body: string;
  headers: Array<{ name: string; value: string }>;
  status: number;
  timestamp: number;
}

interface HistoryListProps {
  history: RequestHistory[];
}

export const HistoryList = ({ history }: HistoryListProps) => {
  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {sortedHistory.map((request) => (
        <HistoryItem
          key={request.timestamp}
          id={request.timestamp}
          title={request.url}
          url={request.url}
          method={request.method}
          headers={request.headers}
          status={request.status}
        />
      ))}
    </Box>
  );
};

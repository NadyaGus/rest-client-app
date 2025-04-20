import { Box, Typography } from '@mui/material';

interface RequestHistory {
  url: string;
  method: string;
  body: string;
  headers: Array<{ name: string; value: string }>;
  timestamp: number;
}

interface HistoryListProps {
  history: RequestHistory[];
}

export const HistoryList = ({ history }: HistoryListProps) => {
  return (
    <>
      {history.map((request) => (
        <Box key={request.timestamp}>
          <Typography variant="h6" component="h2">
            {request.url}
          </Typography>
        </Box>
      ))}
    </>
  );
};

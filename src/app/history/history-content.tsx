'use client';

import { Box, Container, Typography } from '@mui/material';

import { useHistory } from '../rest-client/hooks/use-history';
import { EmptyHistory } from './components/empty-history';

export const HistoryContent = () => {
  const { history } = useHistory();

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          History
        </Typography>
        {history && history.length > 0 ? (
          history.map((request) => (
            <Box key={request.timestamp}>
              <Typography variant="h6" component="h2">
                {request.url}
              </Typography>
            </Box>
          ))
        ) : (
          <EmptyHistory />
        )}
      </Box>
    </Container>
  );
};

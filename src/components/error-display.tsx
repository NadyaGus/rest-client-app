import { Box, Button, Typography } from '@mui/material';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  retryButtonText?: string;
}

export function ErrorDisplay({
  title = 'Something went wrong',
  message = 'An unexpected error occurred',
  onRetry,
  retryButtonText = 'Try again',
}: ErrorDisplayProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        p: 4,
      }}
    >
      <Typography variant="h5" color="error" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" mb={3}>
        {message}
      </Typography>
      <Button variant="contained" onClick={onRetry}>
        {retryButtonText}
      </Button>
    </Box>
  );
}

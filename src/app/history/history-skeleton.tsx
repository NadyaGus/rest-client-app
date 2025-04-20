import { Box, Container, Skeleton } from '@mui/material';

export function HistorySkeleton() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
        <Skeleton variant="text" sx={{ fontSize: '2.125rem', width: '200px', mx: 'auto' }} />

        <Skeleton variant="rounded" height={200} />
      </Box>
    </Container>
  );
}

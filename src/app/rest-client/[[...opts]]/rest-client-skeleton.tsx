import { Box, Skeleton } from '@mui/material';

export function RestClientSkeleton() {
  return (
    <Box sx={{ p: 3, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
      <Skeleton variant="rectangular" width={200} height={40} />
      <Skeleton variant="rectangular" width="100%" height={400} />
    </Box>
  );
}

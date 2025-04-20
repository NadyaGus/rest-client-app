import { Box, Container, Skeleton } from '@mui/material';

export default function VariablesSkeleton() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
        <Skeleton variant="text" sx={{ fontSize: '2.125rem', width: '200px', mx: 'auto' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Skeleton variant="rounded" height={55} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={55} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={55} width={140} />
        </Box>

        <Skeleton variant="rounded" height={400} />
      </Box>
    </Container>
  );
}

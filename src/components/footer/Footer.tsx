import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export const Footer = () => {
  const bgColor = '#303030';

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: bgColor,
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        <Link href="https://github.com/The-Redux-Rangers/rest-client-app">Github</Link>
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center">
        <Link href="https://github.com/orgs/The-Redux-Rangers/people" target="_blank">
          {'Copyright © '}
          The Redux Rangers {new Date().getFullYear()}
          {'.'}
        </Link>
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center">
        <Link href="https://rs.school/" target="_blank">
          RS-School
        </Link>
      </Typography>
    </Box>
  );
};

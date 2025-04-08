import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  const bgColor = '#303030';

  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        mt: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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

      <Box sx={{ display: 'block', width: '40px', height: '40px' }}>
        <Link href="https://rs.school/" target="_blank">
          <Image src="/rss-logo.svg" alt="RS-School Logo" width={40} height={40} />
        </Link>
      </Box>
    </Box>
  );
};

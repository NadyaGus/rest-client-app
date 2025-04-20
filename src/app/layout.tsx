import ErrorBoundary from '@/components/error-boundary';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import theme from '@/theme';
import { Box } from '@mui/material';

import './globals.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <html lang={locale} className={roboto.className}>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <NextIntlClientProvider>
            <ThemeProvider theme={theme}>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <Box
                  component={'main'}
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}
                >
                  <ErrorBoundary>{children}</ErrorBoundary>
                </Box>
                <Footer />
              </Box>
            </ThemeProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

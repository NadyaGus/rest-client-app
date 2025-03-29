export const ROUTES: Record<string, { href: string; title: string }> = {
  Home: {
    href: '/',
    title: 'Home',
  },
  'Sign in': {
    href: '/sign-in',
    title: 'Sign in',
  },
  'Sign up': {
    href: '/sign-up',
    title: 'Sign up',
  },
} as const;

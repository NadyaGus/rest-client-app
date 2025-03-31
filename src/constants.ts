export const ROUTES: Record<string, { href: string; title: string }> = {
  Home: {
    href: '/',
    title: 'Home',
  },
  signIn: {
    href: '/sign-in',
    title: 'Sign in',
  },
  signUp: {
    href: '/sign-up',
    title: 'Sign up',
  },
} as const;

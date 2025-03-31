type Routes = 'Home' | 'signIn' | 'signUp' | 'restClient' | 'variables' | 'history';

export const ROUTES: Record<Routes, { href: string; title: string }> = {
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
  restClient: {
    href: '/rest-client',
    title: 'RESTful Client',
  },
  variables: {
    href: '/variables',
    title: 'Variables',
  },
  history: {
    href: '/history',
    title: 'History',
  },
} as const;

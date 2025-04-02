enum Routes {
  home = 'home',
  signIn = 'signIn',
  signUp = 'signUp',
  restClient = 'restClient',
  variables = 'variables',
  history = 'history',
}

export const ROUTES: Record<`${Routes}`, { href: string; title: string }> = {
  home: {
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

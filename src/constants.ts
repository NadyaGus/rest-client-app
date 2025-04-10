enum Routes {
  main = 'main',
  signIn = 'signIn',
  signUp = 'signUp',
  signOut = 'signOut',
  restClient = 'restClient',
  variables = 'variables',
  history = 'history',
}

export const ROUTES: Record<`${Routes}`, { href: string; title: string }> = {
  main: {
    href: '/',
    title: 'Main',
  },
  signIn: {
    href: '/sign-in',
    title: 'Sign in',
  },
  signUp: {
    href: '/sign-up',
    title: 'Sign up',
  },
  signOut: {
    href: '/sign-out',
    title: 'Sign out',
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

export const AUTH_ROUTES = [ROUTES.signIn.href, ROUTES.signUp.href];
export const PUBLIC_ROUTES = [ROUTES.main.href, ...AUTH_ROUTES];
export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

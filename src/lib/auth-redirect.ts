/**
 * After sign-in / sign-up: never send users into /dashboard (hidden from this site’s UI).
 * Honors `next` only for safe internal paths outside /dashboard.
 */
export function postAuthRedirectPath(nextPath: string | undefined): string {
  if (nextPath && nextPath.startsWith('/') && !nextPath.startsWith('//')) {
    if (nextPath === '/dashboard' || nextPath.startsWith('/dashboard/')) {
      return '/'
    }
    return nextPath
  }
  return '/'
}

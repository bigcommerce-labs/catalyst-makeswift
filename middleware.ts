import { composeMiddlewares } from './middlewares/compose-middlewares';
import { withAuth } from './middlewares/with-auth';
import { withMakeswift } from './middlewares/with-makeswift';
import { withRoutes } from './middlewares/with-routes';

export const middleware = composeMiddlewares(withAuth, withMakeswift, withRoutes);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _vercel (vercel internals, eg: web vitals)
     * - favicon.ico (favicon file)
     */
    '/((?!api|admin|_next/static|_next/image|_vercel|favicon.ico).*)',
  ],
};

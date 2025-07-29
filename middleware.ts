
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import type { SessionData } from './lib/session';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req.cookies, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'kosheli_travel_session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });

  const { isLoggedIn } = session;

  // If the user is not logged in and is trying to access an admin page,
  // redirect them to the login page.
  if (!isLoggedIn && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // If the user is logged in and tries to access the login page,
  // redirect them to the admin dashboard.
  if (isLoggedIn && req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return res;
};

// Define which paths the middleware should apply to.
export const config = {
  matcher: ['/admin/:path*', '/login'],
};

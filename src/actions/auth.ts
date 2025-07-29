
'use server';

import { redirect } from 'next/navigation';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import type { SessionData } from '@/lib/session';

export async function login(prevState: { error: string } | undefined, formData: FormData) {
  const session = await getIronSession<SessionData>(cookies(), {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'kosheli_travel_session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });

  const username = formData.get('username');
  const password = formData.get('password');

  // IMPORTANT: In a real app, never hardcode credentials.
  // This is a simplified example. Use a database and hashed passwords.
  if (username === 'admin' && password === 'Kosheli@2032') {
    session.isLoggedIn = true;
    await session.save();
    redirect('/admin');
  }

  return { error: 'Invalid username or password.' };
}

export async function logout() {
  const session = await getIronSession<SessionData>(cookies(), {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'kosheli_travel_session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });

  session.destroy();
  redirect('/login');
}

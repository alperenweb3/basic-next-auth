'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Basic Next Authentication
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          {session?.user.role === 'admin' ? (
            <li>
              <Link href="/dashboard" className="hover:text-gray-300">
                Admin Dashboard
              </Link>
            </li>
          ) : null}
          {session ? (
            <>
              <li>
                <Link href="/protected">Protected</Link>
              </li>
              <li>
                <button onClick={() => signOut({ callbackUrl: '/' })}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth/signin">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

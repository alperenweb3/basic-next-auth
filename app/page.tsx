'use client';
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 max-w-5xl">
      <nav className="w-full">
        <ul className="flex w-full gap-2 justify-start">
          <li>
            <a href="/">Home</a>
          </li>
          {session ? (
            <>
              <li>
                <a href="/protected">Protected</a>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <a href="/auth/signin">Login</a>
            </li>
          )}
        </ul>
      </nav>
      <div className="z-10 w-full items-center justify-between lg:flex">
        <h1>Home Page</h1>
      </div>
    </main>
  );
}

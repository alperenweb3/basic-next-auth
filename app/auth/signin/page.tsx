'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setLoginError('Username or password is incorrect');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="max-w-xl p-8 bg-white shadow-md" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl font-bold">Sign In</h1>
        <input
          className="w-full p-2 mb-4 border text-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
        />
        <input
          className="w-full p-2 mb-4 border text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Password"
        />
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}

        <button className="w-full p-2 text-white bg-blue-500" type="submit">
          Sign In
        </button>
        <p className="pt-5">
          Please{' '}
          <Link className="text-red-500" href="/auth/signup">
            sign up
          </Link>{' '}
          if you don&apos;t have an account
        </p>
      </form>
    </div>
  );
}

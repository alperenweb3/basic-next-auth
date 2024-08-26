'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      alert('Login failed');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="p-8 bg-white shadow-md" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl font-bold">Sign In</h1>
        <input
          className="w-full p-2 mb-4 border text-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="w-full p-2 mb-4 border text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="w-full p-2 text-white bg-blue-500" type="submit">
          Sign In
        </button>
        <p className="pt-5">
          Please{' '}
          <a className="text-red-500" href="/auth/signup">
            sign up
          </a>{' '}
          if you dont have an account
        </p>
      </form>
    </div>
  );
}

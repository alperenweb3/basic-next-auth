'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/auth/signin');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="p-8 bg-white shadow-md" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl font-bold">Sign Up</h1>
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
          Sign Up
        </button>
        <p className="pt-5">
          Please{' '}
          <a className="text-red-500" href="/auth/signin">
            sign in
          </a>{' '}
          if you have an account
        </p>
      </form>
    </div>
  );
}

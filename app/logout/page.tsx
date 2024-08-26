'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Sign out the user and redirect to the homepage
    signOut({ redirect: false }).then(() => {
      router.push('/');
    });
  }, [router]);

  return <div>Logging you out...</div>;
}

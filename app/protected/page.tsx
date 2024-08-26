'use client'; // Mark this component as a Client Component

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }

    // Check if the user is authenticated but not authorized
    if (status === 'authenticated' && session) {
      const allowedPages = session.user?.allowedPages || [];
      const currentPage = 'protected'; // Set this to the current page you are protecting

      // If the user does not have access to the current page, redirect
      if (!allowedPages.includes(currentPage)) {
        router.push('/unauthorized'); // Redirect to an unauthorized access page
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Render nothing if there is no session (user not authenticated)
  }

  // Authorized content for logged-in users
  return (
    <div>
      <h1>
        Welcome to the Protected Page{' '}
        {session.user?.name ? session.user.name : 'undefined'}
      </h1>
      <p>
        Your Username is{' '}
        {session.user?.email ? session.user.email : 'undefined'}
      </p>
      <p>This content is protected and only visible to authorized users.</p>
    </div>
  );
}

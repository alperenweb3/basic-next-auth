'use client'; // Mark this component as a Client Component

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true); // State to manage checking authorization

  useEffect(() => {
    if (status === 'loading') return; // Wait until session is loaded

    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && session) {
      const allowedPages = session.user?.allowedPages || [];
      const currentPage = 'protected'; // Set this to the current page you are protecting

      if (!allowedPages.includes(currentPage)) {
        router.push('/unauthorized'); // Redirect to an unauthorized access page
        return;
      }

      // Set checking to false once all checks are done
      setIsChecking(false);
    }
  }, [status, session, router]);

  // Render a loading state while checking the user's authorization
  if (status === 'loading' || isChecking) {
    return <Loading />;
  }

  // If session is undefined or user is not authorized, render nothing
  if (!session) {
    return null;
  }

  // Authorized content for logged-in users
  return (
    <div className="flex-grow flex flex-col">
      <section className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the Protected Page!
            <p>{session.user?.name ? session.user.name : 'undefined'}</p>
          </h1>
          <p className="text-xl mb-8">
            Your Username is{' '}
            {session.user?.email ? session.user.email : 'undefined'}
          </p>
          <p>This content is protected and only visible to authorized users.</p>
        </div>
      </section>
    </div>
  );
}

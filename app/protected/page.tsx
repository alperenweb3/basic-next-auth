'use client'; // Mark this component as a Client Component

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/signin'); // Use router to navigate to the sign-in page
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Render nothing if there is no session (user not authenticated)
  }

  // Authorized content for logged-in users
  return (
    <div>
      <h1>Welcome to the Protected Page</h1>
      <p>
        Your Username is {session.user?.name ? session.user.name : 'undefined'}
      </p>
      <p>This content is protected and only visible to authorized users.</p>
    </div>
  );
}

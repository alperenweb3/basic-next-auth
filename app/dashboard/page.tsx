'use client'; // Mark this component as a Client Component

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define the user type
type User = {
  name: string;
  email: string;
  allowedPages: string[];
  createdAt: string;
  role: string; // Add the role property
};

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data: User[] = await response.json();
      setUsers(
        data.map((user) => ({
          ...user,
          allowedPages: user.allowedPages || [],
        })),
      );
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'loading') return; // Wait until session is loaded

    if (status === 'unauthenticated') {
      router.push('/auth/signin'); // Redirect to login if not authenticated
      return;
    }

    if (status === 'authenticated' && session) {
      if (session.user.role !== 'admin') {
        router.push('/unauthorized'); // Redirect to an unauthorized access page
      } else {
        fetchUsers(); // Fetch users if the user is an admin
      }
    }
  }, [status, session, router]);

  const handlePermissionChange = async (
    email: string,
    allowedPages: string[],
  ) => {
    try {
      const response = await fetch(`/api/users/${email}/permissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allowedPages }),
      });

      const updatedUser: User = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === updatedUser.email ? updatedUser : user,
        ),
      );

      // If the updated user is the currently logged-in user, refresh session
      if (session?.user.email === email) {
        await update(); // Force session update to reflect changes immediately
      }
    } catch (error) {
      console.error('Failed to update user permissions', error);
    }
  };

  // Render a loading state or nothing while checking authentication and authorization
  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-24">
      <h1>Dashboard</h1>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Email</th>
            <th>Allowed Pages</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.allowedPages.join(', ')}</td>
              <td>
                <button
                  onClick={() =>
                    handlePermissionChange(user.email, ['protected'])
                  }
                >
                  Grant Access to Protected Page
                </button>
                <button
                  className="pl-5"
                  onClick={() => handlePermissionChange(user.email, [])}
                >
                  Revoke All Access
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

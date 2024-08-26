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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
                Allowed Pages
              </th>
              <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.email}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-4 px-6 border-b border-gray-200">
                  {user.name}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {user.email}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {user.allowedPages.join(', ')}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <button
                    onClick={() =>
                      handlePermissionChange(user.email, ['protected'])
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mr-2"
                  >
                    Grant Access
                  </button>
                  <button
                    onClick={() => handlePermissionChange(user.email, [])}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    Revoke Access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

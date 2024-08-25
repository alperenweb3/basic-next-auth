'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await fetch('/api/auth/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (res.ok) {
      alert('Password updated successfully');
      router.push('/');
    } else {
      alert('Failed to update password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="p-8 bg-white shadow-md" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl font-bold">Update Password</h1>
        <input
          className="w-full p-2 mb-4 border"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
        />
        <input
          className="w-full p-2 mb-4 border"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <button className="w-full p-2 text-white bg-blue-500" type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
}

'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      className="mt-4 bg-red-600 text-white py-2 px-4 rounded"
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      Sign Out
    </button>
  );
}

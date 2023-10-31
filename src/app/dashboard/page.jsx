import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import SignOutButton from '@/components/SignOutButton';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') redirect('/login');

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Admin Dashboard</h1>
      <p>Welcome {session?.user.email ?? 'guest'}</p>
      {session && <SignOutButton />}
    </main>
  );
}

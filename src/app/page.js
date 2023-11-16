import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import SignOutButton from '@/components/SignOutButton';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log('getServerSession:', session);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Welcome {session?.user.email ?? 'guest'}</h1>
      {session && <SignOutButton />}
    </main>
  );
}

import { getServerSession } from 'next-auth';
// import { authOptions } from '../../api/auth/[...nextauth]/route';
import { authOptions } from './api/auth/[...nextauth]/route';
import SignOutButton from '@/components/SignOutButton';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Home</h1>
      <p>Welcome {session?.user.email ?? 'guest'}</p>
      {session && <SignOutButton />}
    </main>
  );
}

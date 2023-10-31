import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

import LoginForm from '@/components/LoginForm';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  // For existing sessions, redirect based on user role
  if (session) {
    if (session.user.role === 'admin') {
      redirect('/admin/dashboard');
    } else {
      redirect('/');
    }
  }

  return (
    <main className="form-container">
      <LoginForm />
    </main>
  );
}

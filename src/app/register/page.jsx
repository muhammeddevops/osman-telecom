import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

import RegisterForm from '@/components/RegisterForm';

export default async function RegisterPage() {
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
      <RegisterForm />
    </main>
  );
}

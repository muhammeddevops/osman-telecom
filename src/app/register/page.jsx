import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

import RegisterForm from '@/components/RegisterForm';

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === 'admin') {
      redirect('/dashboard');
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

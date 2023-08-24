import LoginForm from '@/components/LoginForm';

export default function AdminPage() {
  // Logged in
  // if (user.role === "admin") // redirect

  // if not logged in render login form
  return (
    <main className="flex justify-center items-center h-screen">
      <LoginForm />
    </main>
  );
}

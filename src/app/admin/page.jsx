import LoginForm from '@/components/LoginForm';

export default function AdminPage() {
  // Logged in
  // if (user.role === "admin") // redirect

  // if not logged in render login form

  return (
    <main className="form-container">
      <LoginForm title="Login to Dashboard" />
    </main>
  );
}

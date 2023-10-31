'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import validateForm from '@/utils/validate-form';

export default function LoginForm({ title }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log({ session, status });

  // Redirect appropriately if session is valid
  useEffect(() => {
    if (session) {
      if (session.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  //! TESTING ONLY
  if (Object.keys(errors).length) console.log('errors:', errors);

  const onSubmit = async (data) => {
    try {
      const res = await signIn('credentials', { ...data, redirect: false });
      console.log('login response', res);

      if (!res.ok && res.error) throw res.error;

      // redirect after successful login is handled by useEffect (above)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 border border-slate-950 px-8 py-10 rounded-md">
      <h1 className="text-center text-4xl">{title ?? 'Log In'}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 justify-center items-center w-96"
        noValidate
      >
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>

          <input
            id="email"
            className="form-input"
            type="text"
            placeholder="Enter your email..."
            {...register('email', {
              required: validateForm.required('email'),
              validate: (value) => validateForm.email(value),
            })}
          />

          {errors.email?.message && (
            <p className="text-red-600 font-semibold">
              * {errors.email.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Password
          </label>

          <input
            id="password"
            className="form-input"
            type="password"
            placeholder="Enter your password..."
            {...register('password', {
              required: validateForm.required('password'),
            })}
          />

          {errors.password?.message && (
            <p className="text-red-600 font-semibold">
              * {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="font-bold uppercase bg-red-600 text-white px-8 py-4 rounded-md"
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  );
}

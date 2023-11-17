'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import validateForm from '@/utils/validate-form';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';

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
    setError,
    trigger,
  } = useForm({ mode: 'onTouched' });

  //! TESTING ONLY
  if (Object.keys(errors).length) console.log('errors:', errors);

  const onSubmit = async (data) => {
    try {
      // redirect after successful login is handled by useEffect (above)
      const res = await signIn('credentials', { ...data, redirect: false });
      console.log('Login response:', res);

      if (!res.ok && res.error) throw res.error;
    } catch (err) {
      console.error(err);

      if (err === 'Invalid credentials') {
        setError('email');
        setError('password', {
          type: 'BadCredentials',
          message: 'Invalid email or password',
        });
      } else {
        notifications.show({
          title: 'Something went wrong 😕',
          message: 'Try again later',
          color: 'red',
        });
      }
    }
  };

  // Used to revalidate field onBlur after BadCredentials error occurs on server-side
  const revalidateAfterServerError = () => {
    if (errors.password?.type === 'BadCredentials') {
      trigger('email');
      trigger('password');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 border border-slate-950 px-12 py-10 rounded-md">
      <Notifications position="top-center" />
      <h1 className="text-center text-4xl">{title ?? 'Log In'}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 justify-center items-center w-96"
        noValidate
      >
        <TextInput
          id="email"
          className="w-full"
          label="Email"
          withAsterisk
          placeholder="Enter your email..."
          {...register('email', {
            required: validateForm.required('email'),
            validate: (value) => validateForm.email(value),
            onBlur: revalidateAfterServerError,
          })}
          error={errors.email?.message || Object.hasOwn(errors, 'email')}
          size="lg"
        />

        <PasswordInput
          id="password"
          className="w-full"
          label="Password"
          withAsterisk
          placeholder="Enter your password..."
          {...register('password', {
            required: validateForm.required('password'),
            onBlur: revalidateAfterServerError,
          })}
          error={errors.password?.message}
          size="lg"
        />

        <Button
          type="submit"
          className="font-bold uppercase text-black px-8 py-4 rounded-md disabled:bg-slate-700"
          color="red"
          disabled={isSubmitting}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

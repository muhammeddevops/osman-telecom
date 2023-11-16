'use client';

import { useForm } from 'react-hook-form';
import validateForm from '@/utils/validate-form';
import { signIn } from 'next-auth/react';
import { Button } from '@mantine/core';

/** TODO input validation
 * email -> ensure valid email is entered ✅
  -> To truly validate email, send an email to the user to validate their account using something like SendGrid ❌
  -> what do you do if the email is not validated after registration? delete the account? ❌
 * password -> minLength of [x], contains at least 1 uppercase letter, 1 lowercase letter, 1 number & 1 special character ✅
 * confirmPassword -> matches password field ✅
 */

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    trigger,
    setError,
  } = useForm({ mode: 'onTouched' });
  // mode: "onTouched" - validates initially onBlur, subsequently onChanged
  // Same behaviour as default "onSubmit" but validates without having to submit

  //! TESTING ONLY
  if (Object.keys(errors).length) console.log('errors:', errors);

  const onSubmit = async (data, e) => {
    console.log('input values:', data);
    const form = e.target;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: new FormData(form),
      });

      // HTTP Status not in 200-299 range
      if (!res.ok) {
        // throw error returned by server
        if (res.status >= 400) throw await res.json();
      }

      // User registered successfully
      const user = await res.json();
      console.log({ user });

      // Automatically sign-in after successful registration
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/', // redirect user to home
      });
    } catch (err) {
      // Handle server-side errors
      if (process.env.NODE_ENV === 'development') {
        console.log(`${err.name ?? 'RegistrationError'}:`, err);
      }

      if (err.name === 'PasswordConfirmationFailed') {
        setError(`confirmPassword`, {
          message: err.errors['confirmPassword'],
        });
      }

      if (err.name === 'DuplicateKeyError') {
        setError(`email`, { message: err.errors['email'] });
      }

      if (err.name === 'ValidationError') {
        for (let inputName in err.errors) {
          setError(inputName, { message: err.errors[inputName] });
        }
      }

      // TODO 500: Internal Server Error - display with React Toast or similar
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 border border-slate-950 px-8 py-10 rounded-md">
      <h1 className="text-center text-4xl">Sign up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 justify-center items-center w-96"
        noValidate
        method="POST"
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
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            id="password"
            className="form-input"
            type="password"
            placeholder="Enter your password..."
            {...register('password', {
              required: validateForm.required('password'),
              validate: (value) => validateForm.registerPassword(value),
              onBlur: () => {
                // Manually revalidate confirmPassword when the field has been touched & its error type is not 'required'
                if (
                  touchedFields.confirmPassword &&
                  errors.confirmPassword?.type !== 'required'
                ) {
                  trigger('confirmPassword');
                }
              },
            })}
          />

          {errors.password?.message && (
            <p className="text-red-600 font-semibold">
              * {errors.password.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>

          <input
            id="confirm-password"
            className="form-input"
            type="password"
            placeholder="Confirm your password..."
            {...register('confirmPassword', {
              required: validateForm.required(),
              validate: (_, values) => {
                return validateForm.confirmPasswordsMatch(
                  values.password,
                  values.confirmPassword
                );
              },
            })}
          />

          {errors.confirmPassword?.message && (
            <p className="text-red-600 font-semibold">
              * {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="font-bold uppercase bg-red-600 text-white px-8 py-4 rounded-md disabled:bg-slate-700"
          disabled={isSubmitting}
        >
          Register
        </Button>
      </form>
    </div>
  );
}

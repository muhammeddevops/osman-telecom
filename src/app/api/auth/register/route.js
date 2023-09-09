import User from '@/db/models/User.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('Endpoint: /api/auth/register');
  const formData = await req.formData();
  const { email, password, confirmPassword } = Object.fromEntries(formData);

  console.log('FormData:', { email, password, confirmPassword });

  try {
    // passwords match
    if (password !== confirmPassword) {
      const error = new Error("Passwords don't match");
      throw error;
    }

    // Register new user
    const newUser = await User.create({ email, password, role: 'basic' });
    console.log('User created succesfully');

    // TODO NextAuth - handle login & sessions

    return NextResponse.json({ newUser });
  } catch (err) {
    // TODO 400 - NextAuth - handle in Credential Provider?

    // ✅ TODO 400 - Mongoose
    //  Handle E11000 duplicate key error - email already in use
    //  Handle ValidationError

    // ✅ TODO 500

    console.log('Error on Registration:', err);
    const errors = {};

    // Passwords don't match
    if (err.message === "Passwords don't match") {
      errors.confirmPassword = err.message;
      return NextResponse.json(
        { name: 'PasswordConfirmationFailed', errors },
        { status: 400 }
      );
    }

    // Duplicate email error (email already in use)
    if (err.name === 'MongoServerError' && err.code === 11000) {
      errors.email = 'Email already in use';
      return NextResponse.json(
        { name: 'DuplicateKeyError', errors },
        { status: 400 }
      );
    }

    // ValidationError (user input failed mongoose schema validation)
    if (err.name === 'ValidationError') {
      for (let inputName in err.errors) {
        errors[inputName] = err.errors[inputName].message;
        // errors[inputName] = { message: err.errors[inputName].message };
      }

      return NextResponse.json(
        { name: 'ValidationError', errors },
        { status: 400 }
      );
    }

    // Internal Server Error
    return NextResponse.json(
      { message: 'Something went wrong, please try again later' },
      { status: 500 }
    );
  }
}

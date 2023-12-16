import User from '@/db/models/User.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('Endpoint: /api/auth/register');
  const formData = await req.formData();
  const { email, password, confirmPassword } = Object.fromEntries(formData);

  console.log('FormData:', { email, password, confirmPassword });

  try {
    // Check if user with given email already exists
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error('Email already in use');
      throw error;
    }

    // Confirm passwords match
    if (password.length && password !== confirmPassword) {
      const error = new Error("Passwords don't match");
      throw error;
    }

    // Register new user
    const newUser = await User.create({
      email,
      password,
      provider: 'credentials',
    });
    console.log('User created successfully');

    return NextResponse.json({ newUser });
  } catch (err) {
    console.log('Error on Registration:', err);

    const errors = {};

    // Email already in use - manual check for existing email
    if (err.message === 'Email already in use') {
      console.log('err.message:', err.message);
      errors.email = err.message;
      return NextResponse.json(
        { name: 'DuplicateKeyError', errors },
        { status: 400 }
      );
    }

    // MongoServerError - Duplicate email error (email already in use)
    // NOTE: checking/throwing error manually (as done above) validates fields in order
    /*  if (err.name === 'MongoServerError' && err.code === 11000) {
      errors.email = 'Email already in use';
      return NextResponse.json(
        { name: 'DuplicateKeyError', errors },
        { status: 400 }
      );
    } */

    // Passwords don't match
    if (err.message === "Passwords don't match") {
      errors.confirmPassword = err.message;
      return NextResponse.json(
        { name: 'PasswordConfirmationFailed', errors },
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
      { name: 'InternalServerError', message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

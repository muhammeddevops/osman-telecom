import User from '@/db/models/User.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('/api/auth/register');
  const formData = await req.formData();
  const { email, password, confirmPassword } = Object.fromEntries(formData);

  // ! WHICH FIELDS DO I WANT TO TRIM?
  console.log({ email, password, confirmPassword });

  try {
    // TODO Validate
    //? passwords match
    if (password !== confirmPassword) {
      const error = new Error();
      error.message = "Passwords don't match";
      throw error;
    }

    // TODO Sanitize

    // TODO Check if user with email already exists
    // TODO Mongoose - create/register user
    const newUser = await User.create({ email, password, role: 'basic' });
    // const newUser = new User({ email, password, role: 'basic' });
    // await newUser.save();
    console.log('USER CREATED');

    // TODO NextAuth - handle login & sessions

    return NextResponse.json({ newUser });
  } catch (err) {
    // Error Handling
    // TODO 400 - Mongoose & NextAuth
    // Mongoose Validation Error
    // Duplicate Error

    // TODO 500

    console.log(err);
    return NextResponse.json({ err }, { status: 400 });
  }
}

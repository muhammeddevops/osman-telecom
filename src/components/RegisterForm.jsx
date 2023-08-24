"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(form);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      console.log("passwords dont match!");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      res.status === 201 &&
        router.push("/dashboard/login?success=Account has been created");
    } catch (err) {
      //   setError(err);
      //   console.log(err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10 border border-slate-950 p-8 rounded-md">
      <h1 className="text-center text-4xl">Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 justify-center items-center w-96"
      >
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>

          <input
            id="email"
            type="text"
            name="email"
            placeholder="Enter your email..."
            required
            className="form-input"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="password"
            className="form-label"
            onChange={handleChange}
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password..."
            required
            className="form-input"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
          </label>

          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password..."
            required
            className="form-input"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="font-bold uppercase bg-red-600 text-white px-8 py-4 rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}

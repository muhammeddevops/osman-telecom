'use client';

export default function LoginForm() {
  const handleSubmit = () => {
    console.log('logged in');
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10 border border-slate-950 h-[50vh] p-8 rounded-md">
      <h1 className="text-center text-4xl">Login As Admin</h1>
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password..."
            required
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className="font-bold uppercase bg-red-600 text-white px-8 py-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}

'use client';

// Import & use all global providers here
// i.e. those that will wrap the entire application in the root layout
import AuthProvider from './AuthProvider';

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

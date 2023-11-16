'use client';

// Import & use all global providers here
// i.e. those that will wrap the entire application in the root layout

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <SessionProvider>{children}</SessionProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

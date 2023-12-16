import { signIn } from 'next-auth/react';

import { Button } from '@mantine/core';
import Image from 'next/image';

export default function GoogleAuthButton({ iconSize = 18 }) {
  return (
    <Button
      leftSection={
        <Image
          src="google-logo.svg"
          width={iconSize}
          height={iconSize}
          alt="Google logo"
        />
      }
      variant="outline"
      fullWidth
      onClick={() => signIn('google')}
    >
      Sign in with Google
    </Button>
  );
}

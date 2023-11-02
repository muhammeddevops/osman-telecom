import Link from "next/link";
import { Button } from "@mantine/core";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <p className="text-xl font-extrabold text-red-600 ml-11">
        on page.js 123
      </p>
      <Button component={Link} href="/admin/dashboard/products">
        Dashboard
      </Button>
    </main>
  );
}

import dbConnect from "@/db/config";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
// core styles are required for all packages
import "@mantine/core/styles.css";

import { ColorSchemeScript } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  await dbConnect();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

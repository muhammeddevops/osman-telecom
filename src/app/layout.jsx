import dbConnect from "@/db/config";
import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  await dbConnect();

  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}

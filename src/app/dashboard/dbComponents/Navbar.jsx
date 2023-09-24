"use client";

import { Navbar } from "flowbite-react";

export default function NavBar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="/favicon.svg"
        />
        <span className="self-center whitespace-nowrap text-xl font-extrabold dark:text-white">
          Osman Telecom | Dashboard
        </span>
      </Navbar.Brand>
    </Navbar>
  );
}

'use client';

// import { Navbar } from "flowbite-react";
import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';

const links = [{ link: '/about', label: 'Log out' }];

export default function NavBar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={`block leading-none py-2 px-3 rounded-md no-underline  text-sm font-medium ${
        active === link.link ? 'bg-red-600 text-white' : 'text-gray-700'
      }`}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));
  return (
    <header className=" w-full bg-white border-b border-gray-300 border-solid">
      <Container
        size="md"
        className="h-[59px] flex justify-between items-center"
      >
        <Link href="/">
          <h1 className="text-xl font-extrabold text-red-600 border-solid border-2 border-red-600 py-1 px-2 rounded-md">
            Osman Telecom
          </h1>
        </Link>
        <Group gap={5} visibleFrom="xs">
          {/* {items} */}
          <SignOutButton />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}

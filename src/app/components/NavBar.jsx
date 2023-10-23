"use client";

import { useState } from "react";
import { Container, Group, Burger, Box, Autocomplete } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";
import classes from "./DoubleHeader.module.css";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";

const userLinks = [
  // { link: "#", label: "Privacy & Security" },
  { link: "#", label: "Account settings" },
  // { link: "#", label: "Support options" },
];

const mainLinks = [
  { link: "#", label: "Browse" },
  { link: "#", label: "Postage" },
  { link: "#", label: "News" },
  { link: "#", label: "About" },
  { link: "#", label: "Contact" },
];

const searchItems = ["Dates", "Coffee"];
export function NavBar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const mainItems = mainLinks.map((item, index) => (
    <Link
      href={item.link}
      key={item.label}
      className={`${
        active === index
          ? "text-black border-b-red-600"
          : "text-gray-600 border-b-transparent"
      } uppercase font-2xs p-[2px] font-bold border-b-solid border-b-2 mr-4 mb-2 mt-1`}
      // className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
    >
      {item.label}
    </Link>
  ));

  const secondaryItems = userLinks.map((item) => (
    <Link
      href={item.link}
      key={item.label}
      onClick={(event) => event.preventDefault()}
      className="text-gray-600 text-xs font-bold uppercase transition-color duration-100 ease-in"
      // className={classes.secondaryLink}
    >
      {item.label}
    </Link>
  ));

  return (
    <header
      className="h-22 bg-white border-b border-solid border-b-gray-400 pb-3"
      // className={classes.header}
    >
      <Container>
        <Group
          gap={0}
          justify="flex-start"
          className="mr6"
          // className={classes.mainLinks}
        >
          {mainItems}
        </Group>
      </Container>
      <Container className={classes.inner}>
        {/* <Container className="flex"> */}
        <Group justify="flex-start">
          <Image src="/assets/OTFont.png" width={50} height={50} />
          <h2 className="text-red-600 font-black text-lg">Osman Telecom</h2>
          {/* <MantineLogo size={28} /> */}
        </Group>

        {/* <MantineLogo size={34} /> */}
        <Autocomplete
          className={classes.search}
          placeholder="Search"
          leftSection={<IconSearch className="w-4 h-4" stroke={1.5} />}
          data={searchItems}
          visibleFrom="xs"
        />
        {/* </Container> */}
        <Box className={classes.links} visibleFrom="sm">
          <Group justify="flex-end">{secondaryItems}</Group>
        </Box>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          hiddenFrom="sm"
        />
      </Container>
    </header>
  );
}

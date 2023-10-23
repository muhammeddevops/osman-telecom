"use client";

import { useState } from "react";
import {
  Group,
  Code,
  Box,
  Text,
  Collapse,
  ScrollArea,
  Checkbox,
} from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";

import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";

const data = [
  { link: "", label: "Notifications", icon: IconBellRinging },
  { link: "", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];

const options = [
  { link: "", label: "Food" },
  { link: "", label: "Electronics" },
  { link: "", label: "Miscellanous" },
];

export function CollapsibleSideBar() {
  const [active, setActive] = useState("Billing");
  const [opened, { toggle }] = useDisclosure(false);

  const links2 = options.map((item) => (
    <a className="text-black font-normal flex items-center">
      <Checkbox
        defaultChecked
        // label={item.label}
        className="mr-2"
        radius="xs"
        size="xs"
        color="red"
      />
      <span>{item.label}</span>
    </a>
  ));

  const links = data.map((item) => (
    <a
      className={`${
        active === item.label
          ? "hover:bg-blue-50 hover:text-blue-500 bg-blue-50 text-blue-500"
          : "text-gray-700 hover:bg-gray-100 hover:text-black"
      } flex m-1 items-center no-underline text-sm  p-3 rounded-md font-medium  `}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className="text-gray-700 mr-4 w-6 h-6" stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className="h-[700px] w-[300px] p-6 flex flex-col border-r border-solid border-r-gray-400">
      <Group
        className="pb-4 mb-4 border-b border-solid border-gray-400"
        justify="flex-start"
      >
        <Image src="/assets/OTFont.png" width={50} height={50} />
        <h2 className="text-red-600 font-black text-lg">Osman Telecom</h2>
        {/* <MantineLogo size={28} /> */}
      </Group>
      <ScrollArea className="flex-1">
        {/* {links} */}
        <>
          <Box maw={400} mx="auto">
            <Group
              justify="center"
              mb={5}
              className="flex justify-between items-stretch"
            >
              <div
                onClick={toggle}
                className=" flex justify-between cursor-pointer select-none items-stretch text-gray-700 hover:text-black m-1 no-underline text-sm bg-gray-100 w-full text-left px-5 font-medium"
              >
                Filter products by
                {opened ? (
                  <IconChevronDown stroke={1.5} />
                ) : (
                  <IconChevronRight stroke={1.5} />
                )}
              </div>
            </Group>

            <Collapse
              in={opened}
              transitionDuration={100}
              transitionTimingFunction="linear"
            >
              {links2}
            </Collapse>
          </Box>
        </>
      </ScrollArea>

      <div className="pt-4 mt-4 border-t border-solid border-gray-400">
        <a
          href="#"
          className=" hover:bg-gray-100 text-gray-600 hover:text-black flex items-center no-underline text-sm  p-3 rounded-md font-medium"
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal
            className="text-gray-600 mr-3 w-[25] h-[25px]"
            stroke={1.5}
          />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className=" hover:bg-gray-100 text-gray-600 hover:text-black flex items-center no-underline text-base  p-3 rounded-md font-medium"
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout
            className="text-gray-600 mr-3 w-[25] h-[25px]"
            stroke={1.5}
          />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

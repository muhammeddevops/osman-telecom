"use client";

import { useState } from "react";
import {
  Group,
  Code,
  UnstyledButton,
  Box,
  ThemeIcon,
  Text,
  Collapse,
  Button,
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
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
// import classes from "./NavbarSimple.module.css";
import classes from "./NavbarLinksGroup.module.css";
import { useDisclosure } from "@mantine/hooks";

const data = [
  { link: "", label: "Notifications", icon: IconBellRinging },
  { link: "", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];

export function SideBar() {
  const [active, setActive] = useState("Billing");
  const [opened, { toggle }] = useDisclosure(false);

  const links = data.map((item) => (
    <a
      className={`${
        active === item.label
          ? "hover:bg-blue-50 hover:text-blue-500 bg-blue-50 text-blue-500"
          : "text-gray-700 hover:bg-gray-100 hover:text-black"
      } flex m-1 items-center no-underline text-sm  p-3 rounded-md font-medium  `}
      // className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon
        className="text-gray-700 mr-4 w-6 h-6"
        // className={classes.linkIcon}
        stroke={1.5}
      />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav
      className="h-[700px] w-[300px] p-6 flex flex-col border-r border-solid border-r-gray-400"
      // className={classes.navbar}
    >
      <div
        className="flex-1"
        // className={classes.navbarMain}
      >
        <Group
          className="pb-4 mb-4 border-b border-solid border-gray-400"
          // className={classes.header}

          justify="space-between"
        >
          <MantineLogo size={28} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
        <>
          <Box maw={400} mx="auto">
            <Group justify="center" mb={5}>
              <Text
                onClick={toggle}
                className="text-gray-700 hover:bg-gray-100 hover:text-black flex m-1 items-center no-underline text-sm  p-3 rounded-md font-medium"
              >
                Toggle with linear transition
              </Text>
            </Group>

            <Collapse
              in={opened}
              transitionDuration={100}
              transitionTimingFunction="linear"
            >
              {links}
            </Collapse>
          </Box>
        </>
      </div>

      <div
        className="pt-4 mt-4 border-t border-solid border-gray-400"
        // className={classes.footer}
      >
        <a
          href="#"
          className=" hover:bg-gray-100 text-gray-600 hover:text-black flex items-center no-underline text-sm  p-3 rounded-md font-medium"
          // className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal
            className="text-gray-600 mr-3 w-[25] h-[25px]"
            // className={classes.linkIcon}
            stroke={1.5}
          />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className=" hover:bg-gray-100 text-gray-600 hover:text-black flex items-center no-underline text-base  p-3 rounded-md font-medium"
          // className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout
            className="text-gray-600 mr-3 w-[25] h-[25px]"
            // className={classes.linkIcon}
            stroke={1.5}
          />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

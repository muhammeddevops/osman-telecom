'use client';

import Link from 'next/link';
import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import classes from './DoubleNavbar.module.css';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const linksMockdata = [
  { label: 'Sales and Revenue', link: 'admin/dashboard/performance' },
  { label: 'Inventory', link: 'admin/dashboard/products' },
  { label: 'Orders', link: 'admin/dashboard/orders' },
  { label: 'Employees', link: 'admin/dashboard/employees' },
  { label: 'Customers', link: 'admin/dashboard/customers' },
  { label: 'Users', link: 'admin/dashboard/users' },
];

export default function SideBar() {
  const [active, setActive] = useState('Home');
  const [activeLink, setActiveLink] = useState('/admin/dashboard/products');

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setActiveLink(pathname.slice(1));
  }, [pathname]);

  const links = linksMockdata.map((link) => (
    <a
      // className={`${
      //   activeLink === link
      //     ? " border-l-red-600 bg-red-600 text-white"
      //     : "border-0"
      // } block no-underline border-t border-r rounded-r-lg text-center text-gray-700 py-0 px-3 text-sm font-semibold mr-3 h-11 leading-10 hover:bg-gray-100 hover:text-gray-900 `}
      className={`
 
      ${classes.link}`}
      data-active={activeLink === link.link || undefined}
      href={`/admin/dashboard/${link.link}`}
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link.label);
        router.push(`/${link.link}`);
      }}
      key={link.label}
    >
      {link.label}
    </a>
  ));
  return (
    <nav
      className="bg-white w-[300px] h-full flex flex-col border-r border-solid border-gray-300"
      // className={classes.navbar}
    >
      <div
        className="flex flex-1"
        // className={classes.wrapper}
      >
        <div
          className="flex-shrink-0 w-[60px] bg-body flex flex-col items-center border-r border-gray-300"
          // className={classes.aside}
        >
          <div
            className="w-full flex justify-center h-[60px] p-2 border-b border-solid border-gray-300 mb-2"
            // className={classes.logo}
          >
            <h1 className="font-black text-2xl text-red-600">OT</h1>
            {/* <MantineLogo type="mark" size={30} /> */}
          </div>
          {/* {mainLinks} */}
        </div>
        <div
          className="flex flex-col flex-1 bg-gray-100"
          // className={classes.main}
        >
          <Title
            order={2}
            className="text-l text-gray-500 font-custom mb- h-[60px] bg-white pt-2 px-4 pb-6 border-b border-solid border-gray-300"
            // className={classes.title}
          >
            Dashboard
          </Title>

          {links}
        </div>
      </div>
    </nav>
  );
}

// import {
//   IconHome2,
//   IconGauge,
//   IconDeviceDesktopAnalytics,
//   IconFingerprint,
//   IconCalendarStats,
//   IconUser,
//   IconSettings,
// } from "@tabler/icons-react";
// import { MantineLogo } from "@mantine/ds";
// const mainLinksMockdata = [
//   { label: "Home" },
//   { label: "Dashboard" },
//   { label: "Analytics" },
//   { label: "Releases" },
//   { label: "Account" },
//   { label: "Security" },
//   { label: "Settings" },
// ];
// const mainLinks = mainLinksMockdata.map((link) => (
//   <Tooltip
//     label={link.label}
//     position="right"
//     withArrow
//     transitionProps={{ duration: 0 }}
//     key={link.label}
//   >
//     <UnstyledButton
//       onClick={() => setActive(link.label)}
//       // className={`w-11 h-11 rounded-sm flex items-center justify-center text-gray-700 hover:bg-gray-100 p-4 text-xs mr-6 font-medium active:bg-blue-light active:text-blue-light-color ${
//       //   active === link.label ? "bg-green-500 text-red-600" : ""
//       // } `}
//       className={classes.mainLink}
//       data-active={link.label === active || undefined}
//     >
//       {/* <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} /> */}
//     </UnstyledButton>
//   </Tooltip>
// ));

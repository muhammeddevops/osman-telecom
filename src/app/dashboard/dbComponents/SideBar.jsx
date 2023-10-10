"use client";

import { Sidebar } from "flowbite-react";
import Link from "next/link";

export default function SideBar() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Logo href="#" img="/logo-no-background.svg" imgAlt="OT logo">
        <p>Dashboard</p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/dashboard/products"
            //icon={HiChartPie}
          >
            <p>Products</p>
          </Sidebar.Item>

          <Sidebar.Item
            // icon={HiViewBoards}
            // label="Pro"
            labelColor="dark"
          >
            <Link href="/dashboard/products?open=true">
              <p>Add a product</p>
            </Link>
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/customers"
            //icon={HiInbox}
            // label="3"
          >
            <p>Customers</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/users"
            //icon={HiUser}
          >
            <p>Users</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            //icon={HiArrowSmRight}
          >
            <p>Sign In</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            //icon={HiTable}
          >
            <p>Sign Up</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

"use client";

import { Sidebar } from "flowbite-react";

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
            href="#"
            // icon={HiViewBoards}
            // label="Pro"
            labelColor="dark"
          >
            <p>Kanban</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            //icon={HiInbox}
            // label="3"
          >
            <p>Inbox</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            //icon={HiUser}
          >
            <p>Users</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            //icon={HiShoppingBag}
          >
            <p>Products</p>
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

"use client";

import { getAllOrders } from "@/utils/query-fake-db";
import { Table } from "@mantine/core";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getAllOrders());
  }, [orders]);
  return (
    <Table
      variant="simple"
      colorScheme="blackAlpha"
      size={"lg"}
      highlightOnHover
    >
      {/* <TableCaption>Osman Telecom Orders</TableCaption> */}
      <Table.Thead>
        <Table.Tr className="text-xs text-center">
          <Table.Th className="text-center">NAME</Table.Th>
          <Table.Th className="text-center">CONTACT</Table.Th>
          <Table.Th className="text-center">ITEMS</Table.Th>
          <Table.Th className="text-center">TOTAL AMOUNT</Table.Th>
          <Table.Th className="text-center">DELIVERY</Table.Th>
          <Table.Th className="text-center">STATUS</Table.Th>
          <Table.Th className="text-center">ORDER ID</Table.Th>
          <Table.Th className="text-center">LOCATION</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {orders.map((order) => {
          return (
            <Table.Tr className="text-center">
              {" "}
              <Table.Td className="text-center">
                {" "}
                <Link
                  href={`/admin/dashboard/orders/${order.orderId}?order=${order.orderId}`}
                >
                  {order.customerName}
                </Link>
              </Table.Td>
              <Table.Td className="text-center">
                {order.contactDetails.phone}
                <br />
                {order.contactDetails.email}
              </Table.Td>
              <Table.Td className="text-center">{order.noOfItems}</Table.Td>
              <Table.Td className="text-center">£{order.totalAmount}</Table.Td>
              <Table.Td className="text-center">
                £{order.deliveryAmount}
              </Table.Td>
              <Table.Td className="text-center">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Table.Td>
              <Table.Td className="text-center">{order.orderId}</Table.Td>
              <Table.Td className="text-center">
                {order.deliveryAddress.city}
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
      <Table.Tfoot>
        <Table.Tr className="text-xs text-center">
          <Table.Th className="text-center">NAME</Table.Th>
          <Table.Th className="text-center">CONTACT</Table.Th>
          <Table.Th className="text-center">ITEMS</Table.Th>
          <Table.Th className="text-center">TOTAL AMOUNT</Table.Th>
          <Table.Th className="text-center">DELIVERY</Table.Th>
          <Table.Th className="text-center">STATUS</Table.Th>
          <Table.Th className="text-center">ORDER ID</Table.Th>
          <Table.Th className="text-center">LOCATION</Table.Th>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  );
}

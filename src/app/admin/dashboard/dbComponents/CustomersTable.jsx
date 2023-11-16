'use client';

import { getAllCustomers } from '@/utils/query-fake-db';
import { Table } from '@mantine/core';
import Link from 'next/link';

import { useEffect, useState } from 'react';

export default function CustomersTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(getAllCustomers());
  }, [customers]);
  return (
    <Table
      variant="simple"
      colorScheme="blackAlpha"
      size={'lg'}
      highlightOnHover
    >
      {/* <TableCaption>Osman Telecom Customers</TableCaption> */}
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="text-center">NAME</Table.Th>
          <Table.Th className="text-center">TYPE</Table.Th>
          <Table.Th className="text-center">STATUS</Table.Th>
          <Table.Th className="text-center">
            WHOLESALE <br />
            ORDERS
          </Table.Th>
          <Table.Th className="text-center">
            REG <br />
            ORDERS
          </Table.Th>
          <Table.Th className="text-center">
            AMOUNT <br />
            SPENT
          </Table.Th>
          <Table.Th className="text-center">
            DISCOUNT
            <br />
            AVAILABLE
          </Table.Th>
          <Table.Th className="text-center">LOCATION</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {customers.map((customer, index) => {
          return (
            <Table.Tr key={index}>
              {' '}
              <Table.Td className="text-center">
                {' '}
                <Link
                  href={`/admin/dashboard/customers/${customer.id}?customer=${customer.id}`}
                >
                  {customer.name}
                </Link>
                <br />
                {customer.contactDetails.email}
              </Table.Td>
              <Table.Td className="text-center">
                {customer.role.charAt(0).toUpperCase() + customer.role.slice(1)}
              </Table.Td>
              <Table.Td className="text-center">
                {customer.status.charAt(0).toUpperCase() +
                  customer.status.slice(1)}
              </Table.Td>
              <Table.Td className="text-center">
                {customer.orderHistory.wholesaleOrders}
              </Table.Td>
              <Table.Td className="text-center">
                {customer.orderHistory.regularOrders}
              </Table.Td>
              <Table.Td className="text-center">
                £{customer.amountSpent}
              </Table.Td>
              <Table.Td className="text-center">
                £{customer.discountAvailable}
              </Table.Td>
              <Table.Td className="text-center">
                {customer.address.city}
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
      <Table.Tfoot>
        <Table.Tr>
          <Table.Th className="text-center">NAME</Table.Th>
          <Table.Th className="text-center">TYPE</Table.Th>
          <Table.Th className="text-center">STATUS</Table.Th>
          <Table.Th className="text-center">
            WHOLESALE <br />
            ORDERS
          </Table.Th>
          <Table.Th className="text-center">
            REG <br />
            ORDERS
          </Table.Th>
          <Table.Th className="text-center">
            AMOUNT <br />
            SPENT
          </Table.Th>
          <Table.Th className="text-center">
            DISCOUNT
            <br />
            AVAILABLE
          </Table.Th>
          <Table.Th className="text-center">LOCATION</Table.Th>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  );
}

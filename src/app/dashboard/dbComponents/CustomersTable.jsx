"use client";

import { getAllCustomers } from "@/utils/query-fake-db";
import { Link } from "@chakra-ui/react";
import {
  TableCaption,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { Table } from "flowbite-react";

export default function CustomersTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(getAllCustomers());
  }, [customers]);
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="blackAlpha" size={"lg"}>
        <TableCaption>Osman Telecom Customers</TableCaption>
        <Thead>
          <Tr>
            <Th className="text-center">NAME</Th>
            <Th className="text-center">TYPE</Th>
            <Th className="text-center">STATUS</Th>
            <Th className="text-center">
              WHOLESALE <br />
              ORDERS
            </Th>
            <Th className="text-center">
              REG <br />
              ORDERS
            </Th>
            <Th className="text-center">
              AMOUNT <br />
              SPENT
            </Th>
            <Th className="text-center">
              DISCOUNT
              <br />
              AVAILABLE
            </Th>
            <Th className="text-center">LOCATION</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => {
            return (
              <Tr>
                {" "}
                <Td className="text-center">
                  {" "}
                  <Link
                    href={`/dashboard/customers/${customer.id}?customer=${customer.id}`}
                  >
                    {customer.name}
                  </Link>
                  <br />
                  {customer.contactDetails.email}
                </Td>
                <Td className="text-center">
                  {customer.role.charAt(0).toUpperCase() +
                    customer.role.slice(1)}
                </Td>
                <Td className="text-center">
                  {customer.status.charAt(0).toUpperCase() +
                    customer.status.slice(1)}
                </Td>
                <Td className="text-center">
                  {customer.orderHistory.wholesaleOrders}
                </Td>
                <Td className="text-center">
                  {customer.orderHistory.regularOrders}
                </Td>
                <Td className="text-center">£{customer.amountSpent}</Td>
                <Td className="text-center">£{customer.discountAvailable}</Td>
                <Td className="text-center">{customer.address.city}</Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th className="text-center">NAME</Th>
            <Th className="text-center">TYPE</Th>
            <Th className="text-center">STATUS</Th>
            <Th className="text-center">
              WHOLESALE <br />
              ORDERS
            </Th>
            <Th className="text-center">
              REG <br />
              ORDERS
            </Th>
            <Th className="text-center">
              AMOUNT <br />
              SPENT
            </Th>
            <Th className="text-center">
              DISCOUNT
              <br />
              AVAILABLE
            </Th>
            <Th className="text-center">LOCATION</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

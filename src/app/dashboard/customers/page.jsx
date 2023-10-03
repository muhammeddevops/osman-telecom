"use client";

import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { getAllCustomers } from "@/utils/query-fake-db";

const Customers = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(getAllCustomers());
  });

  console.log(customers, "customers");

  return (
    <div>
      <h1>CUstomers PAGE</h1>
      <div className="grid grid-cols-3">
        {customers.map((customer) => {
          return (
            <Card
              key={customer.id}
              className="w-[100px]"
              imgAlt="customer image"
              imgSrc={customer.image}
            >
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {customer.name}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Customers;

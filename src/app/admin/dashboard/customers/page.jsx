"use client";

import { useEffect, useState } from "react";
import { getAllCustomers } from "@/utils/query-fake-db";
import CustomersTable from "../dbComponents/CustomersTable";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(getAllCustomers());
  });

  console.log(customers, "customers");

  return (
    <div className="px-9 py-12 bg-gray-100">
      <div className="bg-white p-2 rounded-lg">
        <h1 className="ml-10 my-6 font-extrabold font-sans text-2xl">
          CUSTOMERS
        </h1>
        <CustomersTable />
      </div>
    </div>
  );
};

export default Customers;

"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "@/utils/query-fake-db";
import OrdersTable from "../dbComponents/OrdersTable";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getAllOrders());
  });

  console.log(orders, "orders");

  return (
    <div className="px-9 py-12 bg-gray-100">
      <div className="bg-white p-2 rounded-lg">
        <h1 className="ml-10 my-6 font-extrabold font-sans text-2xl">ORDERS</h1>
        <OrdersTable />
      </div>
    </div>
  );
};

export default Orders;

// export default function Orders() {
//   return <div>Orders</div>;
// }

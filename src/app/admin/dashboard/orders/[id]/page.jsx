"use client";

import { getOrderById } from "@/utils/query-fake-db";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TruckIcon from "../../dbComponents/TruckIcon";
import Link from "next/link";
import { Card, Table, Text } from "@mantine/core";
// import { Link } from "@chakra-ui/react";

export default function IndvidualOrder() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState({
    orderId: 1,
    status: "pending",
    noOfItems: null,
    customerName: "",
    registeredAcc: false,
    goodsAmount: null,
    deliveryAmount: null,
    totalAmount: null,
    items: [],
    deliveryAddress: {
      firstLine: " ",
      secondLine: "",
      city: "",
      postCode: "",
    },
    contactDetails: {
      email: "",
      phone: "",
    },
  });

  const orderId = searchParams.get("order");

  console.log(orderId, "orderId<<<<");
  console.log(getOrderById(Number(orderId)), "getOrderById(Number(orderId))");
  useEffect(() => {
    setOrder(getOrderById(Number(orderId)));
  }, [orderId]);

  console.log(order, "order<<<<<");

  return (
    <div className="p-4">
      <Link href="/admin/dashboard/orders">Back to Orders</Link>
      <h1 className="text-2xl font-semibold mb-4">
        Order Details - Order #{orderId}
      </h1>

      <Card>
        <div className="mb-4">
          <Text fw={700}>
            Order Status:{" "}
            {/* {order.status.charAt(0).toUpperCase() + order.status.slice(1)} */}
          </Text>
        </div>

        <div className="mb-4">
          <Text fw={700}>Customer Information:</Text>
          <Text>{order.customerName}</Text>
          <Text>Registered Account: {order.registeredAcc ? "Yes" : "No"}</Text>
        </div>

        <div className="mb-4">
          <Text fw={700}>Items:</Text>
          <Table data={order.items} columns={["name", "quantity"]} />
        </div>

        <div className="mb-4">
          <Text fw={700}>Delivery Address:</Text>
          <Text>{order.deliveryAddress.firstLine}</Text>
          <Text>{order.deliveryAddress.secondLine}</Text>
          <Text>
            {order.deliveryAddress.city}, {order.deliveryAddress.postCode}
          </Text>
        </div>

        <div className="mb-4">
          <Text fw={700}>Contact Details:</Text>
          <Text>Email: {order.contactDetails.email}</Text>
          <Text>Phone: {order.contactDetails.phone}</Text>
        </div>

        <div className="mt-4">
          <Text fw={700}>Order Summary:</Text>
          {/* <Row>
            <Col span="auto">
              <Text>Goods Amount: ${order.goodsAmount}</Text>
              <Text>Delivery Amount: ${order.deliveryAmount}</Text>
              <Text>Total Amount: ${order.totalAmount}</Text>
            </Col>
          </Row> */}
        </div>
      </Card>
    </div>
  );
}

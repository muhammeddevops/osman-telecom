"use client";

import { getCustomerById } from "@/utils/query-fake-db";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TruckIcon from "../../dbComponents/TruckIcon";
import Link from "next/link";
// import { Link } from "@chakra-ui/react";

export default function IndvidualCustomer() {
  const searchParams = useSearchParams();
  const [customer, setCustomer] = useState({
    id: 1,
    role: "",
    name: "",
    contactDetails: {
      email: "",
      phone: "",
    },
    orderHistory: {
      wholesaleOrders: 0,
      regularOrders: 0,
    },
    amountSpent: 0,
    pointsEarned: 0,
    discountAvailable: 0,
    credit: 0,
    creditLimit: 0,
    debit: 0,
    address: {
      firstLine: "",
      secondLine: "",
      city: "",
      postCode: "",
    },
    status: "",
  });

  const customerId = searchParams.get("customer");

  useEffect(() => {
    setCustomer(getCustomerById(Number(customerId)));
  }, [customerId]);

  console.log(customer);

  return (
    <div className="px-9 py-12 bg-gray-100">
      <div className="bg-white p-2 pt-6 rounded-xl flex flex-col justify-center items-center">
        <Image
          src="/assets/userIcon.jpg"
          width={100}
          height={100}
          className="rounded-full mb-5"
        />
        <h1 className="text-center text-2xl font-semibold">{customer.name}</h1>
        <div
          className={`${
            customer.status === "active" ? "text-green-500" : "text-red-600"
          } font-semibold mr-1 flex`}
        >
          <h3 className="font-semibo mr-1">
            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}{" "}
          </h3>
          <p className="font-semibo">&bull;</p>
        </div>

        <span className="flex justify-center w-1/2">
          <Link href={`mailto:${customer.contactDetails.email}`}>
            <h3 className="text-lg">{customer.contactDetails.email}</h3>
          </Link>
          <h3 className="ml-8 text-lg">{customer.contactDetails.phone}</h3>
        </span>
        <div className="px-9 pt-12 bg-gray-100 mt-6 rounded-t-xl grid grid-cols-4 gap-20 w-1/2">
          <p className="text-center text-lg font-medium text-gray-500">
            <strong className="text-3xl text-black">
              {customer.orderHistory.wholesaleOrders}
            </strong>
            <br />
            Wholesale
            <br />
            Orders
          </p>

          <p className="text-center text-lg font-medium text-gray-500">
            <strong className="text-3xl text-black">
              {customer.orderHistory.regularOrders}
            </strong>
            <br />
            Regular
            <br />
            Orders
          </p>

          <p className="text-center text-lg font-medium text-gray-500">
            <strong className="text-3xl text-black">
              £{customer.amountSpent}
            </strong>
            <br />
            Amount
            <br />
            Spent
          </p>

          <p className="text-center text-lg font-medium text-gray-500">
            <strong className="text-3xl text-black">
              £{customer.discountAvailable}
            </strong>
            <br />
            Discount
            <br />
            Available
          </p>

          <p className="text-center text-lg font-medium text-gray-500">
            <strong className="text-3xl text-black">
              {customer.pointsEarned}
            </strong>
            <br />
            Points
            <br />
            Earned
          </p>

          <p className="text-center text-lg font-medium text-gray-500">
            <strong className="text-3xl text-black">£{customer.credit}</strong>
            <br />
            Amount
            <br />
            Owing
          </p>

          <p className="text-center text-lg font-medium text-gray-500">
            <strong className="text-3xl text-black">£{customer.debit}</strong>
            <br />
            Amount
            <br />
            Owed
          </p>

          <p className="text-center text-lg font-medium text-gray-500">
            <strong className="text-3xl text-black">
              £{customer.creditLimit}
            </strong>
            <br />
            Credit
            <br />
            Limit
          </p>
        </div>

        <div className="px-9 py-12 bg-gray-100 mb-10 rounded-b-xl w-1/2">
          <p className="text-center text-2xl text-black font-semibold">
            Delivery Address:
            <br />
            {customer.address.firstLine} <br />
            {customer.address.secondLine} <br />
            {customer.address.city} <br />
            {customer.address.postCode}
          </p>
        </div>
      </div>
    </div>
  );
}

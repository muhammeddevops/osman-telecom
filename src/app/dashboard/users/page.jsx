"use client";

import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { getAllUsers } from "@/utils/query-fake-db";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getAllUsers());
  });

  console.log(users, "users");

  return (
    <div className="flex flex-col justify-start items-start mr-[400px]">
      <h1 className="mb-8 font-black text-center text-3xl text-red-600">
        USERS
      </h1>
      <div className="flex flex-col">
        {users.map((user) => {
          return (
            <Card
              key={user.id}
              className="w-[100px]"
              imgAlt="user image"
              imgSrc={user.image}
            >
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {user.name}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Users;

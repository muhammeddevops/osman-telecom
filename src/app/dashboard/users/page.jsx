"use client";

import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { getAllUsers } from "@/utils/query-fake-db";

const Users = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getAllUsers());
  });

  console.log(users, "users");

  return (
    <div>
      <h1>users PAGE</h1>
      <div className="grid grid-cols-3">
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

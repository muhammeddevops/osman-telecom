"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/utils/query-fake-db";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getAllUsers());
  });

  console.log(users, "users");

  return (
    <div className="py-20 flex justify-center">
      <Carousel withIndicators height={600} align={"center"} className="w-5/6">
        {users.map((user) => {
          return (
            <Carousel.Slide>
              <div className="flex flex-col h-full w-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                <h2>{user.name}</h2>
                <br />
                <p>{user.role}</p>
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Users;

// <div className="px-9 py-12 bg-gray-100">
//   <div className="bg-white p-2 rounded-lg">
//     <h1 className="ml-10 my-6 font-extrabold font-sans text-2xl">USERS</h1>
//     <div>
//       <h1>HELLO</h1>
//       <div>
//         {" "}
//         <Carousel>
//           <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
//             Slide 1
//           </div>
//           <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
//             Slide 2
//           </div>
//           <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
//             Slide 3
//           </div>
//           <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
//             Slide 4
//           </div>
//         </Carousel>
//       </div>
//     </div>
//     <div className="flex flex-col">
//       <Carousel>
//         {users.map((user) => {
//           return (
//             <div>
//               <h2>{user.name}</h2>
//               <h3>Role: {user.role}</h3>
//             </div>
//           );
//         })}
//       </Carousel>
//     </div>
//   </div>
// </div>

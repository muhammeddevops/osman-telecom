"use client";

import { useEffect, useState } from "react";
import { getAllEmployees } from "@/utils/query-fake-db";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(getAllEmployees());
  });

  console.log(employees, "employees");

  return (
    <div className="py-20 flex justify-center">
      <Carousel withIndicators height={600} align={"center"} className="w-5/6">
        {employees.map((employee) => {
          return (
            <Carousel.Slide>
              <div className="flex flex-col h-full w-full items-center justify-center  bg-gray-400 dark:bg-gray-700 dark:text-white">
                <h2>{employee.name}</h2>
                <br />
                <p>{employee.position}</p>
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
}

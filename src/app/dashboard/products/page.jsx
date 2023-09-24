"use client";

import Link from "next/link";
// import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Card, Sidebar } from "flowbite-react";
import { getAllProducts } from "@/utils/query-fake-db";
import Image from "next/image";

const Products = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getAllProducts());
  });

  console.log(products, "products");

  return (
    <div>
      <h1>PRODUCTS PAGE</h1>
      <div className="grid grid-cols-3">
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              className="w-[100px]"
              imgAlt="product image"
              imgSrc={product.image}
            >
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {product.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Products;

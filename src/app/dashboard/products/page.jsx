"use client";

import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { getAllProducts } from "@/utils/query-fake-db";
import Image from "next/image";
import Link from "next/link";
import Dialog from "../dbComponents/Dialog";

const Products = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);

  async function onClose() {
    console.log("Modal has closed");
  }

  async function onOk() {
    console.log("Ok was clicked");
  }

  useEffect(() => {
    setProducts(getAllProducts());
  });

  console.log(products, "products");

  return (
    <>
      <Dialog title="Example Modal" onClose={onClose} onOk={onOk}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          eligendi odio ipsa nostrum dolores voluptas architecto tempore nulla
          voluptatibus vel, placeat explicabo exercitationem id officia laborum
          doloremque blanditiis earum accusamus.
        </p>
      </Dialog>
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
    </>
  );
};

export default Products;

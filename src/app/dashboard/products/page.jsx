"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/utils/query-fake-db";
import Dialog from "../dbComponents/Dialog";
import AddProdForm from "../dbComponents/AddProdForm";
import Image from "next/image";

const Products = () => {
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
      <Dialog title="Add a product" onClose={onClose} onOk={onOk}>
        <AddProdForm />
      </Dialog>
      <div className="flex flex-col justify-start items-start mr-[400px]">
        <h1 className="mb-8 font-black text-center text-3xl text-red-600">
          CURRENT STOCK
        </h1>
        <div className="flex flex-col">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex  w-[500px] mb-[20px] bg-white rounded-lg"
                // imgAlt="product image"
                // imgSrc={product.image}
              >
                <Image
                  src={product.image}
                  alt="product image"
                  width={200}
                  height={200}
                  className="rounded-lg"
                  // blurDataURL="data:..." automatically provided
                  // placeholder="blur" // Optional blur-up while loading
                />

                <div className="ml-[10px] mr-[10px]">
                  <h2 className=" mt-2 font-medium text-lg">{product.name}</h2>
                  <p className="mb-[30px] font-light ">{product.category}</p>
                  <p className="text-2xl font-extrabold">
                    £{product.price.toFixed(2)}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {product.description}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                    Stock levels: {product.quantity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;

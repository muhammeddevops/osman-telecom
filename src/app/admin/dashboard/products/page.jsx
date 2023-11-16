'use client';

import Dialog from '../dbComponents/Dialog';
import { useDisclosure } from '@mantine/hooks';
import AddProductForm from '../dbComponents/AddProductForm';
import Image from 'next/image';
import { Button } from '@mantine/core';
import otApi from '@/api-requests';
import { useQuery } from '@tanstack/react-query';

import productPlaceholder from '/public/assets/product-placeholder.jpg';

const Products = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: otApi.fetchAllProducts,
  });

  console.log('products:', { isLoading, error, products });

  async function onClose() {
    console.log('Modal has closed');
  }

  async function onOk() {
    console.log('Ok was clicked');
  }

  if (error)
    return (
      <>
        <h1>No products (products is undefined)</h1>
        <h1>QUERY ERROR: {error.message}</h1>
      </>
    );
  if (!products?.length || isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Dialog title="Add a product" opened={opened} close={close}>
        <AddProductForm closeModal={close} />
      </Dialog>
      <div className="flex flex-col justify-center items-center ">
        <h1 className="mb-8 font-black text-center text-3xl text-red-600">
          CURRENT STOCK
        </h1>
        <div className="flex flex-col justify-end w-full">
          <div className="flex flex-row justify-end items-end">
            <Button onClick={open} color="rgb(220 38 38)" className="mr-10">
              Add product
            </Button>
          </div>
          <div
            className="grid grid-cols-2
          mt-8"
          >
            {products.map((product) => {
              return (
                <div
                  key={product._id}
                  className="flex  w-[500px] mb-[20px] bg-white rounded-lg"
                >
                  <Image
                    className="rounded-lg"
                    // TODO store product images with Firebase and store URL reference in Products collection
                    src={productPlaceholder}
                    alt={product.description}
                    width={200}
                    height={200}
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                  />

                  <div className="ml-[10px] mr-[10px]">
                    <h2 className=" mt-2 font-medium text-lg">
                      {product.name}
                    </h2>
                    <p className="mb-[30px] font-light ">
                      {product.categories}
                    </p>
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
      </div>
    </>
  );
};

export default Products;

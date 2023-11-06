import Product from "@/db/models/Product";
import { NextResponse } from "next/server";

// TODO add product using form ✅
// TODO add product images - unsplash / manually
// TODO validate form fields/error handling - should each product have unique name?
export async function POST(req) {
  console.log("POST /product");
  try {
    const productData = await req.json();

    // const errors = {};

    // for (const key in productData) {
    //   if (productData[key].toString().trim().length === 0) {
    //     errors[key] = `${
    //       key.charAt(0).toUpperCase() + key.slice(1)
    //     } cannot only contain spaces`;
    //   }
    // }

    // if (Object.keys(errors).length) {
    //   throw errors;
    // }

    // Create new product
    const product = await Product.create(productData);

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    // TODO handle errors that may occur when creating a new product
    console.log(err);
  }
}

import Product from '@/models/Product';
import { NextResponse } from 'next/server';

// TODO add product using form ✅
// TODO add product images - unsplash / manually
// TODO validate form fields/error handling - should each product have unique name?
export async function POST(req) {
  console.log('POST /product');
  try {
    const productData = await req.json();

    // Create new product
    const product = await Product.create(productData);

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    // TODO handle errors that may occur when creating a new product
    console.log(err);
  }
}

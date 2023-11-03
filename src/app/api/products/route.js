import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import prods from '@/utils/db-products-list.json';

export async function GET() {
  console.log('PRODUCTS: GET');
  try {
    const products = await Product.find({});
    return NextResponse.json({ products });
  } catch (err) {
    console.log(err);
  }
}

// ! FOR USE IN DEVELOPMENT ONLY
// Repopulate DB with list of products from JSON file
export async function POST() {
  console.log('PRODUCTS: GET');
  try {
    await Product.deleteMany({});
    const products = await Product.insertMany(prods);
    console.log(products);
    return NextResponse.json({ products });
  } catch (err) {
    console.log(err);
  }
}

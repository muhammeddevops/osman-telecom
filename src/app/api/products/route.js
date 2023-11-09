import Product from '@/db/models/Product';
import { NextResponse } from 'next/server';
import prods from '@/utils/db-products-list.json';

export async function GET() {
  console.log('PRODUCTS: GET');
  try {
    const products = await Product.find({});
    return NextResponse.json({ products });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ errors: err }, { status: 400 });
  }
}

// ! FOR USE IN DEVELOPMENT ONLY
// Repopulate DB with list of products from JSON file
export async function POST() {
  if (process.env.NODE_ENV === 'development') {
    console.log('PRODUCTS: DEV_ONLY RESEED DB');
    try {
      await Product.deleteMany({});
      const products = await Product.insertMany(prods);
      console.log(products);
      return NextResponse.json({ products });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ errors: err }, { status: 400 });
    }
  }
}

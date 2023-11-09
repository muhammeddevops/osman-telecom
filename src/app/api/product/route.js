import Product from '@/db/models/Product';
import { capitalise } from '@/utils/string-manipulation';
import { NextResponse } from 'next/server';

// TODO add product using form ✅
// TODO add product images - unsplash / manually
// TODO validate form fields/error handling
// TODO Uniqueness - can 2 products have the same name?
// TODO Add a brand field to Product model
// ? Maybe include a brand field
// ? Then you can validate whether a product within a brand contains the same name
// TODO validate whether the new product is unique
// ? i.e. whether an item of the same brand with the same name exists
export async function POST(req) {
  console.log('POST /product');
  try {
    const productData = await req.json();
    console.log('productData:', productData);

    // Create new product
    const product = await Product.create(productData);

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.log('ERROR - POST /product:', err);

    const errors = {};

    // TODO handle errors that may occur when creating a new product
    if (err.name === 'ValidationError') {
      for (let inputName in err.errors) {
        // Error object for specific input
        const inputError = err.errors[inputName];
        let inputErrorMessage = inputError.message;

        // Generate message for incorrect type for a field, and overwrite the default
        // e.g. string received instead of number
        if (inputError.name === 'CastError') {
          inputErrorMessage = `${inputError.value} is not a valid ${capitalise(
            inputName
          )}`;
        }

        errors[inputName] = inputErrorMessage;
      }

      return NextResponse.json(
        { name: 'ValidationError', errors },
        { status: 400 }
      );
    }
  }
}

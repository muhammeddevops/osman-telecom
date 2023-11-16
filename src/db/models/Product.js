import mongoose from 'mongoose';
import {
  arrayStringsHaveValidLength,
  hasNoneWhitespaceChars,
  isAlphabetical,
  isInteger,
} from '../custom-validators';

const { Schema } = mongoose;

/** Handling Validation
 Options
 * Validate fields individually
  - name - what is valid product name
  - description - what is valid product description
  - price - what is valid product price
  - etc... 

 * Extract common validators into reusable functions, e.g.:
  - hasNoneWhitespace
  - isInteger
  - isFloat
  - etc... 

 OPTION 1
 * For each field in the Model, define a single SCHEMA validator function
 * In that function, create an array of validator functions to apply to the field
 
 * Iterate with array.every(), invoking each validator in the array on the input value
  - array.every() will return true if all validation conditions are met
  - if a single validator fails, array.every() returns false

 * If one of them fails, return an error message specific to the error that failed

 OPTION 2
 ** best option -> Mongoose will handle the above for us
 * ALTERNATIVELY, use array of validator objects in format:
  - validate: [ { validator: ..., message: ... }, { validator: ..., message: ... } ]

 * Replace validators namespace with individual validator objects, e.g.:
  const hasNoneWhitespaceChars = {
    validator(value) {
      return value.trim().length > 0 ? true : false;
    },
    message({ path }) {
      const capitalisedPath = path[0].toUpperCase() + path.slice(1);
      return `${capitalisedPath} cannot only contain spaces`;
    },
  }
 */

/** Validations
 * already handled by mongoose
  - type -> string, number, Array of strings etc.
 * all fields should be required except image
  - where an image is not provided -> display a placeholder

 * name
  - min/max length ✅
  - not only whitespace ✅
 * description
  - min/max length ✅
  - not only whitespace ✅
 * category 
  - min/max length ✅
  - not only whitespace ✅
  - contains letters A-Za-z only ✅
 * price
  - isFloat? -> not really necessary 
    -> if it's an int, MongoDB will store as int
    -> if it's a float, MongoDB will store as decimal
 * quantity
    - isInteger ✅
 */

// TODO add brand to schema & input to frontend
const productSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [2, 'Min length of 2 characters'],
      maxLength: [120, 'Max length of 120 characters'],
      required: true,
      validate: [hasNoneWhitespaceChars],
    },
    description: {
      type: String,
      minLength: [2, 'Min length of 2 characters'],
      maxLength: [1500, 'Max length of 1500 characters'],
      required: true,
      validate: [hasNoneWhitespaceChars],
    },
    categories: {
      type: [String],
      required: true,
      validate: [
        hasNoneWhitespaceChars,
        isAlphabetical,
        arrayStringsHaveValidLength,
      ],
    },
    price: {
      type: Number,
      min: [0.01, 'Min price of £0.01'],
      max: [10000, 'Max price of £10000'],
      required: true,
    },
    quantity: {
      type: Number,
      min: [1, 'Min quantity of 1'],
      default: 1,
      required: true,
      validate: [isInteger],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// If the Product model does not exist, create a new instance
export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);

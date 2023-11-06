import { Int32 } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const validators = {
  // For strings only
  containsNonWhiteSpace(value) {
    console.log("containsNonWhiteSpace in here");
    if (value.trim().length > 0) {
      return true;
    } else {
      throw new Error("WhitespaceOnlyError");
    }
  },
};

const productSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [2, "Min length of 2 characters"],
      maxLength: [120, "Max length of 120 characters"],
      required: true,
      validate: {
        validator: function () {
          console.log("random function");
        },
        // validator: validators.containsNonWhiteSpace,
        // message: (props) => "{PATH} cannot only contain spaces",
        message: function (props) {
          return props.reason.message;
        },
      },
    },
    description: {
      type: String,
      minLength: [2, "Min length of 2 characters"],
      maxLength: [1500, "Max length of 1500 characters"],
      required: true,
    },
    category: {
      type: [String],
      minLength: [2, "Min length of 2 characters"],
      maxLength: [30, "Max length of 30 characters"],
      required: true,
    },
    price: {
      type: Number,
      min: [0.01, "Min price of £0.01"],
      max: [10000, "Max price of £10000"],
      required: true,
    },
    quantity: {
      type: Number,
      validate: {
        validator: Number.isInteger, // Use the Number.isInteger function to validate integers
        message: "Quantity must be an integer.",
      },
      min: [1, "Min quantity of 1"],
      default: 1,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

//If the User collection does not exist create a new one.
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

//If the User collection does not exist create a new one.
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);

import { model, Schema } from "mongoose";
import Product from "../../interfaces/product";

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: [true, "product name must be provided"],
    },
    price: {
      type: Number,
      required: [true, "product price must be provided"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    company: {
      type: String,
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    strictQuery: "throw",
  }
);

export default model<Product>("Product", productSchema);

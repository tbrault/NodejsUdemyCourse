import * as dotenv from "dotenv";
dotenv.config();

import connectDb from "./db/connect.js";
import Products from "./models/product.js";

import jsonProducts from "./products.json" assert { type: "json" };

async function start() {
  try {
    await connectDb(process.env.MONGO_URI!);
    await Products.deleteMany();
    await Products.create(jsonProducts);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();

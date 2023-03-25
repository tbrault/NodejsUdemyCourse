import { Request, Response } from "express";
import ProductQuery from "../interfaces/productQuery.js";
import Product from "../models/product.js";

const getAllStaticProducts = async (req: Request, res: Response) => {
  const productsQueryObj = Product.find({ company: "marcos" });
  console.log(
    "*****************This returns a Query object.*******************"
  );
  console.log(productsQueryObj);
  const productsQueryResults = await Product.find({ company: "marcos" }).exec();
  console.log(
    "*****************This returns the results of the query.*******************"
  );
  console.log(productsQueryResults);

  const sorted1 = productsQueryObj.sort("price");
  console.log(
    "*****************This returns a Query object too.*******************"
  );

  console.log(sorted1);
  const sorted2 = await productsQueryObj.sort("price");
  console.log(
    "*****************This returns the sorted results.*******************"
  );
  console.log(sorted2);
  res.status(200).json({
    msg: "Products testing route.",
    nbHits: productsQueryResults.length,
    productsQueryResults,
  });
};

async function getAllProducts(req: Request, res: Response) {
  const { featured, name, company, sort, fields } = req.query;
  const productQuery: ProductQuery = {};

  if (featured) {
    productQuery.featured = featured === "true";
  }
  if (company && typeof company === "string") {
    productQuery.company = company;
  }
  if (name && typeof name === "string") {
    productQuery.name = {
      $regex: name,
      $options: "i",
    };
  }

  let result = Product.find(productQuery);

  if (sort && typeof sort === "string") {
    const sortList = sort.replaceAll(",", " ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields && typeof fields === "string") {
    const fieldsList = fields.replaceAll(",", " ");
    result = result.select(fieldsList);
  }

  const products = await result.exec();
  res.status(200).json({ products, total: products.length });
}

export { getAllProducts, getAllStaticProducts };

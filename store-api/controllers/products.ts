import { Request, Response } from "express";
import { stringify } from "querystring";
import ProductQuery from "../interfaces/productQuery.js";
import Product from "../models/product.js";

interface OperatorMap {
  [key: string]: string;
}

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
  const { featured, name, company, sort, fields, numericFilters } = req.query;
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

  if (numericFilters && typeof numericFilters === "string") {
    const operatorUsedInNumericFilters: OperatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "lt",
      "<=": "lte",
    };
    const regEx = /\b(>|>=|=|<=|<)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorUsedInNumericFilters[match]}-`
    );
    const options = ["price", "rating"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        productQuery[field] = { [operator]: Number(value) };
      }
    });
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

  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result.exec();
  res.status(200).json({ products, total: products.length });
}

export { getAllProducts, getAllStaticProducts };

import { Request, Response } from "express";
import QueryParams from "../interfaces/QueryParams.js";
import ProductQuery from "../models/ProductQuery.js";
import Product from "../models/schemas/product.js";

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
  const productQuery = buildProductQuery(req.query);
  let result = Product.find(productQuery);
  await filterResultOfQuery(res, result);
}

function buildProductQuery(queryParams: QueryParams) {
  const { featured, name, company, numericFilters } = queryParams;
  const productQuery = new ProductQuery();

  productQuery.addFeaturedFilter(featured);
  productQuery.addCompanyFilter(company);
  productQuery.addNamesFilter(name);
  productQuery.addNumericFilters(numericFilters);

  return productQuery;
}

async function filterResultOfQuery(res: Response, result: any) {
  const { sort, fields } = res.req.query;

  if (sort && typeof sort === "string") {
    const sortList = sort.replaceAll(",", " ");
    result = result.sort(sortList);
  }

  if (fields && typeof fields === "string") {
    const fieldsList = fields.replaceAll(",", " ");
    result = result.select(fieldsList);
  }

  const limit = Number(res.req.query.limit) || 10;
  const page = Number(res.req.query.page) || 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result.exec();
  res.status(200).json({ products, total: products.length });
}

export { getAllProducts, getAllStaticProducts };

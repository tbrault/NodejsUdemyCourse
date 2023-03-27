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

class QueryBuilder {
  private static readonly operatorMap: Record<string, string> = {
    ">": "$gt",
    ">=": "$gte",
    "=": "$eq",
    "<": "$lt",
    "<=": "$lte",
  };

  static build(queryParams: any) {
    const productQuery: ProductQuery = {};
    const { featured, name, company, numericFilters } = queryParams;

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
      const regEx = /\b(>|>=|=|<=|<)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${QueryBuilder.operatorMap[match]}-`
      );
      const options = ["price", "rating"];
      filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");
        if (options.includes(field)) {
          productQuery[field] = { [operator]: Number(value) };
        }
      });
    }

    return productQuery;
  }
}

async function getAllProducts(req: Request, res: Response) {
  const productQuery = QueryBuilder.build(req.query);
  let result = Product.find(productQuery);
  await filterResultOfQuery(res, result);
}

async function filterResultOfQuery(res: Response, result: any) {
  const { fields } = res.req.query;

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

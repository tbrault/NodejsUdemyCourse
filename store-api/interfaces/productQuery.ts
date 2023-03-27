interface ProductQuery {
  [key: string]: string | boolean | Object | undefined;
  featured?: boolean;
  company?: string;
  name?: {
    $regex: string;
    $options: string;
  };
  rating?: string;
}

export default ProductQuery;

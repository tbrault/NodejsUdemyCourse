interface ProductQuery {
  [key: string]: string | boolean | Object | undefined;
  featured?: boolean;
  name?: {
    $regex: string;
    $options: string;
  };
  company?: string;
  price?: number;
  rating?: number;
}

export default ProductQuery;

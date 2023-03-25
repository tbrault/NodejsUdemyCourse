interface ProductQuery {
  featured?: boolean;
  company?: string;
  name?: {
    $regex: string;
    $options: string;
  };
}

export default ProductQuery;

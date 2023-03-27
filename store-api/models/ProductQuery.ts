import OperatorMap from "../interfaces/OperatorMap";

class ProductQuery {
  [key: string]: string | boolean | Object | undefined;

  public addFeaturedFilter(featured: string | undefined) {
    if (featured) {
      this["featured"] = featured === "true";
    }
  }

  public addCompanyFilter(company: string | undefined) {
    if (company) {
      this["company"] = company;
    }
  }

  public addNamesFilter(name: string | undefined) {
    if (name) {
      this["name"] = {
        $regex: name,
        $options: "i",
      };
    }
  }

  public addNumericFilters(numericFilters: string | undefined) {
    if (numericFilters) {
      const filters = this.formatNumericFilters(numericFilters);
      this.addFiltersToProductQuery(filters);
    }
  }

  private formatNumericFilters(numericFilters: string) {
    const operatorMap: OperatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(>|>=|=|<=|<)\b/g;

    return numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
  }

  private addFiltersToProductQuery(filters: string) {
    filters.split(",").forEach((item) => {
      this.addSingleFilterToProductQuery(item);
    });
  }

  private addSingleFilterToProductQuery(item: string) {
    const [field, operator, value] = item.split("-");
    if (this.checkIfOptionsIncludeField(field)) {
      this[field] = { [operator]: Number(value) };
    }
  }

  private checkIfOptionsIncludeField(field: string) {
    const options = ["price", "rating"];
    return options.includes(field);
  }
}

export default ProductQuery;

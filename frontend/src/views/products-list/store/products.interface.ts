export interface IProductsList {
  defaultProductsSortOption?: string;
  productsSortOption?: string[];
  productList: IProduct[];
  filters: IProductsFilters;
}

export interface IProductsFilters {
  category: ICategory[];
  targetGroup: ITargetGroup[];
  tags: string[];
  gender: IGender;
  condition: ICondition;
  price: IPrice;
}

export interface ICategory {
  title: string;
  items: string[];
}

export interface ITargetGroup {
  value: string;
  isSelected: boolean;
}

export interface IProduct {
  price: string;
  title: string;
  image: string;
  id: number | null;
}

export interface IPrice {
  minValue: string;
  maxValue: string;
}

export interface ICondition {
  isNew: boolean;
  used: boolean;
}

export interface IGender {
  male: boolean;
  female: boolean;
  unisex: boolean;
  noMatter: boolean;
}

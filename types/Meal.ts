import type { ProductIndexed } from "./Product";

export interface ProductsListItem extends ProductIndexed {
  weight?: number;
  amount?: number;
}

export interface Meal {
  products: ProductsListItem[];
  name: string;
}

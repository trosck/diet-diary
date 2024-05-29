import type { ProductIndexed } from "./Product";

export interface ProductsListItem extends ProductIndexed {
  weight: number;
}

export interface Meal {
  products: ProductsListItem[];
  date: Date;
}

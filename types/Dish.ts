import type { ProductIndexed } from "./Product";

export interface ProductIndexedNumerable extends ProductIndexed {
  weight?: number;
  amount?: number;
}

export interface Dish {
  products: ProductIndexedNumerable[];
  name: string;
}

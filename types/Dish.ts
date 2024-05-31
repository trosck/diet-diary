import type { Product } from "./Product";

export interface ProductNumerable extends Product {
  weight?: number;
  amount?: number;
}

export interface Dish {
  products: ProductNumerable[];
  name: string;
}

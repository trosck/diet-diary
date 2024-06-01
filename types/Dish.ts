import type { Nutrients, Product } from "./Product";

export interface ProductNumerable extends Product {
  weight?: number;
  amount?: number;
}

export interface Dish extends Partial<Nutrients> {
  products: ProductNumerable[];
  name: string;
}

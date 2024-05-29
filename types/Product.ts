export interface Product {
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export interface ProductIndexed extends Product {
  id: number;
}

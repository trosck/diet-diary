export interface Nutrients {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export interface Product extends Nutrients {
  name: string;
}

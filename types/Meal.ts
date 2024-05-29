import type { Dish } from "./Dish";

export interface Meal extends Dish {
  date: Date;
}

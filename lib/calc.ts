import type { Dish } from "~/types/Dish";
import type { Product } from "~/types/Product";

export function calculateMealNutritions(dish: Dish): Product {
  const nutrients = {
    calories: 0,
    fats: 0,
    carbs: 0,
    proteins: 0,
  };

  for (const product of dish.products) {
    for (const nutrientKey in nutrients) {
      const key = nutrientKey as keyof typeof nutrients;
      if (product.weight) {
        nutrients[key] += product[key] * (product.weight / 1000);
      } else if (product.amount) {
        nutrients[key] += product[key] * product.amount;
      }
    }
  }

  for (const nutrientKey in nutrients) {
    const key = nutrientKey as keyof typeof nutrients;
    nutrients[key] = +nutrients[key].toFixed(1);
  }

  return {
    name: dish.name,
    ...nutrients,
  };
}

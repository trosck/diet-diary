import type { Dish } from "~/types/Dish";
import type { Nutrients } from "~/types/Product";

export function calculateMealNutritions(
  dish: Pick<Dish, "products">
): Nutrients {
  const nutrients = {
    calories: 0,
    fats: 0,
    carbs: 0,
    proteins: 0,
  };

  let totalWeight = 0;
  for (const product of dish.products) {
    totalWeight += product?.weight ?? 0;

    for (const nutrientKey in nutrients) {
      const key = nutrientKey as keyof typeof nutrients;
      if (product.weight) {
        nutrients[key] += (product[key] / 100) * product.weight;
      } else if (product.amount) {
        nutrients[key] += product[key] * product.amount;
      }
    }
  }

  const weightMultiplier = totalWeight / 100;

  for (const nutrientKey in nutrients) {
    const key = nutrientKey as keyof typeof nutrients;
    const value = nutrients[key] / weightMultiplier;

    if (!isNaN(value)) {
      nutrients[key] = +value.toFixed(1);
    }
  }

  return nutrients;
}

export function addIdenticalFields<T>(arr: T[]): T {
  if (arr.length < 2) return arr[0];
  return arr.reduce((state, item) => {
    for (const key in item) {
      (state[key] as number) += item[key] as number;
    }
    return state;
  });
}

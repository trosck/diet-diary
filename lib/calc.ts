import type { Dish } from "~/types/Dish";
import type { Nutrients } from "~/types/Product";

export function calculateMealNutritions(
  dish: Pick<Dish, "products">,
  { byWeight = false }: { byWeight: boolean } = { byWeight: false }
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
      const value = product[key];

      if (!value) continue;

      if (product.weight) {
        nutrients[key] += (value / 100) * product.weight;
      } else if (product.amount) {
        nutrients[key] += value * product.amount;
      }
    }
  }

  const weightMultiplier = totalWeight / 100;

  for (const nutrientKey in nutrients) {
    const key = nutrientKey as keyof typeof nutrients;
    const value = byWeight
      ? nutrients[key] / weightMultiplier
      : nutrients[key] * weightMultiplier;

    if (!isNaN(value)) {
      nutrients[key] = +value.toFixed(1);
    }
  }

  return nutrients;
}

export function summarizeNutrients(arr: any[]) {
  if (arr.length < 2) return arr[0];

  const nutrients = {
    calories: 0,
    fats: 0,
    carbs: 0,
    proteins: 0,
  };

  for (const item of arr) {
    for (const nutrientKey in nutrients) {
      const key = nutrientKey as keyof typeof nutrients;
      nutrients[key] += item[key];
    }
  }

  for (const nutrientKey in nutrients) {
    const key = nutrientKey as keyof typeof nutrients;
    nutrients[key] = +nutrients[key].toFixed(1);
  }

  return nutrients;
}

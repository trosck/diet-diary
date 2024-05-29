import type { Meal } from "~/types/Meal";

export const useDiaryStore = defineStore("products", {
  state: () => ({
    meals: [] as Meal[],
  }),
  actions: {
    async addMeal(meal: Meal) {
      this.meals.push(meal);
    },
  },
});

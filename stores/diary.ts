import type { Meal } from "~/types/Meal";

export const useDiaryStore = defineStore("products", {
  state: () => ({
    meals: [] as Meal[],
  }),
  actions: {
    async addMeal(meal: Meal) {
      console.log("meal", meal)
      this.meals.push(meal);
    },
  },
});

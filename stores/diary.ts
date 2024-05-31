import type { Meal } from "~/types/Meal";
import type { WithId } from "~/types/with-id";

export const useDiaryStore = defineStore("diary", {
  state: () => ({
    meals: [] as WithId<Meal>[],
  }),
  actions: {
    async addMeal(meal: Meal) {
      const db = await useIndexedDB();
      const savedMealId = await db.add("diary", meal);
      this.meals.push({
        id: savedMealId,
        ...meal,
      });
    },

    async pullMeals() {
      const db = await useIndexedDB();
      this.meals = await db.getAll("diary");
    },
  },
});

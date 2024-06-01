import { uid } from "uid";
import type { Meal } from "~/types/Meal";
import type { WithId } from "~/types/with-id";

export const useDiaryStore = defineStore("diary", {
  state: () => ({
    meals: [] as WithId<Meal>[],
  }),
  actions: {
    async addMeal(meal: Meal) {
      const db = await useIndexedDB();

      const item = {
        id: uid(),
        ...meal,
      };

      this.meals.push(item);
      await db.add("diary", item);
    },

    async updateMeal(meal: WithId<Meal>) {
      const db = await useIndexedDB();
      await db.put("diary", meal);

      const index = this.meals.findIndex((item) => item.id === meal.id);
      this.meals.splice(index, 1, meal);
    },

    async pullMeals() {
      const db = await useIndexedDB();
      this.meals = await db.getAll("diary");
    },
  },
});

import { uid } from "uid";
import { resetTime } from "~/lib/date";
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

      resetTime(item.date!);

      this.meals.push(item);
      await db.add("diary", item);
    },

    async updateMeal(meal: WithId<Meal>) {
      const db = await useIndexedDB();
      await db.put("diary", meal);

      const index = this.meals.findIndex((item) => item.id === meal.id);
      this.meals.splice(index, 1, meal);
    },

    async pullMeals(date: Date) {
      const mealDate = new Date(date);
      resetTime(mealDate);

      const db = await useIndexedDB();
      const tx = await db.transaction("diary");
      this.meals = await tx.store.index("date").getAll(mealDate);

      await tx.done;
    },
  },
});

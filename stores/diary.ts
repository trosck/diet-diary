import type { Meal } from "~/types/Meal";

const diaryObjectStore = useObjectStore("diary");

export const useDiaryStore = defineStore("diary", {
  state: () => ({
    meals: [] as Meal[],
  }),
  actions: {
    async addMeal(meal: Meal) {
      this.meals.push(meal);

      await diaryObjectStore((store) => {
        store.add?.(meal);
      }, "readwrite");
    },

    async pullMeals() {
      this.meals = await diaryObjectStore((store) => store.getAll());
    },
  },
});

import type { Dish } from "~/types/Dish";

export const useDishesStore = defineStore("dishes", {
  state: () => ({
    dishes: [] as Dish[],
  }),
  actions: {
    addDish(dish: Dish) {
      this.dishes.push(dish);
    },
  },
});

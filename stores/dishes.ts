import type { Dish } from "~/types/Dish";

const dishesObjectStore = useObjectStore("dishes");

export const useDishesStore = defineStore("dishes", {
  state: () => ({
    dishes: [] as Dish[],
  }),
  actions: {
    async addDish(dish: Dish) {
      this.dishes.push(dish);

      await dishesObjectStore((store) => {
        store.add?.(dish);
      }, "readwrite");
    },

    async pullDishes() {
      this.dishes = await dishesObjectStore((store) => store.getAll?.());
    },
  },
});

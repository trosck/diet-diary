import { uid } from "uid";
import type { Dish } from "~/types/Dish";
import type { WithId } from "~/types/with-id";

export const useDishesStore = defineStore("dishes", {
  state: () => ({
    dishes: [] as WithId<Dish>[],
  }),
  actions: {
    async addDish(dish: Dish) {
      const db = await useIndexedDB();

      const item = {
        id: uid(),
        ...dish,
      };

      this.dishes.push(item);
      await db.add("dishes", item);
    },

    async deleteDish(dish: Required<WithId<Dish>>) {
      const db = await useIndexedDB();
      await db.delete("dishes", dish.id);
      const index = this.dishes.findIndex((item) => item.id === dish.id);
      this.dishes.splice(index, 1);
    },

    async pullDishes() {
      const db = await useIndexedDB();
      this.dishes = await db.getAll("dishes");
    },

    async updateDish(dish: WithId<Dish>) {
      const db = await useIndexedDB();
      await db.put("dishes", dish);

      const index = this.dishes.findIndex((item) => item.id === dish.id);
      this.dishes.splice(index, 1, dish);
    },
  },
});

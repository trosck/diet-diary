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
      const tx = db.transaction("dishes", "readwrite");

      const item = {
        id: uid(),
        ...dish,
      };

      this.dishes.push(item);
      await tx.store.add(item);
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

import type { Product } from "~/types/Product";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as (Product & { id: number })[],
  }),
  actions: {
    async fetchProducts() {
      this.products = [
        {
          id: 1,
          name: "meal",
          calories: 150,
          fats: 20,
          proteins: 60,
          carbs: 50,
        },
        {
          id: 2,
          name: "meal",
          calories: 150,
          fats: 20,
          proteins: 60,
          carbs: 50,
        },
      ];
    },
  },
});

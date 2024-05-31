import { uid } from "uid";
import type { Product } from "~/types/Product";
import type { WithId } from "~/types/with-id";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as WithId<Product>[],
  }),
  actions: {
    async fetchProducts() {
      const products = await fetch("/data.json").then((response) =>
        response.json()
      );

      const db = await useIndexedDB();
      const tx = db.transaction("products", "readwrite");

      for (const product of products) {
        const item = {
          id: uid(),
          ...product,
        };

        tx.store.add(item);
        this.products.push(item);
      }

      await tx.done;
    },

    async pullProducts() {
      const db = await useIndexedDB();
      this.products = await db.getAll("products");
    },

    async addProduct(product: Product) {
      const db = await useIndexedDB();

      const item = {
        id: uid(),
        ...product,
      };

      await db.add("products", item);
      this.products.push(item);
    },
  },
});

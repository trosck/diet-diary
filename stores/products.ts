import type { Product, ProductIndexed } from "~/types/Product";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as ProductIndexed[],
  }),
  actions: {
    async fetchProducts() {
      this.products = await fetch("/data.json")
        .then((response) => response.json())
        .then((response) =>
          response.map((product: Product, index: number) => ({
            id: index,
            ...product,
          }))
        );
    },
    async addProduct(product: Product) {
      this.products.push({
        id: this.products.length,
        ...product,
      });
    },
  },
});

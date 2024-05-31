import type { Product, ProductIndexed } from "~/types/Product";

const productsObjectStore = useObjectStore("products");

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as ProductIndexed[],
  }),
  actions: {
    async saveProducts(products: Product[]) {
      await productsObjectStore((store) => {
        for (const product of products) {
          store.add?.(product);
        }
      }, "readwrite");
    },

    async fetchProducts() {
      const products = await fetch("/data.json")
        .then((response) => response.json())
        .then((response) =>
          response.map((product: Product, index: number) => ({
            id: index,
            ...product,
          }))
        );

      this.products = products;
      await this.saveProducts(products);
    },

    async pullProducts() {
      this.products = await productsObjectStore((store) => store.getAll());
    },

    async addProduct(product: Product) {
      await this.saveProducts([product]);
      await this.pullProducts();
    },
  },
});

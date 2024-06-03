<template>
  <UButtonGroup
    orientation="horizontal"
    :ui="{ wrapper: { horizontal: 'flex sticky top-0' } }"
  >
    <UInput
      :ui="{ wrapper: 'grow' }"
      icon="i-heroicons-magnifying-glass-20-solid"
      :trailing="false"
      :placeholder="$t('placeholder.search') + '...'"
      v-model="search"
      color="white"
    />

    <UButton
      icon="i-heroicons-plus"
      :ui="{ base: 'ml-3' }"
      square
      color="gray"
      @click="isModalOpen = true"
    />
  </UButtonGroup>

  <div v-for="product of filteredProducts" :key="product.id">
    <ProductCard v-bind="product" class="mt-5" />
  </div>

  <AddProductModal v-model="isModalOpen" @save="saveProduct" />
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";

const search = ref("");
const isModalOpen = ref(false);

const productsStore = useProductsStore();

onMounted(() => {
  productsStore.pullProducts();
});

const filteredProducts = computed(() => {
  const searchValue = search.value.toLowerCase();
  return productsStore.products.filter((product) =>
    product.name.includes(searchValue)
  );
});

function saveProduct(product: Product) {
  productsStore.addProduct(product);
}
</script>

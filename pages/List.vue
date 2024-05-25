<template>
  <div class="flex">
    <UInput
      :ui="{ wrapper: 'grow' }"
      icon="i-heroicons-magnifying-glass-20-solid"
      :trailing="false"
      :placeholder="$t('search') + '...'"
      v-model="search"
      color="white"
    />

    <UButton icon="i-heroicons-plus" :ui="{ base: 'ml-3' }" square />
  </div>

  <ProductCard
    v-for="product of filteredProducts"
    v-bind="product"
    class="mt-5"
  />
</template>

<script setup lang="ts">
const search = ref("");

const productsStore = useProductsStore();

const filteredProducts = computed(() => {
  const searchValue = search.value.toLowerCase();
  return productsStore.products.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );
});
</script>

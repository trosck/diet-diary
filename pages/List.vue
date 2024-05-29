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

  <ProductCard
    v-for="product of filteredProducts"
    v-bind="product"
    class="mt-5"
  />

  <AddProductModal v-model="isModalOpen" />
</template>

<script setup lang="ts">
const search = ref("");

const isModalOpen = ref(false);

const productsStore = useProductsStore();

const filteredProducts = computed(() => {
  const searchValue = search.value.toLowerCase();
  return productsStore.products.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );
});
</script>

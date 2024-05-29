<template>
  <USelectMenu
    by="id"
    v-model="model"
    :searchable="onSearch"
    option-attribute="name"
    :placeholder="$t('placeholder.selectProduct') + '...'"
  >
    <template #option="{ option: product }">
      <div class="grow">
        <div class="mb-2">{{ product.name }}</div>
        <ProductNutrientList v-bind="product" row />
      </div>
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
const productsStore = useProductsStore();
const model = defineModel();

function onSearch(query: string) {
  const searchQuery = query.toLowerCase();
  return productsStore.products
    .filter((product) => product.name.includes(searchQuery))
    .slice(0, 50);
}
</script>

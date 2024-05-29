<template>
  <USelectMenu
    searchable
    by="id"
    v-model="model"
    :options="productsStore.products.slice(0, 10)"
    option-attribute="name"
    :search-attributes="['name']"
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
</script>

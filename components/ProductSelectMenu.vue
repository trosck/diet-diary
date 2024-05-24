<template>
  <USelectMenu
    searchable
    creatable
    by="id"
    v-model="selected"
    :options="productsStore.products"
    option-attribute="name"
    :search-attributes="['name']"
    placeholder="Select a product"
    show-create-option-when="always"
    :uiMenu="{
      option: {
        container: 'grow'
      }
    }"
  >
    <template #option="{ option: product }">
      <div class="grow">
        <div class="mb-2">{{ product.name }}</div>
        <ProductNutrientList v-bind="product" row />
      </div>
    </template>
  </USelectMenu>
  {{ selected }}
</template>

<script setup lang="ts">
const productsStore = userProductsStore();
const selected = ref(null);
</script>

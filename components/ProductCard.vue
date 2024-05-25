<template>
  <UCard>
    <template #header>
      <div>{{ $props.name }}</div>
    </template>

    <ProductNutrientList v-bind="$props" row />
  </UCard>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";
import ProductNutrientList from "./ProductNutrientList.vue";

defineProps<Product>();
</script>

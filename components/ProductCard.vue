<template>
  <UCard :ui="{ base: $props.class ?? '' }">
    <template #header>
      <div>{{ $props.name }} {{ $props.class }}</div>
    </template>

    <!-- <div class="grid grid-cols-4">
      <ProductNutrient name="calories" :value="$props.calories" />
      <ProductNutrient name="protein" :value="$props.proteins" />
      <ProductNutrient name="fats" :value="$props.fats" />
      <ProductNutrient name="carbs" :value="$props.carbs" />
    </div> -->
    <ProductNutrientList v-bind="$props" row />
  </UCard>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";
import ProductNutrientList from "./ProductNutrientList.vue";

defineProps<Product & { class?: string }>();
</script>

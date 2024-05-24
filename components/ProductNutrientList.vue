<template>
  <div :class="row && 'grid grid-cols-4'">
    <ProductNutrient name="calories" :value="$props.calories" />
    <ProductNutrient name="protein" :value="$props.proteins" />
    <ProductNutrient name="fats" :value="$props.fats" />
    <ProductNutrient name="carbs" :value="$props.carbs" />
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";
import ProductNutrient from "./ProductNutrient.vue";

defineProps<
  Pick<Product, "calories" | "proteins" | "fats" | "carbs"> & { row?: boolean }
>();
</script>

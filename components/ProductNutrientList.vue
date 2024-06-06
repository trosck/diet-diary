<template>
  <div :class="row && 'grid grid-cols-2'">
    <ProductNutrient :name="$t('calories')" :value="$props.calories" />
    <ProductNutrient
      :name="$t('proteins')"
      :value="$props.proteins + $t('measurement.gramm.short')"
    />
    <ProductNutrient
      :name="$t('fats')"
      :value="$props.fats + $t('measurement.gramm.short')"
    />
    <ProductNutrient
      :name="$t('carbs')"
      :value="$props.carbs + $t('measurement.gramm.short')"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";
import ProductNutrient from "./ProductNutrient.vue";

defineProps<
  Pick<Product, "calories" | "proteins" | "fats" | "carbs"> & { row?: boolean }
>();
</script>

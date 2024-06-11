<template>
  <UCard>
    <template #header>
      <div>{{ $props.name }}</div>
      <div><slot name="afterHeader"></slot></div>
    </template>

    <ProductNutrientList v-bind="$props" row />

    <template #footer>
      <UButtonGroup
        orientation="horizontal"
        :ui="{ wrapper: { horizontal: 'flex mt-3' } }"
      >
        <UButton
          :ui="{ base: 'flex-1' }"
          icon="i-heroicons-x-circle"
          color="red"
          :label="$t('delete')"
          @click="$emit('delete')"
        />
        <UButton
          :ui="{ base: 'flex-1' }"
          icon="i-heroicons-pencil-square"
          color="green"
          :label="$t('edit')"
          @click="$emit('edit')"
        />
      </UButtonGroup>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";
import ProductNutrientList from "./ProductNutrientList.vue";

defineProps<Product>();

defineEmits<{
  (event: "edit"): void;
  (event: "delete"): void;
}>();
</script>

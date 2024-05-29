<template>
  <UButtonGroup
    orientation="horizontal"
    :ui="{ wrapper: { horizontal: 'flex sticky top-0' } }"
  >
    <UPopover
      :popper="{ placement: 'bottom-start' }"
      :ui="{ wrapper: 'w-full sticky top-0' }"
    >
      <UButton
        icon="i-heroicons-calendar-days-20-solid"
        :label="format(date, 'd MMM, yyy')"
        block
      />

      <template #panel="{ close }">
        <DatePicker v-model="date" is-required @close="close" />
      </template>
    </UPopover>

    <UButton
      icon="i-heroicons-plus"
      :ui="{ base: 'ml-3' }"
      square
      color="gray"
      @click="isModalOpen = true"
    />
  </UButtonGroup>

  <div v-for="meal of diaryStore.meals">
    <ProductCard
      v-bind="calculateMealNutritions(meal)"
      :name="meal.name"
      class="mt-5"
    />
    <UButtonGroup>
      <UButton
        icon="i-heroicons-edit"
        square
        color="gray"
        @click="isModalOpen = true"
      />
    </UButtonGroup>
  </div>

  <AddMealModal v-model="isModalOpen" @save="addMeal" />
</template>

<script setup lang="ts">
import ProductCard from "~/components/ProductCard.vue";
import DatePicker from "~/components/DatePicker.vue";

import { format } from "date-fns";
import type { Meal, ProductsListItem } from "~/types/Meal";
import type { Product } from "~/types/Product";

const date = ref(new Date());

const diaryStore = useDiaryStore();

const isModalOpen = ref(false);

function calculateMealNutritions(meal: Meal): Product {
  const nutrients = {
    calories: 0,
    fats: 0,
    carbs: 0,
    proteins: 0,
  };

  for (const product of meal.products) {
    for (const nutrientKey in nutrients) {
      const key = nutrientKey as keyof typeof nutrients;
      nutrients[key] += +(product[key] * (product.weight / 1000)).toFixed(1);
    }
  }

  return {
    name: meal.name,
    ...nutrients,
  };
}

function addMeal(meal: Meal) {
  diaryStore.addMeal(meal);
}
</script>

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

  <div v-if="nutrients">
    <UCard>
      <ProductNutrientList v-bind="nutrients" />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import DatePicker from "~/components/DatePicker.vue";

import { addIdenticalFields, calculateMealNutritions } from "~/lib/calc";
import { format } from "date-fns";

import type { Meal } from "~/types/Meal";

const date = ref(new Date());

const diaryStore = useDiaryStore();

const isModalOpen = ref(false);

function addMeal(meal: Meal) {
  diaryStore.addMeal(meal);
}

const nutrients = computed(() =>
  addIdenticalFields(diaryStore.meals.map(calculateMealNutritions))
);
</script>

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

  <div v-if="nutrients" class="mt-5">
    <UCard>
      <ProductNutrientList v-bind="nutrients" row />
    </UCard>
  </div>

  <div v-for="(meal, index) of diaryStore.meals" :key="meal.id">
    <ProductCard v-bind="meal" class="mt-5" />

    <UButtonGroup
      orientation="horizontal"
      :ui="{ wrapper: { horizontal: 'flex mt-3' } }"
    >
      <UButton
        :ui="{ base: 'flex-1' }"
        icon="i-heroicons-x-circle"
        color="red"
        :label="$t('delete')"
        @click="deleteMeal(diaryStore.meals[index])"
      />
      <UButton
        :ui="{ base: 'flex-1' }"
        icon="i-heroicons-pencil-square"
        color="green"
        :label="$t('edit')"
        @click="editMeal(diaryStore.meals[index])"
      />
    </UButtonGroup>
  </div>

  <AddDishModal
    v-model="isModalOpen"
    @save="saveMeal"
    @cancel="resetModalState"
    :state="modalState"
  />
</template>

<script setup lang="ts">
import DatePicker from "~/components/DatePicker.vue";

import { summarizeNutrients, calculateMealNutritions } from "~/lib/calc";
import { format } from "date-fns";

import type { Meal } from "~/types/Meal";

const date = ref(new Date());

const modalState = ref<Meal | null>(null);

const diaryStore = useDiaryStore();

const isModalOpen = ref(false);

onMounted(async () => {
  await diaryStore.pullMeals();
});

const nutrients = computed(() => summarizeNutrients(diaryStore.meals));

function saveMeal(meal: Meal) {
  const item = {
    ...meal,
    ...calculateMealNutritions(meal),
    date: meal.date ?? date.value,
  };

  if (modalState.value) {
    diaryStore.updateMeal(item);
  } else {
    diaryStore.addMeal(item);
  }

  resetModalState();
}

function editMeal(meal: Meal) {
  modalState.value = toRaw(meal);
  isModalOpen.value = true;
}

function deleteMeal(meal: Meal) {}

function resetModalState() {
  modalState.value = null;
}
</script>

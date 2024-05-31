<template>
  <UButtonGroup
    orientation="horizontal"
    :ui="{ wrapper: { horizontal: 'flex sticky top-0' } }"
  >
    <UInput
      :ui="{ wrapper: 'grow' }"
      icon="i-heroicons-magnifying-glass-20-solid"
      :trailing="false"
      :placeholder="$t('placeholder.search') + '...'"
      v-model="search"
      color="white"
    />

    <UButton
      icon="i-heroicons-plus"
      :ui="{ base: 'ml-3' }"
      square
      color="gray"
      @click="isModalOpen = true"
    />
  </UButtonGroup>

  <div v-for="dish of filteredDishes">
    <ProductCard
      v-bind="calculateMealNutritions(dish)"
      :name="dish.name"
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

  <AddDishModal v-model="isModalOpen" @save="addDish" />
</template>

<script setup lang="ts">
import { calculateMealNutritions } from "~/lib/calc";
import type { Dish } from "~/types/Dish";

const search = ref("");

const isModalOpen = ref(false);

const dishesStore = useDishesStore();

function addDish(dish: Dish) {
  dishesStore.addDish(dish);
}

const filteredDishes = computed(() => {
  const searchQuery = search.value.toLowerCase();
  return dishesStore.dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery)
  );
});

onMounted(async () => {
  await dishesStore.pullDishes();
});
</script>

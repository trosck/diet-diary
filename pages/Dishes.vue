<template>
  <UButtonGroup
    orientation="horizontal"
    :ui="{ wrapper: { horizontal: 'flex' } }"
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

  <ProductCard
    v-for="(dish, index) of filteredDishes"
    :key="dish.id"
    v-bind="dish"
    class="mt-5"
    @delete="deleteDish(filteredDishes[index])"
    @edit="editDish(filteredDishes[index])"
  />

  <AddDishModal
    v-model="isModalOpen"
    @save="saveDish"
    @cancel="resetModalState"
    :state="modalState"
  />
</template>

<script setup lang="ts">
import { calculateMealNutritions } from "~/lib/calc";
import type { Dish } from "~/types/Dish";

const search = ref("");

const isModalOpen = ref(false);

const modalState = ref<Dish | null>(null);

const dishesStore = useDishesStore();

const filteredDishes = computed(() => {
  const searchQuery = search.value.toLowerCase();
  return dishesStore.dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery)
  );
});

onMounted(async () => {
  await dishesStore.pullDishes();
});

function saveDish(dish: Dish) {
  const item = {
    ...dish,
    ...calculateMealNutritions(dish, { asPortion: true }),
  };

  if (modalState.value) {
    dishesStore.updateDish(item);
  } else {
    dishesStore.addDish(item);
  }

  resetModalState();
}

function editDish(dish: Dish) {
  modalState.value = toRaw(dish);
  isModalOpen.value = true;
}

function deleteDish(dish: Dish) {}

function resetModalState() {
  modalState.value = null;
}
</script>

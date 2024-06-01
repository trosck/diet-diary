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

  <div v-for="(dish, index) of filteredDishes" :key="dish.id">
    <ProductCard v-bind="dish" class="mt-5" />

    <UButtonGroup
      orientation="horizontal"
      :ui="{ wrapper: { horizontal: 'flex mt-3' } }"
    >
      <UButton
        :ui="{ base: 'flex-1' }"
        icon="i-heroicons-x-circle"
        color="red"
        :label="$t('delete')"
        @click="deleteDish(filteredDishes[index])"
      />
      <UButton
        :ui="{ base: 'flex-1' }"
        icon="i-heroicons-pencil-square"
        color="green"
        :label="$t('edit')"
        @click="editDish(filteredDishes[index])"
      />
    </UButtonGroup>
  </div>

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
    ...calculateMealNutritions(dish, { byWeight: true }),
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

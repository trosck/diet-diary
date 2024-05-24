<template>
  <ProductCard v-for="meal of meals" v-bind="meal" class="mb-5" />

  <UContainer class="flex justify-center">
    <UButton
      :label="$t('add')"
      icon="i-heroicons-plus-16-solid"
      class="m-auto"
      @click="isModalOpen = true"
    />
  </UContainer>

  <UModal v-model="isModalOpen">
    <UCard>
      <UForm>
        <UFormGroup label="Email" name="email">
          <UInput v-model="modalState.name" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput v-model="modalState.calories" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput v-model="modalState.fats" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput v-model="modalState.proteins" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput v-model="modalState.carbs" />
        </UFormGroup>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
// import ProductCard from "~/components/ProductCard.vue";
import ProductCard from "~/components/ProductCard.vue";
import type { Product } from "~/types/Product";

const meals = ref<Product[]>([
  {
    name: "meal",
    calories: 150,
    fats: 20,
    proteins: 60,
    carbs: 50,
  },
  {
    name: "meal",
    calories: 150,
    fats: 20,
    proteins: 60,
    carbs: 50,
  },
]);

const isModalOpen = ref(false);

const modalState = reactive({
  name: undefined,
  calories: undefined,
  fats: undefined,
  proteins: undefined,
  carbs: undefined,
});
</script>

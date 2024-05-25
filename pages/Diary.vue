<template>
  <UPopover
    :popper="{ placement: 'bottom-start' }"
    :ui="{ wrapper: 'mb-5 w-full' }"
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

  <ProductCard
    v-for="product of productsStore.products"
    v-bind="product"
    class="mb-5"
  />

  <UButton
    :label="$t('add')"
    icon="i-heroicons-plus-16-solid"
    class="m-auto"
    @click="isModalOpen = true"
  />

  <UModal v-model="isModalOpen">
    <UCard>
      <UForm>
        <UFormGroup label="Product" name="product_id">
          <ProductSelectMenu />
        </UFormGroup>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import ProductCard from "~/components/ProductCard.vue";
import ProductSelectMenu from "~/components/ProductSelectMenu.vue";
import DatePicker from "~/components/DatePicker.vue";

import { format } from "date-fns";

const date = ref(new Date());

const productsStore = useProductsStore();

const isModalOpen = ref(false);

const modalState = reactive({
  name: undefined,
  calories: undefined,
  fats: undefined,
  proteins: undefined,
  carbs: undefined,
});
</script>

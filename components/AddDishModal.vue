<template>
  <UModal v-model="model" :ui="{ container: 'flex-col', base: 'grow' }">
    <UForm class="flex flex-col p-5 grow" :state="state">
      <UFormGroup :label="$t('dishName')" :ui="{ wrapper: 'mb-5 capitalize' }">
        <UInput v-model="mealName" />
      </UFormGroup>

      <div class="grow">
        <UFormGroup
          label="Product"
          v-for="(item, index) of state"
          :ui="{ wrapper: 'mb-5' }"
        >
          <ProductSelectMenu v-model="state[index]" />
          <div class="h-3"></div>
          <AddDishModalCountInput v-model="state[index]" />
        </UFormGroup>

        <UButton
          :ui="{ base: 'mb-5' }"
          icon="i-heroicons-plus"
          @click="addEmptyItem"
          :label="$t('add')"
        />
      </div>

      <UButtonGroup>
        <UButton
          :ui="{ base: 'grow' }"
          color="gray"
          @click="cancel"
          :label="$t('cancel')"
        />
        <UButton :ui="{ base: 'grow' }" @click="save" :label="$t('save')" />
      </UButtonGroup>
    </UForm>
  </UModal>
</template>

<script setup lang="ts">
import type { Dish, ProductIndexedNumerable } from "~/types/Dish";

const emit = defineEmits<{
  (e: "save", value: Dish): void;
}>();

const model = defineModel();

const baseItem: ProductIndexedNumerable = {
  id: 0,
  name: "",
  calories: 0,
  proteins: 0,
  fats: 0,
  carbs: 0,
  weight: 0,
  amount: 0,
};

const mealName = ref("");

const state: (typeof baseItem)[] = reactive([]);

resetState();

function resetState() {
  mealName.value = "";
  clearState();
  addEmptyItem();
}

function addEmptyItem() {
  state.push({ ...baseItem });
}

function closeModal() {
  model.value = false;
}

function clearState() {
  state.splice(0, state.length);
}

function cancel() {
  closeModal();
  resetState();
}

function save() {
  emit("save", {
    name: mealName.value,
    products: [...toRaw(state)],
  });

  closeModal();
  resetState();
}
</script>

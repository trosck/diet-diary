<template>
  <UModal v-model="model" :ui="{ container: 'flex-col', base: 'grow' }">
    <UForm class="flex flex-col p-5 grow">
      <div class="grow">
        {{ state }}
        <UFormGroup
          label="Product"
          v-for="(item, index) of state"
          :ui="{ wrapper: 'mb-5' }"
        >
          <ProductSelectMenu v-model="state[index]" />
          <UInput
            :ui="{ base: 'mt-2' }"
            icon="i-heroicons-scale"
            v-model="state[index]['weight']"
            @click="(e: any) => e.target.select()"
          />
        </UFormGroup>

        <UButton
          :ui="{ base: 'capitalize mb-5' }"
          icon="i-heroicons-plus"
          @click="addEmptyItem"
          :label="$t('add')"
        />
      </div>

      <UButtonGroup>
        <UButton
          :ui="{ base: 'grow capitalize' }"
          color="gray"
          @click="cancel"
          :label="$t('cancel')"
        />
        <UButton
          :ui="{ base: 'grow capitalize' }"
          @click="save"
          :label="$t('save')"
        />
      </UButtonGroup>
    </UForm>
  </UModal>
</template>

<script setup lang="ts">
import type { Meal, ProductsListItem } from "~/types/Meal";

const emit = defineEmits<{
  (e: "save", value: Meal): void;
}>();

const model = defineModel();

const baseItem: ProductsListItem = {
  id: 0,
  name: "",
  calories: 0,
  proteins: 0,
  fats: 0,
  carbs: 0,
  weight: 0,
};

const state: (typeof baseItem)[] = reactive([]);

addEmptyItem();

function addEmptyItem() {
  state.push({ ...baseItem });
}

function closeModal() {
  model.value = false;
}

function clearState() {
  state.splice(0, state.length);
  addEmptyItem();
}

function cancel() {
  closeModal();
  clearState();
}

function save() {
  emit("save", {
    date: new Date(),
    products: state,
  });

  closeModal();
  clearState();
}
</script>

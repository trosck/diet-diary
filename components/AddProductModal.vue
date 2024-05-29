<template>
  <UModal v-model="model" :ui="{ container: 'flex-col', base: 'grow' }">
    <UForm class="flex flex-col p-5 grow" :state="product">
      <div class="grow">
        <UFormGroup :label="$t('name')" :ui="{ wrapper: 'mb-5 capitalize' }">
          <UInput v-model="product.name" />
        </UFormGroup>

        <UFormGroup
          v-for="fieldName of formFields"
          :label="$t(fieldName)"
          :ui="{ wrapper: 'mb-5 capitalize' }"
        >
          <UInput v-model="product[fieldName]" v-select-on-click />
        </UFormGroup>
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
          :label="$t('add')"
        />
      </UButtonGroup>
    </UForm>
  </UModal>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";

const emit = defineEmits<{
  (e: "save", value: Product): void;
}>();

const model = defineModel();

const formFields: Partial<keyof Product>[] = [
  "calories",
  "carbs",
  "fats",
  "proteins",
];

const baseItem = {
  name: "",
  calories: 0,
  proteins: 0,
  fats: 0,
  carbs: 0,
};

const product = reactive({ ...baseItem });

function closeModal() {
  model.value = false;
}

function clearState() {
  Object.assign(product, baseItem);
}

function cancel() {
  closeModal();
  clearState();
}

function save() {
  emit("save", toRaw(product));
  cancel();
}
</script>

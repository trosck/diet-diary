<template>
  <UModal fullscreen v-model="model">
    <UForm class="flex flex-col p-5 grow overflow-y-auto" :state="state">
      <UFormGroup :label="$t('name')" :ui="{ wrapper: 'mb-5 capitalize' }">
        <UInput v-model="mealName" />
      </UFormGroup>

      <div class="grow">
        <UFormGroup v-for="(item, index) of state" :ui="{ wrapper: 'mb-5' }">
          <UButtonGroup :ui="{ wrapper: { horizontal: 'flex' } }">
            <UButton
              icon="i-heroicons-x-circle"
              color="red"
              @click="deleteItem(index)"
            />
            <ProductSelectMenu v-model="state[index]" class="grow" />
          </UButtonGroup>
          <div class="h-3"></div>
          <AddDishModalCountInput v-model="state[index]" />
        </UFormGroup>

        <UButton
          icon="i-heroicons-plus"
          @click="addEmptyItem"
          :label="$t('add')"
          block
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
import type { Dish, ProductNumerable } from "~/types/Dish";

const emit = defineEmits<{
  (e: "save", value: Dish): void;
  (e: "cancel"): void;
}>();

const model = defineModel();

const props = defineProps<{
  state?: Dish | null;
}>();

const getBaseItem = () => ({
  name: "",
  calories: 0,
  proteins: 0,
  fats: 0,
  carbs: 0,
  weight: 0,
  amount: 0,
});

const mealName = ref("");

const state: ProductNumerable[] = reactive([]);

watch(
  () => model.value,
  () => {
    if (model.value) {
      mealName.value = props.state?.name ?? "";
      const products = props.state?.products ?? [getBaseItem()];
      state.splice(0, state.length, ...products);
    }
  }
);

function addEmptyItem() {
  state.push(getBaseItem());
}

function closeModal() {
  model.value = false;
}

function cancel() {
  closeModal();
  emit("cancel");
}

function save() {
  const products = [...toRaw(state)];

  emit("save", {
    ...props.state,
    name: mealName.value,
    products,
  });

  closeModal();
}

function deleteItem(index: number) {
  state.splice(index, 1);
}
</script>

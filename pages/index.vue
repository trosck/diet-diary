<template>
  <div class="w-full relative h-screen">
    <div class="p-5">
      <div class="fixed z-10" v-if="isLoading">
        <USkeleton class="h-40 w-full mb-5" />
        <USkeleton class="h-40 w-full mb-5" />
        <USkeleton class="h-40 w-full" />
      </div>

      <Diary v-if="screen === SCREEN_TYPE.DIARY" />
      <List v-if="screen === SCREEN_TYPE.LIST" />
    </div>

    <div class="absolute bottom-0 flex justify-between w-full h-14">
      <UButton
        :label="$t('diary')"
        :ui="{ base: 'grow flex justify-center', rounded: 'rounded-none' }"
        @click="screen = SCREEN_TYPE.DIARY"
      />
      <UButton
        :label="$t('list')"
        :ui="{ base: 'grow flex justify-center', rounded: 'rounded-none' }"
        @click="screen = SCREEN_TYPE.LIST"
      />
      <UButton
        label="some"
        :ui="{ base: 'grow flex justify-center', rounded: 'rounded-none' }"
        @click="screen = SCREEN_TYPE.SOME"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Diary from "./Diary.vue";
import List from "./List.vue";

const SCREEN_TYPE = {
  DIARY: "diary",
  LIST: "list",
  SOME: "some",
};

const screen = ref(SCREEN_TYPE.DIARY);

const isLoading = ref(false);

const productsStore = useProductsStore();

onMounted(async () => {
  if (productsStore.products.length) {
    return;
  }

  isLoading.value = true;

  await productsStore.fetchProducts();

  isLoading.value = false;
});
</script>

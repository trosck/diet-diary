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
        @click="screen = SCREEN_TYPE.DIARY"
        :variant="screen === SCREEN_TYPE.DIARY ? 'outline' : 'solid'"
        :ui="{ base: 'grow flex justify-center', rounded: 'rounded-none' }"
      />
      <UButton
        :label="$t('list')"
        @click="screen = SCREEN_TYPE.LIST"
        :variant="screen === SCREEN_TYPE.LIST ? 'outline' : 'solid'"
        :ui="{ base: 'grow flex justify-center', rounded: 'rounded-none' }"
      />
      <UButton
        label="some"
        @click="screen = SCREEN_TYPE.SOME"
        :variant="screen === SCREEN_TYPE.SOME ? 'outline' : 'solid'"
        :ui="{ base: 'grow flex justify-center', rounded: 'rounded-none' }"
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

const screen = ref(SCREEN_TYPE.LIST);

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

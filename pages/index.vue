<template>
  <div class="w-[350px] m-auto p-2.5 relative h-screen">
    <div class="fixed z-10" v-if="isLoading">
      <USkeleton class="h-40 w-full mb-5" />
      <USkeleton class="h-40 w-full mb-5" />
      <USkeleton class="h-40 w-full" />
    </div>

    <Diary v-if="screen === SCREEN_TYPE.DIARY" />
    <List v-if="screen === SCREEN_TYPE.LIST" />

    <UContainer class="absolute bottom-0 flex justify-between w-full pb-5">
      <UButton
        :label="$t('diary')"
        class="m-auto"
        @click="screen = SCREEN_TYPE.DIARY"
      />
      <UButton
        :label="$t('list')"
        class="m-auto"
        @click="screen = SCREEN_TYPE.LIST"
      />
      <UButton label="some" class="m-auto" @click="screen = SCREEN_TYPE.SOME" />
    </UContainer>
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

<template>
  <div class="w-full relative h-screen flex flex-col">
    <div class="p-5 overflow-auto grow">
      <div class="fixed z-10" v-if="isLoading">
        <USkeleton class="h-40 w-full mb-5" />
        <USkeleton class="h-40 w-full mb-5" />
        <USkeleton class="h-40 w-full" />
      </div>

      <div v-else>
        <div v-show="screen === SCREEN_TYPE.DIARY"><Diary /></div>
        <div v-show="screen === SCREEN_TYPE.DISHES"><Dishes /></div>
      </div>
    </div>

    <div class="flex justify-between w-full">
      <UButton
        v-for="buttonName of Object.values(SCREEN_TYPE)"
        :label="$t(buttonName)"
        @click="screen = buttonName"
        :variant="screen === buttonName ? 'soft' : 'solid'"
        :ui="{
          base: 'grow flex justify-center capitalize',
          rounded: 'rounded-none',
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Diary from "./Diary.vue";
import Dishes from "./Dishes.vue";

const SCREEN_TYPE = {
  DIARY: "diary",
  DISHES: "dishes",
  SOME: "some",
};

const screen = ref(SCREEN_TYPE.DISHES);

const isLoading = ref(false);

const productsStore = useProductsStore();

onMounted(async () => {
  isLoading.value = true;

  await productsStore.pullProducts();

  if (!productsStore.products.length) {
    await productsStore.fetchProducts();
    return;
  }

  isLoading.value = false;
});
</script>

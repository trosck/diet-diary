<template>
  <div class="m-auto p-2.5 relative h-screen w-96">
    <Diary v-if="screen === SCREEN_TYPE.DIARY" />
    <List v-if="screen === SCREEN_TYPE.LIST" />

    <UContainer class="absolute flex justify-between w-full bottom-0 pb-5">
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
import Diary from "./screens/Diary.vue";
import List from "./screens/List.vue";

const SCREEN_TYPE = {
  DIARY: "diary",
  LIST: "list",
  SOME: "some",
};

const screen = ref(SCREEN_TYPE.DIARY);
</script>

<template>
  <UButtonGroup v-if="model">
    <UInput
      icon="i-heroicons-scale"
      v-model="model[measurementKey]"
      v-select-on-click
    />

    <USelect
      v-model="measurementType"
      :options="[
        $t('measurement.quantity.short'),
        $t('measurement.gramm.short'),
      ]"
    />
  </UButtonGroup>
</template>

<script setup lang="ts">
import type { ProductsListItem } from "~/types/Meal";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const model = defineModel<ProductsListItem>();

const measurementType = ref(t("measurement.gramm.short"));
const measurementKey = computed(() =>
  measurementType.value === t("measurement.gramm.short") ? "weight" : "amount"
);
</script>

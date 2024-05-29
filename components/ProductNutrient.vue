<template>
  <div class="nutrient_container">
    <div class="nutrient_name capitalize">{{ $props.name }}</div>
    <div class="nutrient_value">{{ $props.value }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  value: string | number;
}>();
</script>

<style>
.nutrient_container {
  display: flex;
  flex-direction: column;
}
</style>

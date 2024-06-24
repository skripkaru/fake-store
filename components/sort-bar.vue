<script setup lang="ts">
defineProps<{
  handleChange: () => void;
}>();
const model = defineModel()
</script>

<template>
  <div class="flex gap-2 py-4">
    <select id="sort" v-model="model" @change="handleChange">
      <option value="" disabled>Sort by</option>
      <option value="title">Title</option>
      <option value="price">Price</option>
    </select>
  </div>
</template>

<style scoped>

</style>
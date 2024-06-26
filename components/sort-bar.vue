<script setup lang="ts">
defineProps<{
  handleChange: () => void;
}>();
const selectedSort = defineModel('selectedSort')
const order = defineModel('order')
</script>

<template>
  <div class="flex gap-2 py-4">
    <select v-model="selectedSort" @change="handleChange">
      <option value="" disabled>Sort by</option>
      <option value="title">Title</option>
      <option value="price">Price</option>
    </select>
    <select v-model="order" @change="handleChange">
      <option value="" disabled>Order</option>
      <option value="asc">Asc</option>
      <option value="desc">Desc</option>
    </select>
  </div>
</template>

<style scoped>

</style>
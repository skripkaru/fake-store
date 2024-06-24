<script setup lang="ts">
defineProps<{
  totalPages: number
  handleClick: (page: number) => void
}>()
</script>

<template>
  <div v-if="totalPages" class="flex items-center gap-1 py-4">
    <button
      v-for="page in totalPages"
      :key="page"
      class="w-8 h-8 p-2 flex items-center justify-center bg-gray-600 text-white text-sm rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      @click="handleClick(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<style scoped>

</style>
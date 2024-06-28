<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
  nextPage: () => void
  prevPage: () => void
  setPage: (page: number) => void
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-1 py-4">
    <button class="i-ph:caret-left" @click="prevPage" :disabled="currentPage === 1"></button>
    <template v-if="totalPages">
      <button
        v-for="page in totalPages"
        :key="page"
        class="button w-8 h-8 p-1 flex items-center justify-center"
        :class="page === currentPage ? 'bg-gray-500' : 'bg-gray-600'"
        @click="setPage(page)"
      >
        {{ page }}
      </button>
    </template>
    <button class="i-ph:caret-right" @click="nextPage" :disabled="currentPage >= totalPages"></button>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
  nextPage: () => void
  prevPage: () => void
  setPage?: () => void
}>()
</script>

<template>
  <div class="flex items-center justify-center gap-4 py-8">
    <button class="i-ph:caret-left" @click="prevPage" :disabled="currentPage === 1"></button>
    <span>{{ currentPage }}</span>
<!--    <template v-if="totalPages">-->
<!--      <button-->
<!--        v-for="page in totalPages"-->
<!--        :key="page"-->
<!--        class="w-8 h-8 p-2 flex items-center justify-center bg-gray-600 text-white text-sm rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"-->
<!--        @click="setPage"-->
<!--      >-->
<!--        {{ page }}-->
<!--      </button>-->
<!--    </template>-->
    <button class="i-ph:caret-right" @click="nextPage" :disabled="currentPage >= totalPages"></button>
  </div>
</template>

<style scoped>

</style>
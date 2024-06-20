<script setup lang="ts">
  defineProps<{
    label?: string
    placeholder?: string
  }>()
  const model = defineModel()
</script>

<template>
  <label class="block text-sm font-medium text-gray-700 mb-2">
    {{ label }}
    <input
      type="text"
      v-model="model"
      :placeholder="placeholder"
      class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
  </label>
</template>

<style scoped>

</style>
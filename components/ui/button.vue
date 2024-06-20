<script setup lang="ts">
const emit = defineEmits(['click'])

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <button @click="handleClick" class="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>
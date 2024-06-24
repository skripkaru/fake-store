<script setup lang="ts">
const emit = defineEmits(['click'])

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <button @click="handleClick" class="button">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>
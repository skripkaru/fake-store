<script setup lang="ts">
defineProps(['message'])
</script>

<template>
  <div class="text-center text-red-500 py-8">
    <slot>{{ message }}</slot>
  </div>
</template>

<style scoped>

</style>
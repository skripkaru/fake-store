<script setup lang="ts">
defineProps(['isLoading'])
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center container mx-auto px-4 h-full">
    <div class="">
      <slot>Loading...</slot>
    </div>
  </div>
</template>

<style scoped>

</style>
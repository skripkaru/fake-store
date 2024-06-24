<script setup lang="ts">
defineProps<{
  handleSubmit: () => void;
}>();
const model = defineModel()
</script>

<template>
  <form @submit.prevent="handleSubmit" class="grid grid-cols-[1fr_auto] gap-2 py-4">
    <ui-input v-model="model" type="text" name="search" placeholder="Search products"/>
    <ui-button>Search</ui-button>
  </form>
</template>

<style scoped>

</style>
<script setup lang="ts">
interface IProps {
  title: string
  description: string
  link: string
  label: string
}

defineProps<IProps>()
</script>

<template>
  <div class="h-full grid place-items-center">
    <div class="text-center">
      <h1 class="mt-4 heading-1">{{ title }}</h1>
      <p v-if="description" class="mt-6 text-base leading-7 text-gray-600">{{ description }}</p>
      <div v-if="link" class="mt-10 flex items-center justify-center gap-x-6">
        <ui-button :to="link">{{ label }}</ui-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
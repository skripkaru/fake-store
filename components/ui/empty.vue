<script setup lang="ts">
interface IProps {
  errorText?: string
  title: string
  description?: string
  link?: string
  label?: string
}

defineProps<IProps>()
</script>

<template>
  <div class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p v-if="errorText" class="text-base font-semibold text-gray-600">{{ errorText }}</p>
      <h1 class="mt-4 heading-1">{{ title }}</h1>
      <p v-if="description" class="mt-6 text-base leading-7 text-gray-600">{{ description }}</p>
      <div v-if="link" class="mt-10 flex items-center justify-center gap-x-6">
        <nuxt-link
          :to="link"
          class="button"
        >
          {{ label }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
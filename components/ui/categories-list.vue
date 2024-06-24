<script setup lang="ts">
import type {ICategory} from "~/types";

defineProps<{
  categories: ICategory[],
  selectedCategory: string,
  handleChange: (categorySlug: string) => void
}>()
</script>

<template>
  <div v-if="categories" class="overflow-auto py-4">
    <div class="flex gap-2">
      <div
        v-for="category in categories"
        :key="category.slug"
        class="link whitespace-nowrap"
        :class="{'text-gray-400': selectedCategory === category.slug}"
        @click="handleChange(category.slug)"
      >
        {{ category.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
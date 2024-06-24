<script setup lang="ts">
import type {ICategory} from "~/types";

defineProps<{
  categories: ICategory[];
  handleClick: (categorySlug: string) => void
}>();
</script>

<template>
  <div class="flex items-center gap-2 overflow-scroll">
    <div
      v-for="category in categories"
      :key="category.slug"
      @click="handleClick(category.slug)"
      class="link shrink-0"
    >
      {{category.name}}
    </div>
  </div>
</template>

<style scoped>

</style>
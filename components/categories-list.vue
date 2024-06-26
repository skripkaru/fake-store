<script setup lang="ts">
import type {ICategory} from "~/types";
import {useProductStore} from "~/store/product";

defineProps<{
  categories: ICategory[],
}>()

const productStore = useProductStore()
const {
  categories,
} = storeToRefs(productStore)
const {fetchProductsByCategory} = productStore
</script>

<template>
  <div v-if="categories.length" class="overflow-auto py-4">
    <div class="flex gap-2">
      <div
        v-for="category in categories"
        :key="category.slug"
        class="link whitespace-nowrap"
        @click="fetchProductsByCategory(category.slug)"
      >
        {{ category.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
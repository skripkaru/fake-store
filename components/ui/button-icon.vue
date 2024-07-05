<script setup lang="ts">
defineProps<{
  to?: string
}>()
const emit = defineEmits(['click'])

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <nuxt-link v-if="to" :to="to" class="button-icon">
    <slot/>
  </nuxt-link>
  <button v-else @click="handleClick" class="button-icon">
    <slot/>
  </button>
</template>

<style scoped>

</style>
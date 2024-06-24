<script setup lang="ts">
interface IProps {
  type: string
  name: string
  label?: string
  placeholder?: string
}

defineProps<IProps>()
const model = defineModel()
</script>

<template>
  <div>
    <label v-if="label" :for="label" class="block mb-1 text-sm font-medium text-gray-900">{{ label }}</label>
    <input
      v-model="model"
      :placeholder="placeholder"
      :id="label"
      :type="type"
      :name="name"
      class="input"
    >
  </div>
</template>

<style scoped>

</style>
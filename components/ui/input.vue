<script setup lang="ts">
interface IProps {
  type: string
  name: string
  label?: string
  placeholder?: string
  autocomplete?: string
}

defineProps<IProps>()
const model = defineModel()
</script>

<template>
  <div>
    <label :for="label" class="block text-sm font-medium text-gray-900">{{ label }}</label>
    <div class="mt-1">
      <input
        v-model="model"
        :placeholder="placeholder"
        :id="label"
        :type="type"
        :name="name"
        :autocomplete="name"
        required
        class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      >
    </div>
  </div>
</template>

<style scoped>

</style>
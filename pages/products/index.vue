<script setup lang="ts">
import {useProductStore} from '~/store/product'
import {onMounted} from 'vue'

const productStore = useProductStore()
const {
  products,
  pending,
  error
} = storeToRefs(productStore)
const {
  fetchProducts,
} = productStore

onMounted(() => {
  fetchProducts()
})

useHead({
  title: 'Products'
})
</script>

<template>
  <ui-loading v-if="pending" :is-loading="pending"/>

  <div v-else-if="products.length" class="container">
    <products-list :products="products"/>
  </div>

  <ui-error-message v-else>{{ error }}</ui-error-message>
</template>

<style scoped>

</style>
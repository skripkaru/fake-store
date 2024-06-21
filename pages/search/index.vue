<script setup lang="ts">
import type {IProduct} from "~/types";
import {useCartStore} from '~/store/cart'

const {addItem} = useCartStore()

const router = useRouter()

const searchQuery = ref<string>('')
const products = ref<IProduct[]>([]);
const pending = ref<boolean>(false);
const error = ref<any>(null);

const searchProducts = async () => {
  pending.value = true;
  error.value = null;
  try {
    const {data, error: fetchError} = await useFetch('/api/products/search', {
      params: {
        search: searchQuery.value
      }
    });
    if (fetchError.value) {
      throw new Error(fetchError.value.message);
    }
    products.value = data.value;
  } catch (err) {
    error.value = err;
  } finally {
    pending.value = false;
  }
}

const addToCart = (product: IProduct) => {
  addItem(product)
  router.push('/cart')
}
</script>

<template>

  <div class="container mx-auto px-4">
    <form @submit.prevent="searchProducts" class="mb-8">
      <ui-input v-model="searchQuery" type="text" name="search" placeholder="Search..." autocomplete="off"/>
    </form>
    <ui-empty
      v-if="!products.length"
      error-text="Oops"
      title="Products not found"
      description="Please try searching for something else or browse our catalog for more options."
      link="/catalog"
      label="Go to catalog"
    />
    <div v-if="products" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6 xl:gap-8">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart(product)"
      />
    </div>
    <div v-else class="text-center py-8">Loading...</div>
    <div v-if="error" class="text-center text-red-500 py-8">{{ error.message }}</div>
  </div>
</template>

<style scoped>

</style>
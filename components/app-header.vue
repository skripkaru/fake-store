<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()
const {itemCount} = storeToRefs(cartStore)

const authStore = useAuthStore()
const { logUserOut } = authStore;
const { authenticated, user} = storeToRefs(authStore);

const router = useRouter();

const logout = () => {
  logUserOut();
  router.push('/login');
};
</script>

<template>
  <header class="py-4 border-b border-gray-200">
    <nav class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <nuxt-link class="font-semibold text-gray-500 text-lg sm:text-xl md:text-2xl" to="/">
          Fake Shop
        </nuxt-link>
        <div class="flex items-center gap-3 sm:gap-6">
          <nuxt-link v-if="!authenticated" to="/login" class="text-sm font-medium text-gray-700 hover:text-gray-800">
            Sign in
          </nuxt-link>
          <nuxt-link v-if="authenticated" to="/cart" class="relative flex items-center gap-1 text-gray-400 hover:text-gray-500">
            <div class="i-ph:bag-light h-6 w-6 flex-shrink-0"></div>
            <span class="text-sm font-medium text-gray-700">{{itemCount}}</span>
          </nuxt-link>
          <nuxt-link v-if="authenticated" @click="logout" class=" text-gray-400 hover:text-gray-500 cursor-pointer">
            <div class="i-ph:sign-out-light h-6 w-6 flex-shrink-0"></div>
          </nuxt-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart'
import AppLogo from "~/components/app-logo.vue";

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
    <nav aria-label="Top" class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <app-logo/>

        <div class="flex items-center gap-2 sm:gap-4 md:gap-8">
          <nuxt-link v-if="authenticated" to="/products" class="text-sm font-medium text-gray-700 hover:text-gray-800">
            Catalog
          </nuxt-link>

          <nuxt-link v-if="!authenticated" to="/login" class="text-sm font-medium text-gray-700 hover:text-gray-800">
            Sign in
          </nuxt-link>
          <span class="h-6 w-px bg-gray-200" aria-hidden="true"></span>
          <nuxt-link v-if="!authenticated" to="/register" class="text-sm font-medium text-gray-700 hover:text-gray-800">Sign up</nuxt-link>

          <nuxt-link v-if="authenticated" to="/search" class=" text-gray-400 hover:text-gray-500 cursor-pointer">
            <span class="sr-only">Search</span>
            <div class="i-ph:magnifying-glass-light h-6 w-6 flex-shrink-0"></div>
          </nuxt-link>

          <nuxt-link v-if="authenticated" to="/cart" class="relative flex items-center gap-1 text-gray-400 hover:text-gray-500">
            <div class="i-ph:bag-light h-6 w-6 flex-shrink-0"></div>
            <span class="text-sm font-medium text-gray-700">{{itemCount}}</span>
            <span class="sr-only">items in cart, view bag</span>
          </nuxt-link>
          <nuxt-link v-if="authenticated" @click="logout" class=" text-gray-400 hover:text-gray-500 cursor-pointer">
            <span class="sr-only">Logout</span>
            <div class="i-ph:sign-out-light h-6 w-6 flex-shrink-0"></div>
          </nuxt-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
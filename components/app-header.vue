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
  <header class="relative bg-white">
<!--    <p class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">Get free delivery on orders over $100</p>-->

    <nav aria-label="Top" class="container mx-auto">
      <div class="border-b border-gray-200">
        <div class="flex h-16 items-center">

          <!-- Logo -->
          <div class="ml-4 flex lg:ml-0">
            <NuxtLink class="flex items-center gap-1 text-xl font-semibold text-indigo-500" to="/">
              Fake Store
              <span class="sr-only">Fake Store</span>
            </NuxtLink>
          </div>

          <!-- Flyout menus -->
          <div class="hidden lg:ml-8 lg:block lg:self-stretch">
            <div class="flex h-full space-x-8">
              <NuxtLink v-if="authenticated" to="/products" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Products</NuxtLink>
            </div>
          </div>

          <div class="ml-auto flex items-center">
            <div v-if="!authenticated" class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <NuxtLink to="/login" class="text-sm font-medium text-gray-700 hover:text-gray-800">
                Sign in
              </NuxtLink>
              <span class="h-6 w-px bg-gray-200" aria-hidden="true"></span>
              <NuxtLink to="/" class="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</NuxtLink>
            </div>
<!--            <div class="flex lg:ml-6">-->
<!--              <NuxtLink to="#/" class="p-2 text-gray-400 hover:text-gray-500">-->
<!--                <span class="sr-only">Search</span>-->
<!--                <div class="i-ph:magnifying-glass-light h-6 w-6 flex-shrink-0"></div>-->
<!--              </NuxtLink>-->
<!--            </div>-->
            <div v-if="authenticated" class="ml-4 flow-root lg:ml-6">
              <NuxtLink to="/cart" class="group -m-2 flex items-center p-2">
                <div class="i-ph:bag-light h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"></div>
                <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{itemCount}}</span>
                <span class="sr-only">items in cart, view bag</span>
              </NuxtLink>
            </div>
            <div v-if="authenticated" class="ml-4 flow-root lg:ml-6">
              <NuxtLink @click="logout" class="p-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                <span class="sr-only">Logout</span>
                <div class="i-ph:sign-out-light h-6 w-6 flex-shrink-0"></div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
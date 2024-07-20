<script setup lang="ts">
import {useCartStore} from "~/store/cart";
import {useAuthStore} from "~/store/auth";

const router = useRouter()

const cartStore = useCartStore()
const {totalItems} = storeToRefs(cartStore)

const authStore = useAuthStore()
const {logUserOut} = authStore;
const {authenticated} = storeToRefs(authStore);


const logout = () => {
  logUserOut();
  router.push('/login');
};

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: ' font-sans text-gray-900',
  }
})
</script>

<template>
  <el-container class="h-full">
    <el-header class="w-full py-4 border-b border-gray-200">
      <div class="h-full container mx-auto">
        <div class="h-full flex items-center justify-between">
          <nuxt-link to="/" class="font-semibold text-lg sm:text-xl">
            Fake Store
          </nuxt-link>
          <div class="flex items-center">
            <el-button v-if="!authenticated" @click="router.push('/login')" link>
              Sign in
            </el-button>
            <el-button v-if="authenticated" @click="router.push('/')" link>
              Home
            </el-button>
            <el-button v-if="authenticated" @click="router.push('/products')" link>
              Shop
            </el-button>
            <el-button v-if="authenticated" @click="router.push('/cart')" class="relative" link>
              <div class="i-ph:bag-light h-6 w-6"></div>
              <span class="absolute -top-2 -right-2 text-xs font-medium text-gray-700">
              {{ totalItems }}
            </span>
            </el-button>
            <el-button v-if="authenticated" link @click="logout">
              <div class="i-ph:sign-out-light h-6 w-6"></div>
            </el-button>
          </div>
        </div>
      </div>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
    <el-footer class="w-full py-4">
      <div class="h-full container mx-auto">
        <div class="h-full flex items-center justify-center">
          <span class="text-xs text-gray-500">2024-Present © Fake Store</span>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<style>
html,
body,
#__nuxt {
  height: 100%;
}
</style>
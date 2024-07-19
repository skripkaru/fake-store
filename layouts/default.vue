<script setup lang="ts">
import {useCartStore} from "~/store/cart";

const router = useRouter()

const cartStore = useCartStore()
const {totalItems} = storeToRefs(cartStore)

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
          <nuxt-link to="/" class="font-semibold text-lg sm:text-xl md:text-2xl">
            Fake Store
          </nuxt-link>
          <div class="flex items-center gap-2">
            <!--          <el-button link>-->
            <!--            Sign in-->
            <!--          </el-button>-->
            <el-button @click="router.push('/')" link>
              Home
            </el-button>
            <el-button @click="router.push('/products')" link>
              Shop
            </el-button>

            <div class="w-px h-5 bg-gray-200"></div>

            <el-button @click="router.push('/cart')" class="relative" link>
              <div class="i-ph:bag-light h-6 w-6"></div>
              <span class="absolute -top-1 -right-1 text-xs font-medium text-gray-700">
              {{ totalItems }}
            </span>
            </el-button>
            <!--          <el-button link>-->
            <!--            <div class="i-ph:sign-out-light h-6 w-6"></div>-->
            <!--          </el-button>-->
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

.el-button + .el-button {
  margin-left: 0;
}

.container {
  width: 100%;
}
</style>
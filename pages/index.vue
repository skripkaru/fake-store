<script setup lang="ts">
const router = useRouter()

useHead({
  title: 'Home'
})
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16 py-16">
      <div>
        <h1 class="text-2xl lg:text-4xl mb-4">
          Summer styles are finally here
        </h1>
        <p class="mb-8 text-gray-500">
          This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care
          if you live or die.
        </p>
        <el-button @click="router.push('/products')">Shop Collection</el-button>
      </div>

      <div class="grid grid-cols-3 items-center gap-col-4 lg:gap-col-8">
        <div class="grid grid-cols-1 gap-row-6 lg:gap-row-8">
          <div class="overflow-hidden rounded-lg">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
              alt=""
              class="h-full w-full object-cover object-top aspect-square"
            >
          </div>
          <div class="overflow-hidden rounded-lg">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
              alt=""
              class="h-full w-full object-cover object-top aspect-square"
            >
          </div>
        </div>
        <div class="grid grid-cols-1 gap-y-4 lg:gap-y-8">
          <div class="overflow-hidden rounded-lg">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
              alt=""
              class="h-full w-full object-cover object-top aspect-square"
            >
          </div>
          <div class="overflow-hidden rounded-lg">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
              alt=""
              class="h-full w-full object-cover object-top aspect-square"
            >
          </div>
          <div class="overflow-hidden rounded-lg">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
              alt=""
              class="h-full w-full object-cover object-top aspect-square"
            >
          </div>
        </div>
        <div class="grid flex-shrink-0 grid-cols-1 gap-y-4 lg:gap-y-8">
          <div class="overflow-hidden rounded-lg">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
              alt=""
              class="h-full w-full object-cover object-top aspect-square"
            >
          </div>
          <div class="overflow-hidden rounded-lg">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
              alt=""
              class="h-full w-full object-cover object-top aspect-square"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
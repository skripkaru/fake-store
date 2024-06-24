<script setup lang="ts">
import type {IProduct} from "~/types";

interface IBreadcrumb {
  name: string
  path: string
}

const route = useRoute()
const breadcrumbs = ref<IBreadcrumb[]>([])

const updateBreadcrumbs = async () => {
  const paths = route.path.split('/').filter(Boolean)
  console.log('paths', paths)

  const tempBreadcrumbs = await Promise.all(paths.map(async (path, index) => {
    if (path === 'products' && index + 1 < paths.length) {

      const productId = paths[index + 1]
      const {data: product} = await useFetch<IProduct>(`/api/products/${productId}`)
      if (product.value) {
        return {
          name: product.value.title || 'Product',
          path: `/${paths.slice(0, index + 2).join('/')}`
        }
      }
    }

    return {
      name: path.charAt(0).toUpperCase() + path.slice(1),
      path: `/${paths.slice(0, index + 1).join('/')}`
    }
  }))

  console.log('tempBreadcrumbs', tempBreadcrumbs)

  breadcrumbs.value = [{name: 'Home', path: '/'}, ...tempBreadcrumbs]
}

onMounted(updateBreadcrumbs)
watch(() => route.path, updateBreadcrumbs)
</script>

<template>
  {{ breadcrumbs }}
  <nav aria-label="Breadcrumb">
    <ul role="list" class="flex items-center">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="flex items-center text-sm">
        <NuxtLink
          v-if="index < breadcrumbs.length - 1"
          :to="breadcrumb.path"
          class="font-medium text-gray-900 hover:text-gray-800"
        >
          {{ breadcrumb.name }}
        </NuxtLink>
        <span v-else class="font-medium text-gray-500">{{ breadcrumb.name }}</span>
        <div
          v-if="index < breadcrumbs.length - 1"
          class="i-ph:caret-right-light h-4 w-4 mx-1 text-gray-300"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
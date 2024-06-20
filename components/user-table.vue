<script setup lang="ts">
import type {IUser} from "~/types";

defineProps<{ users: IUser[] }>()
const router = useRouter()

const goToUser = (id: number) => {
  router.push(`/users/${id}`)
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200">
      <thead class="text-left">
      <tr>
        <th class="px-4 py-2 border-b">ID</th>
        <th class="px-4 py-2 border-b">Name</th>
        <th class="px-4 py-2 border-b">Email</th>
        <th class="px-4 py-2 border-b">Phone</th>
        <th class="px-4 py-2 border-b">Role</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
        class="cursor-pointer hover:bg-gray-100"
        @click="goToUser(user.id)"
      >
        <td class="px-4 py-2 border-b">{{ user.id }}</td>
        <td class="px-4 py-2 border-b">{{ user.firstName }} {{ user.lastName }}</td>
        <td class="px-4 py-2 border-b">{{ user.email }}</td>
        <td class="px-4 py-2 border-b">{{ user.phone }}</td>
        <td class="px-4 py-2 border-b">{{ user.role }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
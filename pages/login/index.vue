<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useAuthStore} from '~/store/auth';

const {authenticateUser} = useAuthStore();
const {authenticated, error} = storeToRefs(useAuthStore());

const user = ref({
  username: 'emilys',
  password: 'emilyspass',
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);

  if (authenticated) {
    await router.push('/');
  }
};

</script>

<template>
  <div class="flex min-h-full flex-col justify-center container mx-auto px-4">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="mb-8 text-center heading-1">Sign in to your account</h1>
      <form class="space-y-6" @submit.prevent="login">
        <ui-input
          v-model="user.username"
          id="username"
          type="text"
          name="username"
          label="Name"
          placeholder="Enter your name"
        />
        <ui-input
          v-model="user.password"
          id="password"
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
        <ui-button class="w-full">Sign in</ui-button>
      </form>
      <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
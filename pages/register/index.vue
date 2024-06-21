<script setup lang="ts">
const user = ref({
  username: '',
  password: '',
});
const router = useRouter();

const register = async () => {
  await router.push('/login');
};

</script>

<template>
  <div class="flex min-h-full flex-col justify-center container mx-auto px-4">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="mb-8 text-center text-2xl font-semibold text-gray-900">Sign up your account</h1>
      <form class="space-y-6" @submit.prevent="register">
        <ui-input
          v-model="user.username"
          id="username"
          type="text"
          name="username"
          label="Name"
          placeholder="Enter your name"
          autocomplete="username"
        />
        <ui-input
          v-model="user.password"
          id="password"
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          autocomplete="current-password"
        />
        <ui-button>Sign up</ui-button>
        <p class="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <nuxt-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</nuxt-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
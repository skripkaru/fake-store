import {defineStore} from 'pinia';
import type {IUser} from "~/types";

interface UserPayloadInterface {
  username: string;
  password: string;
}

interface FetchResult<T> {
  data: { value: T | null };
  error: { value: any | null };
}

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref<boolean>(false);
  const error = ref<any>(null);
  const user = ref<IUser | null>(null);

  const authenticateUser = async ({username, password}: UserPayloadInterface) => {
    const {data, error: err} = await useFetch<any>('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        password,
      }),
    }) as FetchResult<any>;

    if (data.value) {
      const token = useCookie<string>('token');
      token.value = data.value.token;
      authenticated.value = true;
      await getCurrentUser(); // Fetch current user after login
    } else if (err.value) {
      error.value = err.value;
    }
  };

  const getCurrentUser = async () => {
    const token = useCookie<string>('token');
    if (!token.value) {
      return
    }

    const {data, error: err} = await useFetch<IUser>('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
    }) as FetchResult<IUser>;

    if (data.value) {
      user.value = data.value;
    } else if (err.value) {
      error.value = err.value;
    }
  };

  const logUserOut = () => {
    const token = useCookie('token');
    authenticated.value = false;
    token.value = null;
    user.value = null;
  };

  return {
    authenticated,
    error,
    user,
    authenticateUser,
    getCurrentUser,
    logUserOut,
  };
});

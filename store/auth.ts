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
      console.log("Token set:", token.value);
      authenticated.value = true;
      await getCurrentUser(); // Fetch current user after login
    } else if (err.value) {
      console.log("Login error:", err.value);
      error.value = err.value;
    }
  };

  const getCurrentUser = async () => {
    const token = useCookie<string>('token');
    console.log("Token retrieved:", token.value);
    if (!token.value) {
      console.log("Token not found");
      return
    }

    if(token.value) {
      console.log("Token:", token.value);
    }

    const {data, error: err} = await useFetch<IUser>('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
    }) as FetchResult<IUser>;

    console.log("Fetch result data:", data.value);
    console.log("Fetch result error:", err.value);

    if (data.value) {
      console.log("User data:", data.value);
      user.value = data.value;
    } else if (err.value) {
      console.log("Error:", err.value);
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

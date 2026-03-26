import { API_ROUTES } from '@/api';
import type { IProfile } from '@/interfaces/profile';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useProfileStore } from './profile';

const AUTH_TOKEN_KEY = 'auth_token';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(AUTH_TOKEN_KEY) || null);
  const profileStore = useProfileStore();

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem(AUTH_TOKEN_KEY, newToken);
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    profileStore.clearProfile();
  };

  const getToken = computed(() => {
    return token.value;
  });

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(API_ROUTES.REGISTER, { username, email, password });
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const { data } = await axios.post<{ data: { token: string; user: IProfile } }>(
        API_ROUTES.LOGIN,
        {
          username,
          password,
        },
      );
      setToken(data.data.token);
      profileStore.setProfile(data.data.user);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return { register, login, getToken, logout };
});

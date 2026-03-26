import { API_ROUTES, http } from '@/api';
import type { IProfile } from '@/interfaces/profile';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<IProfile | null>(null);

  const setProfile = (newProfile: IProfile) => {
    profile.value = newProfile;
  };

  const getProfile = computed(() => {
    return profile.value;
  });

  const clearProfile = () => {
    profile.value = null;
  };

  const fetchProfile = async () => {
    try {
      const { data } = await http.get<{ data: { user: IProfile } }>(API_ROUTES.PROFILE);
      setProfile(data.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return { setProfile, getProfile, clearProfile, fetchProfile };
});

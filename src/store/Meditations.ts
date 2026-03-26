import { http } from '@/api';
import type { IMeditation } from '@/interfaces/meditation';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMeditationsStore = defineStore('meditations', () => {
  const meditations = ref<IMeditation[]>([]);

  const fetchMeditations = async () => {
    try {
      const response = await http.get<{ data: { meditations: IMeditation[] }; status: string }>(
        'http://localhost:3000/api/meditations',
      );
      meditations.value = response.data.data.meditations;
    } catch (error) {
      console.error('Error fetching meditations:', error);
    }
  };

  return { meditations, fetchMeditations };
});

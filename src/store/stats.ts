import { defineStore } from 'pinia';
import type { IStat } from '@/interfaces/stat';
import { API_ROUTES, http } from '@/api';

export const useStatsStore = defineStore('stats', () => {
  const addStat = async (type: string, value: number) => {
    try {
      const { data } = await http.post<{ data: { stat: IStat } }>(API_ROUTES.STATS, {
        type,
        value,
      });
      return data.data.stat;
    } catch (error) {
      console.error('Error adding stat:', error);
    }
  };

  return { addStat };
});

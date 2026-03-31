import { defineStore } from 'pinia';
import type { IStat, IStatsSummary } from '@/interfaces/stat';
import { API_ROUTES, http } from '@/api';
import { ref } from 'vue';

export const useStatsStore = defineStore('stats', () => {
  const stats = ref<IStat[]>([]);
  const summary = ref<IStatsSummary | null>(null);

  const fetchStats = async () => {
    try {
      const { data } = await http.get<{ data: { stats: IStat[]; summary: IStatsSummary } }>(
        API_ROUTES.STATS,
      );
      stats.value = data.data.stats;
      summary.value = data.data.summary;
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const addStat = async (type: string, value: number) => {
    try {
      await http.post(API_ROUTES.STATS, {
        type,
        value,
      });
      await fetchStats();
    } catch (error) {
      console.error('Error adding stat:', error);
    }
  };

  return { stats, summary, fetchStats, addStat };
});

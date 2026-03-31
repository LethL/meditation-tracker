<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import { useStatsStore } from '@/store/stats';
import { computed, onMounted } from 'vue';

const statsStore = useStatsStore();
const summary = computed(() => statsStore.summary);

onMounted(() => {
  if (!summary.value) {
    statsStore.fetchStats();
  }
});
</script>

<template>
  <AppHeader />
  <div class="stats-page">
    <div v-if="summary" class="stats-page__grid">
      <article class="stats-card stats-card--teal">
        <div class="stats-card__label">Минут медитации</div>
        <div class="stats-card__value">
          {{ summary.total_minutes }}
        </div>
      </article>

      <article class="stats-card stats-card--green">
        <div class="stats-card__label">Спокойных дней</div>
        <div class="stats-card__value">
          {{ summary.total_calm }}
        </div>
      </article>

      <article class="stats-card stats-card--blue">
        <div class="stats-card__label">Расслабленных дней</div>
        <div class="stats-card__value">
          {{ summary.total_relax }}
        </div>
      </article>

      <article class="stats-card stats-card--olive">
        <div class="stats-card__label">Фокусированных дней</div>
        <div class="stats-card__value">
          {{ summary.total_focus }}
        </div>
      </article>

      <article class="stats-card stats-card--red">
        <div class="stats-card__label">Тревожных дней</div>
        <div class="stats-card__value">
          {{ summary.total_anxiety }}
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.stats-page {
  padding: var(--space-8);
}

.stats-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-6);
  max-width: 960px;
  margin: 0 auto;
}

.stats-card {
  position: relative;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow-md);
}

.stats-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 0 100%, rgba(0, 0, 0, 0.35), transparent 60%),
    radial-gradient(circle at 100% 0, rgba(0, 0, 0, 0.2), transparent 55%);
  opacity: 0.9;
  mix-blend-mode: multiply;
}

.stats-card__label {
  position: relative;
  z-index: 1;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.stats-card__value {
  position: relative;
  z-index: 1;
  font-size: 2.5rem;
  font-weight: var(--font-bold);
  margin-top: var(--space-3);
}

.stats-card--teal {
  background: linear-gradient(145deg, #6bded0 0%, #1d6f6c 60%, #134141 100%);
}

.stats-card--green {
  background: linear-gradient(145deg, #9bd562 0%, #4d7b2b 55%, #2b3f1a 100%);
}

.stats-card--blue {
  background: linear-gradient(145deg, #69b5e9 0%, #2a5b86 55%, #172c3f 100%);
}

.stats-card--olive {
  background: linear-gradient(145deg, #c1cf6b 0%, #7b7c2b 55%, #3e3c15 100%);
}

.stats-card--red {
  background: linear-gradient(145deg, #e57373 0%, #a63232 55%, #4b1717 100%);
}

@media (max-width: 900px) {
  .stats-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .stats-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>

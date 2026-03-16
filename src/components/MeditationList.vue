<script setup lang="ts">
import { useMeditationsStore } from '@/store/Meditations'
import { formatDate } from '@/utils/formatDate'
import { onMounted } from 'vue'

const store = useMeditationsStore()

onMounted(() => {
  store.fetchMeditations()
})
</script>

<template>
  <ul class="meditation-list">
    <li v-for="meditation in store.meditations" :key="meditation.id" class="meditation-card">
      <div class="meditation-card__content">
        <h3 class="meditation-card__title">{{ meditation.title }}</h3>
        <p class="meditation-card__description">{{ meditation.description }}</p>
        <span class="meditation-card__date">{{ formatDate(meditation.created_at) }}</span>
      </div>

      <div class="meditation-card__footer">
        <button class="meditation-card__btn">
          Начать
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <span class="meditation-card__duration">{{ meditation.duration_min }} мин</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.meditation-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.meditation-card {
  background-color: #f2ede6;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.meditation-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

.meditation-card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: #1a2828;
}

.meditation-card__description {
  font-size: var(--text-sm);
  color: #4a5a5a;
  line-height: var(--leading-normal);
}

.meditation-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.meditation-card__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background-color: #1a2828;
  color: #f2ede6;
  border-radius: var(--radius-full);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  border: none;
  transition: background-color var(--transition-fast);
}

.meditation-card__btn:hover {
  background-color: #243535;
}

.meditation-card__date {
  font-size: var(--text-xs);
  color: #9aabab;
}

.meditation-card__duration {
  font-size: var(--text-sm);
  color: #7a8a8a;
  font-weight: var(--font-medium);
}
</style>

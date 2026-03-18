<script setup lang="ts">
import MeditationList from '@/components/MeditationList.vue'
</script>

<template>
  <div class="home">
    <aside class="home__sidebar">
      <div class="home__avatar">
        <img src="https://i.pravatar.cc/150?img=5" alt="Аватар" />
      </div>
      <h2 class="home__greeting">Добро пожаловать, Наталья!</h2>
      <p class="home__subtitle">Как вы сегодня себя чувствуете?</p>

      <div class="home__moods">
        <div class="mood">
          <div class="mood__icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
            </svg>
          </div>
          <span class="mood__label">Спокойно</span>
        </div>
        <div class="mood">
          <div class="mood__icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M4 12c0 4.42 3.58 8 8 8s8-3.58 8-8" />
              <path d="M12 4c-2 0-4 1-5.5 2.5" />
              <path d="M12 4c2 0 4 1 5.5 2.5" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span class="mood__label">Расслабленно</span>
        </div>
        <div class="mood">
          <div class="mood__icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
              />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <span class="mood__label">Фокусировано</span>
        </div>
        <div class="mood">
          <div class="mood__icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 15s1.5-2 4-2 4 2 4 2" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
            </svg>
          </div>
          <span class="mood__label">Тревожно</span>
        </div>
      </div>
    </aside>

    <main class="home__content">
      <MeditationList />
    </main>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  gap: var(--space-10);
  padding: var(--space-8);
}

.home__sidebar {
  flex-shrink: 0;
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.home__avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 3px solid var(--color-accent-muted);
}

.home__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home__greeting {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-top: var(--space-4);
}

.home__subtitle {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
}

.home__moods {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.mood {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.mood__icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background-color: var(--color-surface-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
}

.mood:hover .mood__icon {
  background-color: var(--color-accent-muted);
  color: var(--color-accent);
}

.mood__label {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.home__content {
  flex: 1;
}
</style>

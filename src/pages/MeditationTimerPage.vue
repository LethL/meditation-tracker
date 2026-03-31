<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import { useMeditationsStore } from '@/store/meditations';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const store = useMeditationsStore();
const route = useRoute();

const meditationId = computed(() => {
  const raw = route.params.id;
  const id =
    typeof raw === 'string' ? Number(raw) : Array.isArray(raw) ? Number(raw[0]) : Number(raw);
  return Number.isFinite(id) ? id : null;
});

const meditation = computed(() => {
  if (meditationId.value == null) return null;
  return store.meditations.find((m) => m.id === meditationId.value) ?? null;
});

const durationMin = computed(() => meditation.value?.duration_min ?? 0);
const durationSeconds = computed(() => durationMin.value * 60);

const secondsLeft = ref<number>(0);
const isRunning = ref(false);
const didFinish = ref(false);
let targetAtMs = 0;
let intervalId: number | null = null;

const pad2 = (n: number) => String(n).padStart(2, '0');

const formattedTime = computed(() => {
  const total = Math.max(0, secondsLeft.value);
  const mm = Math.floor(total / 60);
  const ss = total % 60;
  return `${pad2(mm)}:${pad2(ss)}`;
});

const clearTimer = () => {
  if (intervalId != null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
};

const finish = async () => {
  if (didFinish.value) return;
  didFinish.value = true;

  isRunning.value = false;
  clearTimer();
  secondsLeft.value = 0;

  if (durationMin.value > 0) {
    await store.addMeditationTime(durationMin.value);
  }
};

const start = () => {
  const totalSeconds = durationSeconds.value;
  if (totalSeconds <= 0) return;

  if (secondsLeft.value <= 0) secondsLeft.value = totalSeconds;

  didFinish.value = false;
  isRunning.value = true;
  clearTimer();

  targetAtMs = Date.now() + secondsLeft.value * 1000;
  intervalId = window.setInterval(() => {
    const diffMs = targetAtMs - Date.now();
    const next = Math.max(0, Math.ceil(diffMs / 1000));
    secondsLeft.value = next;
    if (next <= 0) void finish();
  }, 250);
};

const pause = () => {
  if (!isRunning.value) return;
  const diffMs = targetAtMs - Date.now();
  secondsLeft.value = Math.max(0, Math.ceil(diffMs / 1000));
  isRunning.value = false;
  clearTimer();
};

const reset = () => {
  isRunning.value = false;
  clearTimer();
  didFinish.value = false;
  secondsLeft.value = durationSeconds.value;
};

onMounted(async () => {
  if (store.meditations.length === 0) {
    await store.fetchMeditations();
  }
});

watch(
  () => durationSeconds.value,
  (newSeconds) => {
    clearTimer();
    isRunning.value = false;
    didFinish.value = false;
    secondsLeft.value = newSeconds;
  },
  { immediate: true },
);

onUnmounted(() => {
  clearTimer();
});
</script>

<template>
  <AppHeader />

  <div class="timer-page">
    <div class="timer-page__stage">
      <div class="timer-page__circle" aria-label="Таймер медитации">
        <div class="timer-page__time">
          {{ formattedTime }}
        </div>
      </div>

      <div class="timer-page__details">
        <h2 class="timer-page__title">{{ meditation?.title || 'Медитация' }}</h2>
        <p class="timer-page__subtitle">
          {{ meditation?.description || 'Выберите комфортный темп и дышите спокойно.' }}
        </p>
      </div>

      <div class="timer-page__controls">
        <button
          class="btn btn-primary"
          :disabled="durationSeconds === 0"
          @click="isRunning ? pause() : start()"
        >
          {{ isRunning ? 'Пауза' : 'Старт' }}
        </button>
        <button class="btn btn-ghost" :disabled="durationSeconds === 0" @click="reset">
          Сброс
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timer-page {
  display: flex;
  justify-content: center;
  padding: var(--space-12);
}

.timer-page__stage {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
}

.timer-page__circle {
  width: 360px;
  height: 360px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-accent);

  /* "Картинка" сделана градиентом */
  background:
    radial-gradient(circle at 30% 25%, rgba(78, 207, 191, 0.55), rgba(78, 207, 191, 0) 55%),
    radial-gradient(circle at 70% 75%, rgba(78, 207, 191, 0.22), rgba(78, 207, 191, 0) 60%),
    linear-gradient(145deg, #63e0d1 0%, #2f7471 45%, #143636 100%);

  position: relative;
  overflow: hidden;
}

.timer-page__circle::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.35) 100%),
    radial-gradient(circle at 50% 115%, rgba(25, 38, 38, 0.9), rgba(25, 38, 38, 0) 55%);
  pointer-events: none;
}

.timer-page__time {
  position: relative;
  z-index: 1;
  font-size: 3.25rem;
  font-weight: var(--font-bold);
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.95);
}

.timer-page__details {
  text-align: center;
}

.timer-page__title {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-2);
}

.timer-page__subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  max-width: 520px;
}

.timer-page__controls {
  display: flex;
  gap: var(--space-4);
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

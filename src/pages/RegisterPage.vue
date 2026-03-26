<script setup lang="ts">
import TextInput from '@/components/TextInput.vue';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const form = ref({
  username: '',
  email: '',
  password: '',
});

const authStore = useAuthStore();
const router = useRouter();
const onSubmit = async () => {
  if (!form.value.username || !form.value.email || !form.value.password) {
    return;
  }

  try {
    await authStore.register(form.value.username, form.value.email, form.value.password);
    router.push({ name: 'login' });
  } catch (error) {
    console.error('Error registering user:', error);
  }
};
</script>

<template>
  <div class="auth">
    <div class="auth__overlay">
      <div class="auth__card">
        <div class="auth__logo" aria-hidden="true">
          <svg
            width="90"
            height="90"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M32 4c-9 7-14 16-14 26 0 11 7 20 14 20s14-9 14-20C46 20 41 11 32 4z" />
            <path d="M22 30c4 4 8 6 10 6s6-2 10-6" />
            <path d="M18 46c-1 8 7 14 14 14s15-6 14-14" />
            <path d="M32 8v6" />
            <path d="M22 12l4 4" />
            <path d="M42 12l-4 4" />
          </svg>
        </div>

        <form class="auth__form" @submit.prevent="onSubmit">
          <TextInput
            v-model="form.username"
            type="text"
            class="auth__input"
            placeholder="Имя пользователя"
            autocomplete="username"
          />
          <TextInput
            v-model="form.email"
            type="email"
            class="auth__input"
            placeholder="Электронная почта"
            autocomplete="email"
          />
          <TextInput
            v-model="form.password"
            type="password"
            class="auth__input"
            placeholder="Пароль"
            autocomplete="new-password"
          />

          <button
            type="submit"
            class="btn btn-primary auth__submit"
            :disabled="!form.username || !form.email || !form.password"
          >
            Создать аккаунт
          </button>

          <div class="auth__footer">
            <span class="auth__muted">Уже есть аккаунт?</span>
            <RouterLink to="/login" class="auth__link">Войти</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(
      180deg,
      rgba(78, 207, 191, 0.18) 0%,
      rgba(25, 38, 38, 0.92) 55%,
      rgba(25, 38, 38, 1) 100%
    ),
    linear-gradient(135deg, rgba(110, 190, 170, 0.22) 0%, rgba(25, 38, 38, 0) 45%);
}

.auth__overlay {
  width: 100%;
  min-height: 100vh;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
}

.auth__card {
  width: 440px;
  max-width: 100%;
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: rgba(25, 38, 38, 0.55);
  box-shadow: var(--shadow-lg);
}

.auth__logo {
  color: var(--color-accent);
  margin: 0 auto var(--space-6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.auth__submit {
  width: 100%;
  justify-content: center;
}

.auth__error {
  color: rgba(255, 255, 255, 0.75);
  font-size: var(--text-sm);
}

.auth__footer {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: var(--space-2);
}

.auth__muted {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.auth__link {
  color: var(--color-accent);
  font-size: var(--text-sm);
}
</style>

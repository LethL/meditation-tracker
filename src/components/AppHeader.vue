<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <svg
        width="48"
        height="48"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <circle cx="32" cy="20" r="8" />
        <path d="M20 52c0-8 5-14 12-14s12 6 12 14" />
        <path d="M16 32c-4 4-6 10-6 16" />
        <path d="M48 32c4 4 6 10 6 16" />
        <path d="M24 16c-2-4-2-8 0-12" />
        <path d="M32 14c0-4 0-8 0-12" />
        <path d="M40 16c2-4 2-8 0-12" />
      </svg>
    </div>

    <nav class="header__nav">
      <RouterLink to="/" class="header__nav-item" active-class="active" :exact="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        <span>Медитация</span>
      </RouterLink>

      <RouterLink to="/stats" class="header__nav-item" active-class="active">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        <span>Статистика</span>
      </RouterLink>

      <button class="header__nav-item">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span>Выход</span>
      </button>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-8);
  height: var(--nav-height);
}

.header__logo {
  color: var(--color-text-primary);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 0;
}

.header__nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-8);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  border: none;
  background: none;
  cursor: pointer;
  transition: color var(--transition-fast);
  border-left: 1px solid var(--color-border);
  text-decoration: none;
}

.header__nav-item:first-child {
  border-left: none;
}

.header__nav-item:hover,
.header__nav-item.active {
  color: var(--color-text-primary);
}
</style>

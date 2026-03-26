<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <input class="text-input" v-model="model" />
</template>

<style scoped>
.text-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: rgba(0, 0, 0, 0.15);
  color: var(--color-text-primary);
  outline: none;
  font-family: inherit;
  font-size: var(--text-base);
}

.text-input::placeholder {
  color: var(--color-text-secondary);
}
</style>

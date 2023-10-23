<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style>
.error-page {
  margin-bottom: 6rem;
  display: grid;
  gap: 1rem;
  justify-content: center;
}

.error-page a {
  color: var(--color-primary);
  font-size: 1.25rem;
}
</style>

<template>
  <app-layout>
    <div class="error-page">
      <h1>Pagina niet gevonden</h1>
      <nuxt-link to="/">Klik hier voor de homepage</nuxt-link>
    </div>
  </app-layout>
</template>
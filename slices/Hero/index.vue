<script setup lang="ts">
import { Content } from "@prismicio/client";

const prismic = usePrismic();

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<style scoped>
.slice-hero {
  padding-top: 12rem;
}

.slice-hero-inner {
  display: grid;
  place-items: center;
}

.slice-hero-img,
.slice-hero-content {
  grid-row: 1;
  grid-column: 1;
}

.slice-hero-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  padding: 1rem;
}

.slice-hero-content h1,
.slice-hero-content h2 {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: #000 3px 3px 1px;
}

.slice-hero-content h1 {
  font-size: 3.5rem;
}
</style>

<template>
  <section class="slice-hero" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="slice-hero-inner">
      <div class="slice-hero-img">
        <img-ix :field="slice.primary.image" loading="eager" priority="high"></img-ix>  
      </div>
      <div class="slice-hero-content">
        <h1>Rijschool Gorredijk</h1>
        <h2>{{ slice.primary.heading }}</h2>
        <nuxt-link to="/contact/" class="button">Neem direct contact op</nuxt-link>
      </div>
    </div>
  </section>
</template>

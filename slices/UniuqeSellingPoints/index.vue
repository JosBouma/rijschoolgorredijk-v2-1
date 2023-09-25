<script setup lang="ts">
import { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.UniuqeSellingPointsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<style>
.unique-selling-points {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem 2rem;
  font-size: 1.25rem;
  max-width: 100rem;
  margin: 6rem auto;
  list-style: none;
  padding: 0;
}

.unique-selling-points li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1%;
  background: var(--color-secondary);
  text-align: center;
}

.unique-selling-points li svg {
  color: var(--color-primary);
  border: 0.5rem solid #fff;
}
</style>

<template>
  <ul class="unique-selling-points">
    <li v-for="usp in slice.items">
      <svgo-checkmark></svgo-checkmark>
      <div><prismic-rich-text :field="usp.selling_point"></prismic-rich-text></div>
    </li>
  </ul>
</template>

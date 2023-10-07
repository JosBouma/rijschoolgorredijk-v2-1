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
  background: var(--color-tertiary);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 4rem;
  font-size: 1.25rem;
  list-style: none;
  padding: 2rem 0;
}

.unique-selling-points li {
  display: flex;
  align-items: center;
  column-gap: 1rem;
  text-align: center;
}

.unique-selling-points li svg {
  color: var(--color-primary);
  border: 0.5rem solid #fff;
}

.unique-selling-points li div {
  border-bottom: 1px solid #c3c3c3;
  text-shadow: 3px 2px 5px #d1ceff;
}
</style>

<template>
  <ul class="unique-selling-points">
    <li v-for="usp in slice.items">
      <svgo-checkmark></svgo-checkmark>
      <prismic-rich-text :field="usp.selling_point"></prismic-rich-text>
    </li>
  </ul>
</template>

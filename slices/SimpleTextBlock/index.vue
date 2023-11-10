<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.SimpleTextBlockSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<style>
.simple-text-block {
  max-width: 40rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.simple-text-block > div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto 4rem auto;
}
</style>

<template>
  <section class="simple-text-block">
    <prismic-rich-text :field="slice.primary.content"></prismic-rich-text>
  </section>
</template>

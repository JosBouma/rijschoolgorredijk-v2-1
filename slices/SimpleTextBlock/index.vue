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
.user-rte h1,
.user-rte h2,
.user-rte h3 {
  line-height: 1.15;
  color: #25283c;
}

.user-rte h1 {
  font-size: 2.5rem;
}

.user-rte h2 {
  font-size: 1.75rem;
}

.user-rte h3 {
  font-size: 1.5rem;
}

.user-rte ul {
  margin: 2rem 0;
}

.user-rte li {
  line-height: 1.5;
  padding-left: 1rem;
  margin-left: 2rem;
  list-style: disc;
  font-size: 1.23rem;
}
</style>

<template>
  <div class="user-rte pt-12 pb-16">
    <div class="bg-white py-16 px-2 lg:px-12 w-fit max-w-6xl mx-auto rounded-3xl">
      <prismic-rich-text class="grid gap-4" :field="slice.primary.content" />
    </div>
  </div>
</template>

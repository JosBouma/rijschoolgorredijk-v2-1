<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const { slice } = defineProps(
  getSliceComponentProps<Content.GoogleRatingSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const ratings = computed(() => {
  const rounded = Math.ceil(slice.primary.rating || 0);
  return Array.from({ length: 5 }, (_, i) => (i < rounded ? 1 : 0));
});
</script>

<style>
.google-rating .stars>span>span {
  display: block;
  width: 4rem;
  height: 4rem;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  background-image: linear-gradient(0.25turn, rgb(250, 250, 250) 50%, rgb(233, 195, 29) 50%);
  background-size: 200%;
  --offset: calc((var(--bg-size, 0) * 100));
  background-position: calc(var(--offset) * -1%);
}
</style>

<template>
  <div class="google-rating bg-slate-800 text-white py-12 px-4 text-center mx-4 rounded-xl">
    <div class="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr_auto] items-center gap-4">
      <h2 class="text-green-300 drop-shadow-lg text-2xl p-4">{{ slice.primary.heading }}</h2>
      <div class="stars flex flex-wrap justify-around mx-auto">
        <span v-for="val in ratings" :style="{ '--bg-size': val }">
          <span></span>
        </span>
      </div>
      <div class="grid justify-center">
        <p class="text-xl text-green-500">{{ slice.primary.rating }}</p>
        <p class="count flex items-center gap-2">Aantal beoordelingen: <span class="text-xl text-green-500 font-bold">{{ slice.primary.review_amount || 'Tijdelijk niet beschikbaar' }}</span></p>
        <p class="text">{{ slice.primary.subtext }}</p>
      </div>
    </div>
  </div>
</template>

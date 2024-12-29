<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.GoogleRatingSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

function ratingArray(value: number, len: number = 5): number[] {
  const result = [];

  for (let i = 0; i < len; i++) {
    if (value >= 1) {
      result.push(1);
      value -= 1;
    } else if (value > 0) {
      result.push(parseFloat(value.toFixed(2))); // Round to two decimal places
      value = 0;
    } else {
      result.push(0);
    }
  }

  return result;
}

const ratings = computed(() => {
  return ratingArray(5);
});
</script>

<style>
.google-rating .stars>span>span {
  display: block;
  width: 4rem;
  height: 4rem;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  background-image: linear-gradient(0.25turn, rgb(250, 250, 250) 50%, rgb(225, 194, 55) 50%);
  background-size: 200%;
  --offset: calc((var(--bg-size, 0) * 100));
  background-position: calc(var(--offset) * -1%);
}
</style>

<template>
  <div class="google-rating bg-slate-800 text-white py-8">
    <div class="max-w-5xl mx-auto grid grid-cols-[auto_1fr_auto] items-center">
      <h2 class="text-green-500 text-2xl">{{ slice.primary.heading }}</h2>
      <div class="stars flex justify-around">
        <span class="shadow-lg drop-shadow-lg" v-for="val in ratings" :style="{ '--bg-size': val }">
          <span></span>
        </span>
      </div>
      <div class="subtext">
        <p class="count">Aantal beoordelingen: <span class="text-xl text-green-500 font-bold">{{ slice.primary.review_amount || 'Tijdelijk niet beschikbaar' }}</span></p>
        <p class="text">{{ slice.primary.subtext }}</p>
      </div>
    </div>
  </div>
</template>

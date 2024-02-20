<script setup lang="ts">
import { type Content } from "@prismicio/client";

interface RatingResult {
  result: {
    rating: number;
    user_ratings_total: number;
  }
}

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

const { data } = await useFetch<RatingResult>('/api/googlerating');

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
  return ratingArray(data.value?.result?.rating as number);
});
</script>

<style>
.google-rating {
  position: relative;
  z-index: -1;
  background: #fbfbfb;
  margin-bottom: 6rem;
  padding: 4rem 0;
  box-shadow: 0 -3px 8px #c4c4c4;
}

.google-rating .container {
  width: fit-content;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: #0f9d58;
}

.google-rating .stars {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.google-rating .stars>span {
  filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
}

.google-rating .stars>span>span {
  display: block;
  width: 4rem;
  height: 4rem;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  background-image: linear-gradient(0.25turn, rgb(250, 250, 250) 50%, rgb(255, 255, 47) 50%);
  background-size: 200%;
  --offset: calc((var(--bg-size, 0) * 100));
  background-position: calc(var(--offset) * -1%);
}

.google-rating .subtext {
  margin-top: auto;
}

.google-rating .subtext .count {
  font-size: 0.75rem;
}
</style>

<template>
  <section class="google-rating">
    <!-- <div class="container">
      <h2>{{ slice.primary.heading }}</h2>
      <div class="stars">
        <span v-for="val in ratings" :style="{ '--bg-size': val }">
          <span></span>
        </span>
      </div>
      <div class="subtext">
        <p class="count">Aantal beoordelingen: {{ data?.result?.user_ratings_total || 'Tijdelijk niet beschikbaar' }}</p>
        <p class="text">{{ slice.primary.subtext }}</p>
      </div>
    </div> -->
  </section>
</template>

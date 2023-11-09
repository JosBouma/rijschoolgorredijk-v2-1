<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.GridThreeColumnsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<style>
.grid-three-columns {
  max-width: 100rem;
  margin: 0 auto 6rem auto;
}

.grid-three-columns .grid {
  display: grid;
  grid-template-columns: auto 1fr 2fr;
  gap: 2rem;
  margin: 0 1rem;
}

.grid-three-columns .grid > h2,
.grid-three-columns .grid .content {
  margin-top: 2rem;
}

.grid-three-columns .grid > h2,
.grid-three-columns .grid > h2 * {
  font-size: 2rem;
}

.grid-three-columns .grid .content p {
  margin-bottom: 1rem;
}

.grid-three-columns.textMiddle .grid {
  grid-template-columns: auto 1fr auto;
}

.grid-three-columns.textMiddle .grid>img {
  grid-column: 3;
  grid-row: 1;
}

@media screen and (max-width: 70rem) {
  .grid-three-columns .grid {
    grid-template-columns: none;
  }
}
</style>

<template>
  <section class="grid-three-columns" :class="slice.variation">
    <div class="grid">
      <h2><prismic-rich-text :field="slice.primary.heading"></prismic-rich-text></h2>
      <img-ix v-if="slice.primary.image.url" :field="slice.primary.image"></img-ix>
      <div class="content">
        <prismic-rich-text :field="slice.primary.content"></prismic-rich-text>
      </div>
    </div>
  </section>
</template>

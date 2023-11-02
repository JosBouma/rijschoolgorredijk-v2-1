<script setup lang="ts">
import { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.UsefulLinksSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<style>
.useful-links {
  background: #fbfbfb;
  margin-bottom: 6rem;
  padding: 4rem 0;
  box-shadow: 0 -3px 8px #c4c4c4;
}

.useful-links .container {
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.useful-links .container h2 {
  margin-bottom: 2rem;
}

.useful-links .container .links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 2rem;
  overflow: hidden;
}

.useful-links .container .links a {
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 1rem;
  align-items: center;
  font-size: 2.5rem;
  text-decoration: none;
  color: var(--color-primary);
  transition: transform 0.2s ease-in;
  transform-origin: left center;
  will-change: transform;
}

.useful-links .container .links a:hover {
  transform: scale(1.1);
}

.useful-links .container .links a svg {
  margin-top: 0.5rem;
  width: 30px;
  height: 30px;
}

.useful-links .container .links a p {
  font-size: 1.5rem;
}

@media screen and (max-width: 40rem) {
  .useful-links .container .links {
    grid-template-columns: none;
  }
}
</style>

<template>
  <section class="useful-links">
    <div class="container">
      <h2>{{ slice.primary.heading }}</h2>
      <div class="links">
        <div v-for="item in slice.items">
          <nuxt-link :to="$prismic.asLink(item.link)">
            <svgo-link></svgo-link>
            <prismic-rich-text :field="item.content"></prismic-rich-text>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

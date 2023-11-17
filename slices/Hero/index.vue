<script setup lang="ts">
import { type Content } from "@prismicio/client";

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

let timer: number = 0;
let current = ref(0);

onMounted(() => {
  const items = document.querySelectorAll('.slice-hero-slider>div');
  if(!items.length) return;
  items[0].classList.add('active');
  if(items.length === 1) return;
  timer = window.setInterval(() => {
    items[current.value].classList.remove('active');
    current.value = current.value === (items.length - 1) ? 0 : current.value + 1;
    items[current.value].classList.add('active');
    // console.log(current.value);
  }, 8000);
});

onBeforeUnmount(() => {
  window.clearInterval(timer);
});
</script>

<style scoped>
.slice-hero {
  position: relative;
  margin-bottom: 6rem;
}

.slice-hero-inner {
  display: grid;
  place-items: center;
}

.slice-hero-slider,
.slice-hero-content {
  grid-row: 1;
  grid-column: 1;
}

.slice-hero-slider {
  display: grid;
}

.slice-hero-slider>div {
  position: relative;
  z-index: -3;
  display: grid;
  grid-row: 1;
  grid-column: 1;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  will-change: opacity;
}

.slice-hero-slider>div:first-child {
  opacity: 1;
}

.slice-hero-slider>div.active {
  opacity: 1;
}

.slice-hero-slider>div>img {
  margin: auto;
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

@media screen and (max-width: 60rem) {
  .slice-hero-content {
    grid-row: 2;
    background: #fbfbfb;
  }

  .slice-hero-content h1,
  .slice-hero-content h2 {
    color: var(--color-primary);
    text-shadow: none;
  }
}
</style>

<template>
  <section class="slice-hero" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="slice-hero-inner">
      <div class="slice-hero-slider inactive">
        <div v-for="item in slice.items">
          <img-ix v-if="item.image.url" :field="item.image" loading="eager" priority="high"></img-ix>
        </div>
      </div>
      <div class="slice-hero-content">
        <h1 v-if="slice.primary.heading_1">{{ slice.primary.heading_1 }}</h1>
        <h2 v-if="slice.primary.heading_2">{{ slice.primary.heading_2 }}</h2>
        <nuxt-link v-if="slice.primary.cta_link.url" :to="$prismic.asLink(slice.primary.cta_link)" class="button">{{ slice.primary.cta_text }}</nuxt-link>
      </div>
    </div>
  </section>
</template>

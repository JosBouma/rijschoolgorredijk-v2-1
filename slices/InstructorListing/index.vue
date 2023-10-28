<script setup lang="ts">
import { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.InstructorListingSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<style>
.instructor-listing {
  background: var(--color-primary);
  padding: 2rem 0;
  margin-bottom: 6rem;
}

.instructor-listing .inner {
  max-width: 100rem;
  padding: 0 1rem;
  margin: 0 auto 0 auto;
}

.instructor-listing .inner h2 {
  font-size: 2rem;
  color: #fff;
}

.instructor-listing .items {
  display: flex;
  column-gap: 4rem;
  margin: 2rem 0;
}

.instructor-listing .item {
  display: grid;
  text-align: center;
  background: #fff;
  padding: 1rem;
}

.instructor-listing .item img {
  border-radius: 50%;
  border: 1px solid #000;
  margin: 0 auto 2rem auto;
  box-shadow: 14px 3px 0 #e3e3e3;
}

@media screen and (max-width: 30rem) {
  .instructor-listing .items {
    padding: 0 1rem;
    display: grid;
    gap: 4rem;
  }
}
</style>

<template>
  <section class="instructor-listing">
    <div class="inner">
      <h2>Onze instructeurs</h2>
      <div class="items">
        <div v-for="item in slice.items" class="item">
          <img-ix :field="item.image"></img-ix>
          <h3>{{ item.name }}</h3>
          <prismic-rich-text :field="item.description"></prismic-rich-text>
        </div>
      </div>
    </div>
  </section>
</template>

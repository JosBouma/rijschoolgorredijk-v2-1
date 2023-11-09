<script setup lang="ts">
import { type Content } from "@prismicio/client";

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
  max-width: 60rem;
  padding: 0 1rem;
  margin: 0 auto 0 auto;
}

.instructor-listing .inner h2 {
  font-size: 2rem;
  color: #fff;
}

.instructor-listing .items {
  display: flex;
  gap: 4rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.instructor-listing .item {
  display: grid;
  grid-template-columns: auto 1fr;
  background: #fff;
  padding: 4rem;
  border-radius: 1rem;
  filter: drop-shadow(10px, 10px, 10px, #000);
  column-gap: 3rem;
  align-items: center;
}

.instructor-listing .item img {
  border-radius: 20%;
  box-shadow: 14px 13px 24px #939393;
}

.instructor-listing .item h3 {
  color: var(--color-primary);
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.instructor-listing .item .rte {
  display: grid;
  row-gap: 1rem;
}

@media screen and (max-width: 60rem) {
  .instructor-listing .item {
    grid-template-columns: none;
    padding: 4rem 2rem;
  }

  .instructor-listing .item img {
    display: block;
    margin: 0 auto 4rem auto;
  }

  .instructor-listing .item .rte {
    margin: 0 1rem;
  }
}
</style>

<template>
  <section class="instructor-listing">
    <div class="inner">
      <h2>Onze instructeurs</h2>
      <div class="items">
        <div v-for="item in slice.items" class="item">
          <div>
            <h3>{{ item.name }}</h3>
            <img-ix :field="item.image"></img-ix>
          </div>
          <prismic-rich-text class="rte" :field="item.description"></prismic-rich-text>
        </div>
      </div>
    </div>
  </section>
</template>

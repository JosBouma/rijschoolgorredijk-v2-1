<script setup lang="ts">
import { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ServicePricingSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

function formatCurrenycy(val: any): string {
  const amount = parseFloat(val);
  if(amount === Math.round(amount)) {
    return `${amount},-`;
  }
  return val.toFixed(2).replace('.', ',');
}
</script>

<style>
.service-pricing {
  margin-bottom: 6rem;
}

.service-pricing .container {
  max-width: 70rem;
  padding: 0 1rem;
  margin: 0 auto;
  display: grid;
  gap: 4rem;
}

.service-pricing .container .prices {
  display: grid;
  grid-template-columns: 1fr auto;
  margin: 0 6vw;
  row-gap: 1rem;
  align-items: end;
}

.service-pricing .container .prices > span {
  border-bottom: 3px solid #000;
  padding: 1rem 0;
}

.service-pricing .container .prices > .content {
  display: grid;
  grid-template-columns: 1fr 20fr;
  border-bottom: 3px solid var(--color-primary);
}

.service-pricing .container .prices > .content p {
  font-weight: 500;
  padding: 1rem 0;
}

.service-pricing .container .prices > .content svg {
  color: var(--color-primary);
  margin-top: 1.3rem;
}

.service-pricing .container .bottom .footnote {
  margin-bottom: 2rem;
}

.service-pricing .container .bottom .footnote p {
  font-size: 0.8rem;
  max-width: 40rem;
  margin: 0 auto;
}

.service-pricing .container .bottom .content {
  max-width: 50rem;
  margin: 0 auto;;
}

.service-pricing .container .bottom .content h3 {
  margin-bottom: 2rem;
}

.service-pricing .container .bottom .content p {
  margin-bottom: 1rem;
}
</style>

<template>
  <section class="service-pricing">
    <div class="container">
      <h1>{{ slice.primary.heading }}</h1>
      <div class="prices">
        <template v-for="item in slice.items">
          <div class="content">
            <svgo-chevron></svgo-chevron>
            <prismic-rich-text :field="item.content"></prismic-rich-text>
          </div>
          <span>&nbsp;€ {{ formatCurrenycy(item.price) }}</span>
        </template>
      </div>
      <div class="bottom">
        <prismic-rich-text :field="slice.primary.footnote" class="footnote"></prismic-rich-text>
        <div class="content">
          <prismic-rich-text :field="slice.primary.content"></prismic-rich-text>
        </div>
      </div>
    </div>
  </section>
</template>

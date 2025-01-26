<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.UniuqeSellingPointsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <div class="py-16 px-4">
    <ul class="flex gap-8 flex-wrap lg:justify-center bg-slate-300 text-slate-900 py-12">
      <li class="flex items-center gap-2" v-for="usp in slice.items">
        <svgo-checkmark class="w-12 h-12 text-2xl md:text-3xl text-slate-900" :fontControlled="false" />
        <prismic-rich-text class="shadow-md border-b-2 border-slate-400 xl:text-xl pb-2" :field="usp.selling_point" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

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

// let timer: number = 0;
// let current = ref(0);

// onMounted(() => {
//   const items = document.querySelectorAll('.slice-hero-slider>div');
//   if(!items.length) return;
//   items[0].classList.add('active');
//   if(items.length === 1) return;
//   timer = window.setInterval(() => {
//     items[current.value].classList.remove('active');
//     current.value = current.value === (items.length - 1) ? 0 : current.value + 1;
//     items[current.value].classList.add('active');
//     // console.log(current.value);
//   }, 8000);
// });

// onBeforeUnmount(() => {
//   window.clearInterval(timer);
// });
</script>


<template>
  <div class="flex justify-center flex-wrap mb-8 lg:gap-8">
    <div class="p-8 lg:w-1/3">
      <h1 class="text-4xl font-bold text-shade-1 mb-8 drop-shadow-lg">{{ slice.primary.heading_1 }}</h1>
      <div class="bg-slate-600 px-4 py-8">
        <h2 class="text-2xl text-white mb-8">{{ slice.primary.heading_2 }}</h2>
        <nuxt-link class="bg-shade-1 inline-block text-center text-2xl text-white p-4">{{ slice.primary.cta_text }}</nuxt-link>
      </div>
    </div>
    <div class="grid">
      <div class="col-start-1 row-start-1" v-for="item in slice.items">
        <nuxt-img
          class="rounded-lg"
          :src="item.image.url || ''"
          width="844"
          height="770"
          fit="contain"
        />
      </div>
    </div>
  </div>
</template>

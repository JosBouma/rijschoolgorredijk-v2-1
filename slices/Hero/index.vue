<script setup lang="ts">
import { type Content, asLink } from "@prismicio/client";

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

const timer = ref(0);
const current = ref(0);
const parent = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if(!parent.value) {
    return console.error('Missing parent');
  }
  const items = parent.value?.querySelectorAll(':scope>div');
  if(items.length < 1) return;
  window.setTimeout((() => current.value++), 1000);
  timer.value = window.setInterval(() => {
    current.value = current.value === (items.length - 1) ? 0 : current.value + 1;
  }, 10000);
});

onBeforeUnmount(() => {
  window.clearInterval(timer.value);
});
</script>


<template>
  <div class="mx-auto max-w-[100rem] flex flex-wrap justify-center py-16 2xl:gap-8">
    <div class="p-8 max-w-[40rem]">
      <h1 class="text-4xl font-bold text-shade-1 mb-8 drop-shadow-lg">{{ slice.primary.heading_1 }}</h1>
      <div class="px-4 py-8 lg:px-12">
        <h2 v-if="slice.primary.heading_2" class="text-2xl mb-8">{{ slice.primary.heading_2 }}</h2>
        <nuxt-link :to="asLink(slice.primary.cta_link) || '#unresolved'" class="bg-shade-1 inline-block text-center text-2xl text-white p-4 lg:px-12 rounded-lg">{{ slice.primary.cta_text }}</nuxt-link>
      </div>
    </div>
    <div class="grid overflow-hidden" ref="parent">
      <div class="col-start-1 row-start-1 transition-all duration-[3s]" v-for="(item, idx) in slice.items" :class="{ '-translate-x-[20vw] -translate-y-40 opacity-0': current !== idx }">
        <nuxt-img
          class="rounded-3xl max-w-2xl 2xl:max-w-none"
          :src="item.image.url || ''"
          width="844"
          height="770"
          fit="contain"
        />
        <p>{{ current }}</p>
      </div>
    </div>
  </div>
</template>

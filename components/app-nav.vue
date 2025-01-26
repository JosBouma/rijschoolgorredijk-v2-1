<script lang="ts" setup>
const data = await $fetch('/api/menu');
const root = ref<HTMLDivElement | null>(null);
const observer = ref<ResizeObserver | null>(null);
const open = ref(false);
const route = useRoute();

function setMenuHeight(height: number) {
  window.requestAnimationFrame(
    () => root.value!.style.setProperty('--menu-height', `${height}px`)
  );
}

onMounted(() => {
  const nav = root.value?.querySelector('nav');
  if (!nav) {
    return;
  }
  setMenuHeight(nav.getBoundingClientRect().height || 96);
  observer.value = new ResizeObserver((entries) => {
    setMenuHeight(entries[0].borderBoxSize[0].blockSize);
  });
  observer.value.observe(nav);
});

onUnmounted(() => observer.value?.disconnect());

const menu = computed(() => {
  let uid = route.params.uid ?? 'index';
  return data?.data.items.map(item => {
    const url = 'index' === item.link?.uid ? '/' : `/${item.link?.uid}/`;
    return {
      text: item.text,
      url,
      isCurrent: uid === item.link?.uid
    };
  });
});
</script>

<template>
  <div ref="root">
    <div class="h-[--menu-height] mb-8"></div>
    <nav class="fixed z-10 top-0 left-0 bg-white w-full shadow-md">
      <div class="relative flex items-center p-4 lg:justify-around w-fit mx-auto">
        <nuxt-link class="pr-8" to="/" @click="open = false">
          <svgo-logo-v2 aria-hidden="true" :fontControlled="false" :filled="true" class="w-48 lg:w-64" />
          <span class="sr-only">Home</span>
        </nuxt-link>
        <button @click="open = !open" class="h-6 w-8 grid ml-auto lg:hidden" aria-controls="main-menu" :aria-expanded="open">
          <div class="bg-slate-500 w-full my-auto h-[4px]"></div>
          <div class="bg-slate-500 w-full my-auto h-[4px]"></div>
          <div class="bg-slate-500 w-full my-auto h-[4px]"></div>
          <span class="sr-only">Open menu</span>
        </button>
        <ul id="main-menu"
          :class="{ hidden: !open }"
          class="bg-gray-100 absolute z-10 lg:relative left-0 px-4 w-full lg:w-auto top-[--menu-height] lg:top-auto flex lg:flex flex-col lg:flex-row md:flex-wrap gap-8">
          <li v-for="item in menu">
            <nuxt-link @click="open = false" :class="item.isCurrent ? 'decoration-shade-1' : 'decoration-gray-100'" class="inline-block underline py-4" :to="item.url || '#'">{{ item.text }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="absolute -bottom-10 lg:-bottom-6 w-full flex justify-center gap-2 lg:gap-12">
        <nuxt-link :class="{ hidden: open }" class="bg-gray-600 flex items-center gap-2 py-2 px-4 text-white rounded-md" to="tel:+0031633418680">
          <svgo-phone aria-hidden="true" class="text-shade-3 hidden lg:block"></svgo-phone>
          <span>Bel ons</span>
        </nuxt-link>
        <nuxt-link :class="{ hidden: open }" class="bg-gray-600 flex items-center gap-2 p-2 text-white rounded-md" to="mailto:info@rijschoolgorredijk.nl">
          <svgo-envelope aria-hidden="true" class="text-shade-3 hidden lg:block"></svgo-envelope>
          <span>E-mail</span>
        </nuxt-link>
        <nuxt-link :class="{ hidden: open }" class="bg-gray-600 flex items-center gap-2 p-2 text-white rounded-md" to="https://www.startmetjerijbewijs.nl/rijschool-gorredijk/inschrijven">
          <svgo-user aria-hidden="true" class="text-shade-3 hidden lg:block"></svgo-user>
          <span>Inschrijven</span>
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>
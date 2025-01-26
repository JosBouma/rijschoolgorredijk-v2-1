<script lang="ts" setup>
import { components } from '~/slices';
import type { Content } from "@prismicio/client";
const { params } = useRoute();
const uid = encodeURIComponent(params.uid as string);

const { data: page } = await useFetch<Content.PageDocument>(
  `/api/page/${uid}`
);

// const prismic = usePrismic();
// const { params } = useRoute();

// const response = await useAsyncData(params.uid as string, () => 
//     prismic.client.getByUID('page', params.uid as string, {
//     fetchLinks: [
//       'questionanswer.items'
//     ]
//   })
// );

// const { data: page } = response;

// if(!page) {
//     console.error('Pagina niet gevonden');
//     throw createError({
//         message: 'Pagina niet gevonden',
//         statusCode: 404,
//         fatal: true
//     });
// }

// useSeoMeta({
//   title: page.value?.data.meta_title,
//   description: page.value?.data.meta_title,
// });
</script>

<template>
    <app-layout>
      <SliceZone wrapper="main" :slices="page?.data.slices ?? []" :components="components" />
    </app-layout>
  </template>
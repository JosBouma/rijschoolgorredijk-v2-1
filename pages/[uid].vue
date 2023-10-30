<script lang="ts" setup>
import { components } from '~/slices';

const prismic = usePrismic();
const { params } = useRoute();

const response = await useAsyncData(params.uid as string, () => 
    prismic.client.getByUID('page', params.uid as string, {
    fetchLinks: [
      'questionanswer.items'
    ]
  })
);

const { data: page } = response;

if(!page) {
    console.error('Pagina niet gevonden');
    throw createError({
        message: 'Pagina niet gevonden',
        statusCode: 404,
        fatal: true
    });
}

useSeoMeta({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_title,
});
</script>

<template>
    <app-layout>
      <SliceZone wrapper="main" :slices="page?.data.slices ?? []" :components="components" />
      <!-- <dev-only>
        <p>Route name: {{ params.uid }}</p>
        <pre class="debug">{{ response }}</pre>
      </dev-only> -->
    </app-layout>
  </template>
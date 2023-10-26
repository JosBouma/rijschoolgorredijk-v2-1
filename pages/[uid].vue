<script lang="ts" setup>
import { components } from '~/slices';
import { Content } from "@prismicio/client";

const prismic = usePrismic();
const route = useRoute();
const response = await useAsyncData(route.params.uid as string, () => 
    prismic.client.getAllByType('page', {
    fetchLinks: [
      'questionanswer.items'
    ]
  })
);

const pages = response.data as Ref<Content.PageDocument<string>[]>
let page: Content.PageDocument<string> | null = null;

for(let i = 0; i < pages.value.length; i++) {
    if(pages.value[i].uid === route.params.uid) {
        page = pages.value[i];
    }
}

if(!page) {
    console.error('Pagina niet gevonden')
    throw createError({
        message: 'Pagina niet gevonden',
        statusCode: 404,
        fatal: true
    })
}
</script>

<template>
    <app-layout>
      <SliceZone wrapper="main" :slices="page?.data.slices ?? []" :components="components" />
    </app-layout>
  </template>
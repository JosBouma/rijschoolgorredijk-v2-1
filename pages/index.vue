<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const { data: page } = await useAsyncData('index', () =>
  prismic.client.getByUID('index', 'index')
)

useSeoMeta({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description
})
</script>

<template>
  <div class="page">
    <app-nav></app-nav>
    <SliceZone wrapper="main" :slices="page?.data.slices ?? []" :components="components" />
    <app-footer></app-footer>
  </div>
</template>

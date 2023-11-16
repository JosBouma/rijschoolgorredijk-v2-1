<script setup lang="ts">
import { components } from '~/slices';

const prismic = usePrismic();
const { data: page } = await useAsyncData('index', () =>
  prismic.client.getByUID('index', 'index', {
    fetchLinks: [
      'questionanswer.items'
    ]
  })
);

const { data: settings } = await useAsyncData('global_settings', () =>
  prismic.client.getByUID('global_settings', 'global_settings')
);

useSeoMeta({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description
});

import type { WithContext, LocalBusiness } from 'schema-dts';

const children: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': settings.value?.data.domain as string,
  name: settings.value?.data.name as string,
  logo: [
    settings.value?.data.logo.url as string
  ],
  image: [
    settings.value?.data.company_image.url as string
  ],
  url: settings.value?.data.domain as string,
  email: settings.value?.data.email as string,
  telephone: settings.value?.data.telephone as string,
  address: {
    '@type': 'PostalAddress',
    streetAddress: settings.value?.data.street_address as string,
    addressLocality: settings.value?.data.address_locality as string,
    addressRegion: settings.value?.data.address_region as string,
    postalCode: settings.value?.data.postal_code as string,
    addressCountry: settings.value?.data.address_country as string
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: settings.value?.data.latitude as string,
    longitude: settings.value?.data.longitude as string,
  }
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      children
    }
  ]
});
</script>

<template>
  <app-layout>
    <SliceZone wrapper="main" :slices="page?.data.slices ?? []" :components="components" />
  </app-layout>
</template>

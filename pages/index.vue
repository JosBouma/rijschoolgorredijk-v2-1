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

const { data: json } = await useAsyncData('global_settings', () =>
  prismic.client.getByUID('global_settings', 'global_settings')
);

useSeoMeta({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description
});

import { WithContext, LocalBusiness } from 'schema-dts';

const children: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': json.value?.data.domain as string,
  name: json.value?.data.name as string,
  logo: [
    json.value?.data.logo.url as string
  ],
  image: [
    json.value?.data.company_image.url as string
  ],
  url: json.value?.data.domain as string,
  email: json.value?.data.email as string,
  telephone: json.value?.data.telephone as string,
  address: {
    '@type': 'PostalAddress',
    streetAddress: json.value?.data.street_address as string,
    addressLocality: json.value?.data.address_locality as string,
    addressRegion: json.value?.data.address_region as string,
    postalCode: json.value?.data.postal_code as string,
    addressCountry: json.value?.data.address_country as string
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: json.value?.data.latitude as string,
    longitude: json.value?.data.longitude as string,
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

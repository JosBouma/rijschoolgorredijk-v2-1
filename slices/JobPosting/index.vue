<script setup lang="ts">
import { Content } from "@prismicio/client";
import { WithContext, JobPosting } from 'schema-dts';

const prismic = usePrismic();

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.JobPostingSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const { data: settings } = await useAsyncData('global_settings', () =>
  prismic.client.getByUID('global_settings', 'global_settings')
);

const dt = prismic.asDate(props.slice.primary.date_posted) as Date;

const children: WithContext<JobPosting> = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  'description': prismic.asHTML(props.slice.primary.description) as string,
  'title': props.slice.primary.title as string,
  'hiringOrganization': {
    "@type": "Organization",
    "name": settings.value?.data.name as string,
    "sameAs": settings.value?.data.domain as string,
  },
  'datePosted': `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`,
  "jobLocation": {
    "@type": "Place",
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': settings.value?.data.street_address as string,
      'addressLocality': settings.value?.data.address_locality as string,
      'addressRegion': settings.value?.data.address_region as string,
      'postalCode': settings.value?.data.postal_code as string,
      'addressCountry': settings.value?.data.address_country as string
    }
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
  <section>
    <p>Geplaatst: {{ dt.toLocaleDateString('nl-NL') }}</p>
    <h1>{{ slice.primary.title }}</h1>
    <prismic-rich-text :field="slice.primary.description"></prismic-rich-text>
  </section>
</template>

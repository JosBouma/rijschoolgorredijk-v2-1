<script setup lang="ts">
import { Content } from "@prismicio/client";
const prismic = usePrismic();

const { data: settings } = await useAsyncData('global_settings', () =>
  prismic.client.getByUID('global_settings', 'global_settings')
);

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ContactInfoSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<style>
.contact-info {
  margin-bottom: 4rem;
}

.contact-info .container {
  max-width: 100rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 5%;
  padding: 0 1rem;
}

.contact-info .container .info .inner {
  background: var(--color-primary);
  padding: 4rem 2rem;
}

.contact-info .container h1 {
  color: var(--color-primary);
}

.contact-info .container h1,
.contact-info .container .info h2 {
  font-size: 2.75rem;
}

.contact-info .container .info h2 {
  margin-bottom: 2rem;
  color: #171717;
}

.contact-info .container .info .inner p,
.contact-info .container .info .inner a {
  font-size: 1.5rem;
  color: #fff;
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;
  margin-bottom: 1rem;
}

.contact-info .container>img {
  opacity: 0.8;
}

.contact-info .container .info .footnote {
  padding: 2rem 20%;
  text-align: justify;
}

@media screen and (max-width: 60rem) {
  .contact-info .container {
    grid-template-columns: none;
  }
}
</style>

<template>
  <section class="contact-info">
    <div class="container">
      <h1>Contact</h1>
      <div class="info">
        <h2>Rijschool Gorredijk</h2>
        <div class="inner">
          <p>
            <svgo-chevron></svgo-chevron>
            <span>{{ settings?.data.street_address }}</span>
          </p>
          <p>
            <svgo-chevron></svgo-chevron>
            <span>{{ settings?.data.postal_code }} {{ settings?.data.address_locality }}</span>
          </p>
          <p>
            <svgo-chevron></svgo-chevron>
            <span>TODO: tel</span>
          </p>
          <p>
            <svgo-chevron></svgo-chevron>
            <span>TODO: whatsapp</span>
          </p>
          <nuxt-link :to="`mailto:${settings?.data.email}`">
            <svgo-envelope></svgo-envelope>
            <span>{{ settings?.data.email }}</span>
          </nuxt-link>
        </div>
        <div class="footnote">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eius, odit fugit repudiandae recusandae accusantium a et vel, soluta animi voluptas natus dignissimos dicta ea, minus ipsa perspiciatis voluptatum tenetur.</p>
        </div>
      </div>
      <img-ix :field="slice.primary.image" loading="eager"></img-ix>
    </div>
  </section>
</template>

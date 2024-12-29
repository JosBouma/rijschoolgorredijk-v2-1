<script lang="ts" setup>
const footer = await $fetch('/api/footer');
</script>

<template>
  <footer>
    <div class="bg-shade-1 text-white px-4">
      <div class="flex items-center gap-8 justify-center p-4 lg:p-8 flex-wrap">
        <p class="text-2xl lg:text-4xl">Volg ons</p>
        <nuxt-link class="flex items-center gap-4 hover:scale-110 transition-transform duration-500"
          :to="footer?.data?.facebook?.url || '#'">
          <svgo-facebook :fontControlled="false" class="w-14"></svgo-facebook>
          <span class="underline lg:text-2xl">op Facebook</span>
        </nuxt-link>
      </div>
    </div>
    <div class="bg-shade-3 py-12 flex flex-wrap justify-center gap-8">
      <div class="bg-white py-8 px-4 lg:px-24 sm:mx-4 border-shade-2 border-4 shadow-lg rounded-md">
        <h3 class="text-xl md:text-3xl font-bold text-shade-1 mb-8">Neem contact op</h3>
        <p>De Buorren 21</p>
        <p class="mb-4">8408 HG Lippenhuizen (FR)</p>
        <nuxt-link
          class="mb-4 font-semibold md:text-lg flex items-center gap-4 hover:scale-105 transition-transform duration-500 origin-bottom"
          :to="footer?.data?.telephone_link?.url || '#'">
          <svgo-phone class="text-shade-1 hidden sm:block"></svgo-phone>
          <span class="underline">{{ footer?.data?.telephone_text }}</span>
        </nuxt-link>
        <nuxt-link
          class="mb-4 font-semibold md:text-lg flex items-center gap-4 hover:scale-105 transition-transform duration-500 origin-bottom"
          :to="footer?.data?.email_link?.url || '#'">
          <svgo-envelope class="text-shade-1 hidden sm:block"></svgo-envelope>
          <span class="underline">{{ footer?.data?.email_text }}</span>
        </nuxt-link>
        <nuxt-link
          class="font-semibold text-lg flex items-center gap-4 hover:scale-105 transition-transform duration-500 origin-bottom"
          to="mailto:info@rijschoolakkrum.nl">
          <svgo-envelope class="text-shade-1 hidden sm:block"></svgo-envelope>
          <span class="underline">info@rijschoolakkrum.nl</span>
        </nuxt-link>
        <h4 class="pt-8 font-semibold">Bereikbaarheid</h4>
        <div class="opening-hours">
          <!-- @vue-expect-error -->
          <prismic-rich-text :field="footer?.data?.opening_hours"></prismic-rich-text>
        </div>
      </div>
      <div class="grid items-center">
        <nuxt-img class="border-2 rounded-md shadow-2xl shadow-white" :src="footer?.data.image.url || ''" :alt="footer?.data.image.alt || ''"
          :width="footer?.data.image.dimensions?.width" :height="footer?.data.image.dimensions?.height" />
      </div>
    </div>
    <div class="bg-shade-1 text-white shadow-md py-8 text-lg flex flex-wrap gap-8 justify-around">
      <nuxt-link class="underline" :to="footer?.data?.termsconditions?.url || '#'">Algemene voorwaarden</nuxt-link>
      <nuxt-link class="underline" :to="footer?.data?.privacystatement?.url || '#'">Privacy</nuxt-link>
      <p>© Rijschool Gorredijk {{ new Date().getFullYear() }}</p>
      <p>KvK 86570358</p>
      <p>CBR 2086N2</p>
    </div>
    <!--
    <div class="contact-info-wrapper">
      <div class="top">
        <section class="left">
          <h3>Neem contact op</h3>
          <p class="small">De Buorren 21 8408 HG Lippenhuizen (FR)</p>
          <nuxt-link :to="footer?.data?.telephone_link?.url || '#'">
            <svgo-phone></svgo-phone>
            <span>{{ footer?.data?.telephone_text }}</span>
          </nuxt-link>
          <nuxt-link :to="footer?.data?.email_link?.url || '#'">
            <svgo-envelope></svgo-envelope>
            <span>{{ footer?.data?.email_text }}</span>
          </nuxt-link>
          <nuxt-link to="mailto:info@rijschoolakkrum.nl">
            <svgo-envelope></svgo-envelope>
            <span>info@rijschoolakkrum.nl</span>
          </nuxt-link>
          <h4>Bereikbaarheid</h4>
          <div class="opening-hours">
            <prismic-rich-text :field="footer?.data?.opening_hours"></prismic-rich-text>
          </div>
        </section>
        <section class="right">
          <nuxt-img :src="footer?.data.image.url || ''" :alt="footer?.data.image.alt || ''"
            :width="footer?.data.image.dimensions?.width" :height="footer?.data.image.dimensions?.height" />
        </section>
      </div>
    </div>
    <div class="bottom-wrapper">
      <nuxt-link :to="footer?.data?.termsconditions?.url || '#'">Algemene voorwaarden</nuxt-link>
      <nuxt-link :to="footer?.data?.privacystatement?.url || '#'">Privacy</nuxt-link>
      <p>© Rijschool Gorredijk {{ new Date().getFullYear() }}</p>
      <p>KvK 86570358</p>
      <p>CBR 2086N2</p>
    </div> -->
  </footer>
</template>
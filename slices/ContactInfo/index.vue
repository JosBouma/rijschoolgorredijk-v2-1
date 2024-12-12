<script setup lang="ts">
import { type Content } from "@prismicio/client";
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

const gmaps = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  const el = gmaps.value as HTMLDivElement;
  // @ts-ignore
  (g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })
    ({ key: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg", v: "weekly" });
  // @ts-ignore
  const { Map: mapApi } = await google.maps.importLibrary("maps");
  // @ts-ignore
  const { AdvancedMarkerElement: markerApi } = await google.maps.importLibrary("marker");
  const latLng = {
    lat: parseFloat(settings.value?.data.latitude as string),
    lng: parseFloat(settings.value?.data.longitude as string),
  };
  console.log(latLng);
  const map = new mapApi(
    el,
    {
      zoom: 4,
      center: latLng,
      mapId: 'DEMO_MAP_ID',
    }
  );
  const marker = new markerApi({
    map: map,
    position: latLng,
    title: settings.value?.data.name
  });
});
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

.contact-info .container h1 {
  color: var(--color-primary);
}

.contact-info .container h1,
.contact-info .container h2 {
  font-size: 2.75rem;
}

.contact-info .container .mid h2 {
  margin-bottom: 2rem;
}

.contact-info .container .mid .info {
  background: var(--color-primary);
  padding: 4rem 2rem;
  color: #fff;
}

.contact-info .container .mid .info p,
.contact-info .container .mid .info a {
  font-size: 1.5rem;
  color: #fff;
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;
  margin-bottom: 1rem;
}

.contact-info .container .mid .footnote {
  padding: 2rem 20%;
}

.contact-info .container .mid .footnote p {
  margin-bottom: 1rem;
}

.contact-info .container .right {
  font-size: 1.5rem;
}

.contact-info .container .right h3 {
  margin: 2rem 0;
}

.contact-info .container .right .opening-hours p {
  display: grid;
  margin: 0 5%;
  grid-template-columns: 3fr 1fr;
}

.contact-info .container .right .opening-hours p>span {
  padding: 1rem 0;
}

.contact-info .container .right .opening-hours p>span:first-child {
  border-bottom: 3px solid var(--color-primary);
}

.contact-info .container .right .opening-hours p>span:last-child {
  border-bottom: 3px solid #000;
}

@media screen and (max-width: 60rem) {
  .contact-info .container {
    grid-template-columns: none;
  }

  .contact-info .container .mid .info p,
  .contact-info .container .mid .info a {
    grid-template-columns: none;
    font-size: 1.25rem;
    text-wrap: wrap;
    word-wrap: break-word;
  }

  .contact-info .container .mid .info svg {
    display: none;
  }

  .contact-info .container .right .opening-hours {
    margin-bottom: 18rem;
  }

  .contact-info .container .right .opening-hours p {
    grid-template-columns: 1.5fr 1fr;
  }
}
</style>

<template>
  <section class="contact-info">
    <div class="container">
      <div class="left">
        <h1>Contact</h1>
      </div>
      <div class="mid">
        <h2>Rijschool Gorredijk</h2>
        <h2>Rijschool Akkrum e.o.</h2>
        <div class="info">
          <p>
            <svgo-home></svgo-home>
            <span>{{ settings?.data.street_address }}</span>
          </p>
          <p>
            <svgo-home></svgo-home>
            <span>{{ settings?.data.postal_code }} {{ settings?.data.address_locality }}</span>
          </p>
          <nuxt-link :to="`tel:${settings?.data.telephone}`">
            <svgo-phone></svgo-phone>
            <span>{{ slice.primary.telephone_text }}</span>
          </nuxt-link>
          <nuxt-link :to="`https://wa.me/${settings?.data.telephone}`">
            <svgo-whatsapp></svgo-whatsapp>
            <span>{{ slice.primary.whatsapp_text }}</span>
          </nuxt-link>
          <nuxt-link :to="`mailto:${settings?.data.email}`">
            <svgo-envelope></svgo-envelope>
            <span>{{ settings?.data.email }}</span>
          </nuxt-link>
          <nuxt-link :to="`mailto:info@rijschoolakkrum.nl`">
            <svgo-envelope></svgo-envelope>
            <span>info@rijschoolakkrum.nl</span>
          </nuxt-link>
        </div>
        <div class="footnote">
          <prismic-rich-text :field="slice.primary.content"></prismic-rich-text>
        </div>
        <div class="gmaps" ref="gmaps">
          <nuxt-link to="https://maps.app.goo.gl/8nBGx7d6Y5mpW9Cz9">
            <img-ix :field="slice.primary.gmaps_image"></img-ix>
          </nuxt-link>
        </div>
      </div>
      <div class="right">
        <img-ix :field="slice.primary.image" loading="eager"></img-ix>
        <div class="opening-hours">
          <h3>Openingstijden</h3>
          <div class="days">
            <p v-for="item in slice.items">
              <span>{{ item.day }}&nbsp;</span>
              <span>{{ item.time }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

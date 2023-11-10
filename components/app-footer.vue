<script lang="ts" setup>
const prismic = usePrismic();
const { data: footer } = await useAsyncData('footer', () => {
    return prismic.client.getByUID('footer', 'footer');
});
</script>

<style scoped>
.app-footer {
    display: flex;
    flex-direction: column;
}

.app-footer .contact-info-wrapper {
    max-width: 80rem;
    margin: 0 auto;
}

.app-footer .top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.app-footer .top .left {
    display: flex;
    flex-direction: column;
    color: #fff;
    background: var(--color-primary);
    padding: 4rem;
    gap: 1rem;
}

.app-footer .top .left h3 {
    margin-bottom: auto;
}

.app-footer .top .left a {
    color: #fff;
    display: grid;
    grid-template-columns: auto 1fr;
    font-size: 1.25rem;
    align-items: center;
    gap: 1rem;
    transform-origin: center left;
    transition: transform 0.2s ease-in;
}

.app-footer .top .left a:hover {
    transform: scale(1.25);
}

.app-footer .top .left h4 {
    margin-top: 2rem;
}

.app-footer .top h3 {
    font-size: 2rem;
}

.mid-wrapper {
    background: var(--color-secondary);
    margin: 0 0 2rem 0;
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    place-content: center;
    gap: 4rem;
}

.mid-wrapper p {
    font-size: 1.75rem;
}

.mid-wrapper .socials {
    display: flex;
    gap: 4rem;
    font-size: 1.25em;
    flex-wrap: wrap;
}

.mid-wrapper .socials a {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--color-primary);
}

.mid-wrapper .socials a svg,
.mid-wrapper .socials a svg * {
    color: var(--color-primary);
}

.bottom-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 4rem 0;
    padding-bottom: 2rem;
    align-items: center;
    justify-content: center;
    column-gap: 10%;
    row-gap: 1rem;
    border-bottom: 1px solid rgb(222, 222, 222);
}

.bottom-wrapper a {
    color: var(--color-primary);
    font-size: 1.125rem;
}

@media screen and (max-width: 60rem) {
    .app-footer .top {
        grid-template-columns: none;
    }

    .app-footer .top .left {
        padding: 4rem 8vw;
        overflow: hidden;
    }

    .app-footer .top .left a {
        font-size: 1rem;
    }

    .bottom-wrapper a {
        font-size: 1rem;
    }
}
</style>

<template>
    <footer class="app-footer">
        <div class="mid-wrapper">
            <p>Volg Rijschool Gorredijk</p>
            <div class="socials">
                <nuxt-link v-if="footer?.data.facebook.url" :to="footer?.data.facebook.url">
                    <svgo-facebook></svgo-facebook>
                    <span>Facebook</span>
                </nuxt-link>
                <nuxt-link v-if="footer?.data.instagram.url" :to="footer?.data.instagram.url">
                    <svgo-instagram></svgo-instagram>
                    <span>Instagram</span>
                </nuxt-link>
            </div>
        </div>
        <div class="contact-info-wrapper">
            <div class="top">
                <section class="left">
                    <h3>Neem contact op</h3>
                    <p class="small">De Buorren 21 8408 HG Lippenhuizen (FR)</p>
                    <nuxt-link :to="footer?.data.telephone_link.url">
                        <svgo-phone></svgo-phone>
                        <span>{{ footer?.data.telephone_text }}</span>
                    </nuxt-link>
                    <nuxt-link :to="footer?.data.email_link.url">
                        <svgo-envelope></svgo-envelope>
                        <span>{{ footer?.data.email_text }}</span>
                    </nuxt-link>
                    <h4>Bereikbaarheid</h4>
                    <div class="opening-hours">
                        <prismic-rich-text :field="footer?.data.opening_hours"></prismic-rich-text>
                    </div>
                </section>
                <section class="right">
                    <img-ix :field="footer?.data.image"></img-ix>
                </section>
            </div>
        </div>
        <div class="bottom-wrapper">
            <nuxt-link :to="footer?.data.termsconditions.url">Algemene voorwaarden</nuxt-link>
            <p>© Rijschool Gorredijk {{ new Date().getFullYear() }}</p>
            <p>KvK 86570358</p>
            <p>CBR 2086N2</p>
        </div>
    </footer>
</template>
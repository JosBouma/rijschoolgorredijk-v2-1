<script lang="ts" setup>
const prismic = usePrismic();
const { data: footer } = await useAsyncData('footer', () => {
    return prismic.client.getByUID('footer', 'footer')
})
</script>

<style scoped>
.app-footer {
    display: flex;
    flex-direction: column;
}

.app-footer .top-wrapper {
    max-width: 80rem;
    margin: 0 auto;
}

.app-footer .top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.app-footer .top .left {
    color: #fff;
    background: var(--color-primary);
    padding: 4rem;
}

.app-footer .top h3 {
    font-size: 2rem;
}

@media screen and (max-width: 60rem) {
    .app-footer .top {
        grid-template-columns: none;
    }
}
</style>

<template>
    <footer class="app-footer">
        <div class="top-wrapper">
            <div class="top">
                <section class="left">
                    <h3>Neem contact op</h3>
                    <p class="small">De Buorren 21 8408 HG Lippenhuizen (FR)</p>
                    <nuxt-link to="tel:+0031633418680">
                        <img src="~assets/svg/phone.svg" alt="Mail mij">
                        <span>0633418680</span>
                    </nuxt-link>
                    <nuxt-link to="mailto:info@rijschoolgorredijk.nl">
                        <img src="~assets/svg/envelope.svg" alt="Mail mij">
                        <span>info@rijschoolgorredijk.nl</span>
                    </nuxt-link>
                    <h4>Bereikbaarheid</h4>
                    <div class="opening-hours">
                        <p>
                            <span>Maandag tot vrijdag: </span>
                            <span>8:30 - 17:00</span>
                        </p>
                    </div>
                </section>
                <section class="right">
                    <img-ix :field="footer?.data.image"></img-ix>
                </section>
            </div>
        </div>
    </footer>
</template>
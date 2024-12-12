<script lang="ts" setup>
const prismic = usePrismic();

const { data: menu } = await useAsyncData('menu', () =>
  prismic.client.getByUID('menu', 'menu')
);

const isOpen = useState('hamburgerOpen');

function handleUlClick(evt: MouseEvent) {
    const target = evt.target as HTMLElement;
    if('A' === target.tagName) {
        isOpen.value = false;
    }
}
</script>

<style scoped>
.app-nav {
    position: fixed;
    z-index: 10;
    display: grid;
    grid-template-columns: auto 1fr auto;
    background: #fff;
    background: #fbfbfb;
    top: 0;
    width: inherit;
    max-width: var(--app-max-width);
    align-items: center;
    gap: 4rem;
    border-bottom: 1px solid #c6c6c6;
}

.app-nav>a svg {
    width: 100%;
    max-width: 12rem;
    padding: 1rem;
    transition: transform 0.2s ease-out;
    will-change: transform;
}

.app-nav>a svg:hover {
    transform: scale(1.15);
}

.app-nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0.4rem 1rem;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.app-nav ul li a {
    text-decoration: none;
    font-size: 1.20rem;
    font-weight: 700;
    color: var(--color-primary);
}

.app-nav ul li a::after {
    content: "";
    width: 100%;
    height: 3px;
    background: var(--color-secondary);
    display: block;
    transform: scaleX(0);
    opacity: 0;
    will-change: transform, opacity;
    transition: all 0.5s ease-out;
    transform-origin: left center;
}

.app-nav ul li a:hover::after {
    opacity: 1;
    transform: scale(1);
}

.hamburger {
    display: none;
}

.ctas {
    display: flex;
    gap: 1rem;
    margin-left: auto;
    margin-right: 1rem;
}

.ctas a {
    text-decoration: none;
    background: var(--color-secondary);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    padding: 0.5rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: transform 0.2s ease-out;
    will-change: transform;
}

.ctas a:hover {
    transform: scale(1.15);
}

.ctas a svg {
    fill: var(--color-primary);
}

@media screen and (max-width: 100rem) {
    .app-nav {
        gap: 1rem;
        grid-template-columns: 1fr auto;
    }

    .app-nav ul {
        transform: scaleY(0);
        background: rgba(255, 255, 255, 0.9);
        display: grid;
        gap: 0;
        position: absolute;
        left: 0;
        top: 150%;
        z-index: 1;
        width: 100%;
        transition: transform 0.2s ease-in;
        transform-origin: top;
        will-change: transform;
        padding: 2rem 0;
    }

    .app-nav ul.open {
        transform: scaleY(1);
    }

    .app-nav ul li {
        margin: 0 0 1rem 4rem;
    }

    .hamburger {
        display: inherit;
        margin-right: 1rem;
    }

    .ctas {
        position: absolute;
        bottom: -3.5rem;
        width: 100%;
        justify-content: center;
        margin: 0 auto 1rem auto;
    }

    .ctas a {
        flex-wrap: wrap;
    }

    .ctas svg {
        display: none;
    }
}
</style>

<template>
    <nav class="app-nav">
        <nuxt-link to="/" @click="isOpen = false">
            <svgo-logo-v2 :fontControlled="false" :filled="true"></svgo-logo-v2>
        </nuxt-link>
        <ul :class="{ open: isOpen }" @click="handleUlClick">
            <li v-for="item in menu?.data.items">
                <nuxt-link :to="item.link.url">{{ item.text }}</nuxt-link>
            </li>
        </ul>
        <div class="hamburger">
            <snippet-hamburger></snippet-hamburger>
        </div>
        <div class="ctas">
            <nuxt-link to="tel:+0031633418680">
                <svgo-phone></svgo-phone>
                <span>Bel mij</span>
            </nuxt-link>
            <nuxt-link to="mailto:info@rijschoolgorredijk.nl">
                <svgo-envelope></svgo-envelope>
                <span>E-mail</span>
            </nuxt-link>
            <nuxt-link to="https://www.startmetjerijbewijs.nl/rijschool-gorredijk/inschrijven">
                <svgo-user></svgo-user>
                <span>Inschrijven</span>
            </nuxt-link>
        </div>
    </nav>
</template>
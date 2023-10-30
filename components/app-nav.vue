<script lang="ts" setup>
const isOpen = useState('hamburgerOpen');
const route = useRoute();

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
    background: linear-gradient(90deg, rgba(255,255,255,1) 25%, rgba(202,240,248,1) 45%, rgba(202,240,248,1) 55%, rgba(255,255,255,1) 75%);
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
    gap: 3rem;
    flex-wrap: wrap;
}

.app-nav ul li a {
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary);
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
            <svgo-logo :fontControlled="false" :filled="true"></svgo-logo>
        </nuxt-link>
        <ul :class="{ open: isOpen }" @click="handleUlClick">
            <li>
                <nuxt-link to="/pagina-1/">Pagina 1</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/pagina-2/">Pagina 2</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/pagina-3/">Pagina 3</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/pagina-4/">Pagina 4</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/pagina-5/">Pagina 5</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/pagina-6/">Pagina 6</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/pagina-7/">Pagina 7</nuxt-link>
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
                <span>Stuur een e-mail</span>
            </nuxt-link>
            <nuxt-link to="#">
                <svgo-user></svgo-user>
                <span>Portaal</span>
            </nuxt-link>
        </div>
    </nav>
</template>
<script lang="ts" setup>
const isOpen = useState('hamburgerOpen');
</script>

<style scoped>
.app-nav {
    position: fixed;
    display: grid;
    grid-template-columns: auto 1fr auto;
    background: #fff;
    background: linear-gradient(90deg, rgba(255,255,255,1) 25%, rgba(202,240,248,1) 45%, rgba(202,240,248,1) 55%, rgba(255,255,255,1) 75%);
    top: 0;
    left: 0;
    width: 100%;
    align-items: center;
    gap: 4rem;
    border-bottom: 1px solid #c6c6c6;
}

.app-nav>a img {
    width: 160px;
    margin: 1rem;
}

.app-nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0.4rem 1rem;
    align-items: center;
    gap: 4vw;
    flex-wrap: wrap;
}

.app-nav ul li img {
    width: 100%;
    max-width: 12rem;
    transition: transform 0.2s ease-out;
    will-change: transform;
}

.app-nav ul li img:hover {
    transform: scale(1.15);
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

@media screen and (max-width: 68rem) {
    .app-nav {
        gap: 1rem;
        grid-template-columns: 1fr auto;
    }

    .app-nav ul {
        transform: scaleY(0);
        background: #fff;
        display: block;
        position: absolute;
        left: 0;
        bottom: -8rem;
        z-index: 1;
        width: 100%;
        transition: transform 0.2s ease-in;
        transform-origin: top;
        will-change: transform;
        padding: 2rem;
    }

    .app-nav ul.open {
        transform: scaleY(1);
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

    .ctas img {
        max-width: 10px;
    }
}
</style>

<template>
    <nav class="app-nav">
        <nuxt-link to="/">
            <img src="~assets/svg/logo.svg" alt="Rijschool Gorredijk">
        </nuxt-link>
        <ul :class="{ open: isOpen }">
            <li>
                <nuxt-link to="/over-ons/">Over mij</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/over-ons/">Rijopleiding</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/contact/">Contact</nuxt-link>
            </li>
        </ul>
        <div class="hamburger">
            <snippet-hamburger></snippet-hamburger>
        </div>
        <div class="ctas">
            <nuxt-link to="tel:+0031633418680">
                <img src="~assets/svg/phone.svg" alt="Bel mij">
                <span>Bel mij</span>
            </nuxt-link>
            <nuxt-link to="mailto:info@rijschoolgorredijk.nl">
                <img src="~assets/svg/envelope.svg" alt="Bel mij">
                <span>Stuur een e-mail</span>
            </nuxt-link>
            <nuxt-link to="#">
                <img src="~assets/svg/user.svg" alt="Bel mij">
                <span>Portaal</span>
            </nuxt-link>
        </div>
    </nav>
</template>
<style>
.loading-animation {
    --color: #000;
    width: fit-content;
    height: fit-content;
}

.loading-animation::after {
    content: " ";
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 4px solid var(--color);
    border-color: var(--color) transparent var(--color) transparent;
    animation: loading-animation 1.2s linear infinite reverse;
}

@keyframes loading-animation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

<template>
    <div class="loading-animation"></div>
</template>
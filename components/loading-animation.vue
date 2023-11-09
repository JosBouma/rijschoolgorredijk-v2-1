<style>
.loading-animation {
    width: 44rem;
    height: 4rem;
}

.loading-animation::after {
    content: " ";
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 4px solid #000;
    border-color: #000 transparent #000 transparent;
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
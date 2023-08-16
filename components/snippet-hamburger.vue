<script lang="ts" setup>
const isOpen = useState('hamburgerOpen', () => false);
</script>

<style scoped>
.hamburger {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    display: grid;
    width: 2rem;
    grid-template-rows: repeat(3, 5px);
    gap: 4px;
    transition: transform 0.2s ease-in;
    will-change: transform;
}

.hamburger.open {
    transform: rotate(45deg) translateX(4px) translateY(4px);
}

.hamburger span {
    height: 100%;
    background: #535353;
    border-radius: 2px;
    transition: transform 0.2s ease-in;
    will-change: transform, opacity;
}

.hamburger.open span:first-child {
    transform: rotate(90deg);
}

.hamburger.hamburger.open span:nth-child(2) {
    transform: scale(0);
}

.hamburger.open span:last-child {
    transform: translateY(-18px);
}
</style>

<template>
    <button class="hamburger" :class="{ open: isOpen }" @click="isOpen = !isOpen">
        <span></span>
        <span></span>
        <span></span>
    </button>
</template>
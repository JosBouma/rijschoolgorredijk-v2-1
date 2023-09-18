<style>
#app-layout {
    position: relative;
    width: 100%;
    max-width: var(--app-max-width);
    margin: 0 auto;
}

#app-layout .content {
  padding-top: 12rem;
}
</style>

<template>
    <div id="app-layout">
        <app-nav></app-nav>
        <div class="content">
            <slot></slot>
        </div>
        <app-footer></app-footer>
    </div>
</template>
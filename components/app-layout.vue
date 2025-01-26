<style>
:root {
  --menu-height: 98px;
  --app-max-width: 2440px;
}

body {
  font-family: "Poppins";
}
</style>

<template>
  <div class="max-w-[--app-max-width] mx-auto">
    <app-nav></app-nav>
    <div class="relative z-0 bg-gray-100">
      <slot></slot>
    </div>
    <app-footer></app-footer>
  </div>
</template>
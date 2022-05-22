<template>
</template>

<script setup lang="ts">
</script>

<style>
.fadeMe {
  opacity: 0.5;
  background: #000;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  position: fixed;
}

/* subtle zoom to attention and then back */
.pop-outin {
  animation: 2s anim-popoutin ease;
}

@keyframes anim-popoutin {
  0% {
    color: black;
    transform: scale(0);
    opacity: 0;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  25% {
    color: red;
    transform: scale(2);
    opacity: 1;
    text-shadow: 3px 10px 5px rgba(0, 0, 0, 0.5);
  }
  50% {
    color: black;
    transform: scale(1);
    opacity: 1;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    /* animate nothing to add pause at the end of animation */
    transform: scale(1);
    opacity: 1;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
  }
}
</style>

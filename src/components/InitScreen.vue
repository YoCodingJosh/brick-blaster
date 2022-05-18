<template>
  <div>
    <header>
      <h1>Loading...</h1>
      <p>Gotta get things ready!</p>
    </header>
    <footer>
      <div class="spinnerContainer">
        <div class="spinner"></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// TODO: Load some stuff!
</script>

<style>
header h1 {
  margin: 1rem auto;
}

header p {
  margin: 1rem auto;
}

.spinnerContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
}

.spinner {
  background-image: url('../assets/spinner-light.gif');
  width: 128px;
  height: 128px;
}

@media (prefers-color-scheme: dark) {
  .spinner {
    background-image: url('../assets/spinner-dark.gif');
    width: 128px;
    height: 128px;
  }
}
</style>

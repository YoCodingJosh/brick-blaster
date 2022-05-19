<template>
  <div>
    <header>
      <a href="#" class="backButton" @click.prevent="backButtonClicked()">
        <h3>&lt; Back</h3>
      </a>
      <h1>Credits!</h1>
    </header>
    <main>
      <div class="credit">
        <h3>Programming, Design, and Art</h3>
        <p>Josh Kennedy</p>
      </div>
      <div class="credit">
        <h3>Technologies Used:</h3>
        <ul>
          <li><a href="https://vuejs.org/" target="_blank">Vue.js</a></li>
          <li><a href="https://simplecss.org/" target="_blank">simple.css</a></li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useGameStateStore } from '../stores/game-state';

const gameStateStore = useGameStateStore();

function backButtonClicked() {
  gameStateStore.goToMainMenu();
}
</script>

<style scoped>
.backButton {
  text-decoration: none;
}

header {
  padding-top: 25px;
}

header h3 {
  display: inline;
}

header h1 {
  display: inline;
  margin-left: 50px;
}

.credit h3 {
  margin-bottom: 10px;
}

.credit p {
  margin: 0;
}

.credit ul {
  margin: 0;
}
</style>

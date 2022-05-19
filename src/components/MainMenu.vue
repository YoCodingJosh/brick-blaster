<template>
  <div>
    <header>
      <h1>Brick Blaster!</h1>
    </header>
    <br>
    <ul class="menuList">
      <li><a href="#" @click.prevent="onPlayClicked()">Play!</a></li>
      <li><a href="#" @click.prevent="onCreditsClicked()">Credits</a></li>
    </ul>
    <br>
    <div class="stats" v-if="hasHighScoreData">
      <h3>Stats</h3>
      <p>Your high score is {{ highScoreData.highScore }}</p>
      <p>Your highest level reached is {{ highScoreData.highestLevelReached }}</p>
      <a href="#" @click.prevent="clearHighScoreData()">Clear data</a>
    </div>
    <footer>
      <small>&copy; Josh Kennedy {{ (new Date()).getFullYear() }}</small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { HighScoreData } from '../models/HighScoreData';

import { useGameStateStore } from '../stores/game-state';

const gameStateStore = useGameStateStore();

function onPlayClicked() {
  alert('wow!');
}

function onCreditsClicked() {
  gameStateStore.goToCredits();
}

function clearHighScoreData() {
  localStorage.clear();
}

const hasHighScoreData = computed(() => {
  return localStorage.getItem('HighScore') !== null;
});

const highScoreData = computed(() => {
  let result: HighScoreData = JSON.parse(localStorage.getItem('HighScore')!);
  return result;
});
</script>

<style>
.menuList {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menuList li {
  padding-bottom: 15px;
}

.menuList li a {
  text-decoration: none;
  font-size: xx-large;
}

.stats h3 {
  margin-bottom: 10px;
}

.stats p {
  margin: 0;
}
</style>

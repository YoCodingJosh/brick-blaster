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
    <div class="stats" v-if="state.highScoreData !== null">
      <h3>Stats</h3>
      <p>Your high score is {{ state.highScoreData?.highScore }}</p>
      <p>Your highest level reached is {{ state.highScoreData?.highestLevelReached }}</p>
      <a href="#" @click.prevent="clearHighScoreData()">Clear data</a>
    </div>
    <footer>
      <small>&copy; Josh Kennedy {{ (new Date()).getFullYear() }}</small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { HighScoreService } from '@/services/HighScoreService';
import { onMounted, onUnmounted, reactive } from 'vue';

import type { HighScoreDataEvent } from '../models/HighScoreData';

import { useGameStateStore } from '../stores/game-state';

const gameStateStore = useGameStateStore();

const state = reactive({
  highScoreData: HighScoreService.blankScoreData(),
});

function onPlayClicked() {
  gameStateStore.goToGame();
}

function onCreditsClicked() {
  gameStateStore.goToCredits();
}

function clearHighScoreData() {
  HighScoreService.clearHighScoreData();
}

var highScoreEventListener: EventListener = ((event: CustomEvent<HighScoreDataEvent>) => {
    state.highScoreData = event.detail.jsonDataString !== undefined ? JSON.parse(event.detail.jsonDataString) : null;
  }) as EventListener;

onMounted(() => {
  window.addEventListener('highscore-localstorage-changed', highScoreEventListener);

  // Fetch the latest score.
  HighScoreService.dispatchScoreUpdate();
});

onUnmounted(() => {
  window.removeEventListener('highscore-localstorage-changed', highScoreEventListener);
});
</script>

<style scoped>
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

.menuList li a:hover {
  color: violet;
}

.stats h3 {
  margin-bottom: 15px;
}

.stats p {
  margin: 0;
}

footer {
  margin-top: 25px;
}
</style>

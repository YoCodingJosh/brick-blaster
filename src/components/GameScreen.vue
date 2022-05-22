<template>
  <div>
    <PauseScreen v-if="state.isPaused" :resume-game-function="resumeGame" :main-menu-function="goToMainMenu"></PauseScreen>
    <div class="scorePanel">
      <img class="pauseButton" @click.prevent="pauseGame()" src="@/assets/game/PauseButton.png">
      <span class="highScoreText">High Score: 0</span>
      <span class="scoreText">0</span>
    </div>
    <canvas id="gameCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { GameplayService } from '@/services/GameplayService';
import { useGameStateStore } from '../stores/game-state';
import { onMounted, onUnmounted, reactive } from 'vue';
import PauseScreen from './PauseScreen.vue';

const gameStateStore = useGameStateStore();

const state = reactive({
  isPaused: false,
});

function pauseGame() {
  state.isPaused = true;
}

function resumeGame() {
  state.isPaused = false;
  GameplayService.unpause();
}

function goToMainMenu() {
  gameStateStore.goToMainMenu();
}

onMounted(() => {
  let canvas = <HTMLCanvasElement>document.getElementById("gameCanvas")!;

  GameplayService.start(canvas.getContext('2d')!, pauseGame);
});

onUnmounted(() => {
  GameplayService.stop();
});
</script>

<style scoped>
#gameCanvas {
  width: 100%;
  height: 100%;
}

.highScoreText {
  float: right;
  font-size: 1.5em;
}

.scoreText {
  float: left;
  font-size: 1.5em;
}

.pauseButton {
  float: right;
  max-height: 100%;
  cursor: pointer;
  padding-left: 25px;
}

.scorePanel {
  display: block;
  height: 2.5em;
}
</style>

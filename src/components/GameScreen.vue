<template>
  <div>
    <PauseScreen v-if="state.isPaused" :resume-game-function="resumeGame" :main-menu-function="goToMainMenu">
    </PauseScreen>
    <GameOverScreen v-if="state.isGameOver" :restart-game-function="restartGame" :main-menu-function="goToMainMenu">
    </GameOverScreen>
    <div class="scorePanel">
      <img class="pauseButton" @click.prevent="pauseGame()" src="@/assets/game/PauseButton.png">
      <span class="highScoreText">High Score: {{ state.highScore.highScore }}</span>
      <span class="scoreText">{{ state.currentScore.highScore }}</span>
    </div>
    <canvas id="gameCanvas"></canvas>
    <div class="scorePanel livesPanel">
      <span v-if="lives > 3">&bull; &times; {{ lives }}</span>
      <span v-else-if="lives > 0">
        <span v-for="life in lives" :key="`playerLife-${life}`">
          &bull;&nbsp;
        </span>
      </span>
      <span v-else-if="lives == 0">LAST LIFE</span>
      <span v-else>rip 💀</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HighScoreService } from '@/services/HighScoreService';
import { GameplayService } from '@/services/GameplayService';
import { useGameStateStore } from '../stores/game-state';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import PauseScreen from './PauseScreen.vue';
import GameOverScreen from './GameOverScreen.vue';

const gameStateStore = useGameStateStore();

const state = reactive({
  isPaused: false,
  highScore: HighScoreService.getHighScore(),
  currentScore: HighScoreService.zeroScoreData(),
  isGameOver: false,
});

let lives = ref(0);

function pauseGame() {
  GameplayService.pause();
  state.isPaused = true;
}

function resumeGame() {
  state.isPaused = false;
  GameplayService.unpause();
}

function goToMainMenu() {
  gameStateStore.goToMainMenu();
}

function updateLivesCount(numLives: number) {
  lives.value = numLives;
}

function restartGame() {
  state.isGameOver = false;
  startGame();
}

function showGameOver() {
  GameplayService.stop();
  state.isGameOver = true;
}

function startGame() {
  let canvas = document.getElementById("gameCanvas")! as HTMLCanvasElement;

  canvas.width = canvas.offsetWidth;
  canvas.height = document.documentElement.clientHeight - (document.getElementsByClassName('scorePanel')[0].clientHeight * 2) - 10;

  state.highScore = HighScoreService.getHighScore();
  state.currentScore = HighScoreService.zeroScoreData();

  GameplayService.start(canvas.getContext('2d')!, pauseGame, state.highScore, state.currentScore, updateLivesCount, showGameOver);
}

onMounted(() => {
  startGame();
});

onUnmounted(() => {
  GameplayService.stop();
});
</script>

<style scoped>
#gameCanvas {
  width: 100%;
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

.livesPanel {
  font-weight: bolder;
}
</style>

<template>
  <div>
    <InitScreen v-if="gameStateStore.gameState == GameState.Init"></InitScreen>
    <MainMenu v-if="gameStateStore.gameState == GameState.MainMenu"></MainMenu>
    <CreditsScreen v-if="gameStateStore.gameState == GameState.Credits"></CreditsScreen>
    <GameScreen v-show="gameStateStore.gameState == GameState.Gameplay"></GameScreen>
  </div>
</template>

<script setup lang="ts">
import MainMenu from './components/MainMenu.vue';
import InitScreen from './components/InitScreen.vue';
import CreditsScreen from './components/CreditsScreen.vue';
import { GameState } from './models/GameState';
import { useGameStateStore } from './stores/game-state';
import GameScreen from './components/GameScreen.vue';

const gameStateStore = useGameStateStore();
</script>

<style>
@import './assets/simple.min.css';

header h1 {
  margin: 1rem auto;
}

header p {
  margin: 1rem auto;
}
</style>

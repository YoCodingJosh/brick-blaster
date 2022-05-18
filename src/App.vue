<template>
  <div>
    <InitScreen v-if="gameStateStore.gameState == GameState.Init"></InitScreen>
    <MainMenu v-if="gameStateStore.gameState == GameState.MainMenu"></MainMenu>
  </div>
</template>

<script setup lang="ts">
import MainMenu from './components/MainMenu.vue';
import InitScreen from './components/InitScreen.vue';
import { GameState } from './models/GameState';
import { useGameStateStore } from './stores/game-state';

const gameStateStore = useGameStateStore();
</script>

<style>
@import './assets/simple.min.css';
</style>

<template>
  <canvas id="gameCanvas"></canvas>
</template>

<script setup lang="ts">
import { GameplayService } from '@/services/GameplayService';
import { useGameStateStore } from '../stores/game-state';
import { onMounted, onUnmounted } from 'vue';

const gameStateStore = useGameStateStore();

function goToMainMenu() {
  gameStateStore.goToMainMenu();
}

onMounted(() => {
  let canvas = <HTMLCanvasElement>document.getElementById("gameCanvas")!;

  GameplayService.start(canvas.getContext('2d')!, goToMainMenu);
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
</style>

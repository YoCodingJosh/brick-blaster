<template>
  <div>
    <header>
      <h1>Loading...</h1>
      <p>Gotta get things ready!</p>
    </header>
    <main>
      <div class="spinnerContainer">
        <div class="spinner"></div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { GameAssetService } from '@/services/GameAssetService';
import { onMounted } from 'vue';
import { useGameStateStore } from '../stores/game-state';

const gameStateStore = useGameStateStore();

onMounted(() => {
  setTimeout(async () => {
    await GameAssetService.loadAssets();
    gameStateStore.goToMainMenu();
  }, 1250);
});
</script>

<style scoped>
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

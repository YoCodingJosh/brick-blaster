import { defineStore } from 'pinia';

import { GameState } from '../models/GameState';

export const useGameStateStore = defineStore({
  id: 'gameState',
  state: () => ({
    gameState: GameState.Init
  }),
  getters: {
  },
  actions: {
    goToMainMenu() {
      this.gameState = GameState.MainMenu;
    }
  }
});
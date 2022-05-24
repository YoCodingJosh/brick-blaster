import type { Level } from "@/models/game/Level";
import { GameAssetService } from "./GameAssetService";
import { LevelGenerationService } from "./internal/LevelGenerationService";

interface PauseGameCallback {
  (): void; 
}

export abstract class GameplayService {
  private static ctx: CanvasRenderingContext2D;
  private static canvasWidth: number;
  private static canvasHeight: number;
  private static renderRequestId: number;
  private static processKeyboardEventThunk: (e: KeyboardEvent) => void;
  private static isPaused: boolean;
  private static pauseGame: PauseGameCallback;
  private static level: Level;
  private static currentLevel: number;

  private static processFrame() {
    var pattern = this.ctx.createPattern(GameAssetService.fetchImage('background1'), 'repeat')!;
    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.ctx.fillStyle = 'rgb(200, 0, 0)';
    this.ctx.fillRect(10, 10, 50, 50);

    this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this.ctx.fillRect(30, 30, 50, 50);

    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  private static processKeyboardInput(e: KeyboardEvent): void {
    if (e.defaultPrevented || this.isPaused) {
      return;
    }

    switch (e.code) {
      case 'Escape':
        this.isPaused = true;
        this.pauseGame();
        break;
      default:
        return;
    }
  }

  public static start(ctx: CanvasRenderingContext2D, pauseCallback: PauseGameCallback) {
    this.ctx = ctx;
    this.isPaused = false;
    this.pauseGame = pauseCallback;
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;

    // Set up input handling.
    this.processKeyboardEventThunk = this.processKeyboardInput.bind(this);
    window.addEventListener('keydown', this.processKeyboardEventThunk);

    // Set up the first level.
    this.currentLevel = 1;
    this.level = LevelGenerationService.generate(this.currentLevel);

    // Start rendering.
    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  public static stop() {
    window.removeEventListener('keydown', this.processKeyboardEventThunk);
    window.cancelAnimationFrame(this.renderRequestId);
  }

  public static pause() {
    this.isPaused = true;
  }

  public static unpause() {
    this.isPaused = false;
  }
}

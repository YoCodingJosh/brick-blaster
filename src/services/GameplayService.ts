import { Background } from "@/models/game/Background";
import { Ball } from "@/models/game/Ball";
import { Constants as GameConstants } from "@/models/game/Constants";
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

  private static background: Background;
  private static ball: Ball;

  private static nowTime: number;
  private static thenTime = performance.now();
  private static frameInterval = 1000 / GameConstants.targetFrameRate;
  private static deltaTime: number;

  private static processFrame() {
    this.nowTime = performance.now();
    this.deltaTime = this.nowTime - this.thenTime;
    this.thenTime = this.nowTime;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.background.draw(this.ctx, this.canvasWidth, this.canvasHeight);

    if (!this.isPaused) {
      this.ball.update(0, this.canvasWidth, this.canvasHeight);
    }

    this.ball.draw(this.ctx);

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
    this.background = new Background(this.ctx, 'background1', 'repeat');
    this.ball = new Ball(100, 100);

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

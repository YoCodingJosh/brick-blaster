import { Background } from "@/models/game/Background";
import { Ball } from "@/models/game/Ball";
import { Constants } from "@/models/game/Constants";
import { Keyboard } from "@/models/game/Keyboard";
import type { Level } from "@/models/game/Level";
import { Player } from "@/models/game/Player";
import type { HighScoreData } from "@/models/HighScoreData";
import { HighScoreService } from "./HighScoreService";
import { LevelGenerationService } from "./internal/LevelGenerationService";

interface PauseGameCallback {
  (): void;
}

export abstract class GameplayService {
  private static ctx: CanvasRenderingContext2D;
  private static canvasWidth: number;
  private static canvasHeight: number;
  private static renderRequestId: number;
  private static processKeyDownEventThunk: (e: KeyboardEvent) => void;
  private static processKeyUpEventThunk: (e: KeyboardEvent) => void;
  private static isPaused: boolean;
  private static pauseGame: PauseGameCallback;
  private static level: Level;
  private static currentLevel: number;
  private static highScoreData: HighScoreData;
  private static currentScoreData: HighScoreData;

  private static background: Background;
  private static ball: Ball;
  private static player: Player;

  private static nowTime: number;
  private static thenTime = performance.now();
  private static frameInterval = 1000 / Constants.targetFrameRate;
  private static deltaTime: number;
  private static keyboard: Keyboard;

  private static processFrame() {
    this.nowTime = performance.now();
    this.deltaTime = this.nowTime - this.thenTime;
    this.thenTime = this.nowTime;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.background.draw(this.ctx, this.canvasWidth, this.canvasHeight);

    if (!this.isPaused) {
      this.ball.update(1, this.canvasWidth, this.canvasHeight, this.player);
      this.player.update(1, this.canvasWidth);

      if (this.ball.y + this.ball.dY + Constants.ballRadius >= this.player.y + this.ball.dY + (Constants.ballRadius * 2) + Constants.playerHeight) {
        // TODO: Reset ball properly and process lose a life logic.
        this.ball.x = 100;
        this.ball.y = 100;
      }
    }

    if (this.currentScoreData.highScore > this.highScoreData.highScore) {
      HighScoreService.updateScore(this.currentScoreData.highScore);
      this.highScoreData.highScore = this.currentScoreData.highScore;
    }

    if (this.currentScoreData.highestLevelReached > this.highScoreData.highestLevelReached) {
      HighScoreService.updateScore(undefined, this.currentScoreData.highestLevelReached);
      this.highScoreData.highestLevelReached = this.currentLevel;
    }

    this.ball.draw(this.ctx);
    this.player.draw(this.ctx);

    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  private static processKeyboardDownInput(e: KeyboardEvent): void {
    if (e.defaultPrevented || this.isPaused) {
      return;
    }

    this.keyboard.set(e.code, {
      pressed: true,
    });

    if (this.keyboard.isKeyPressed('Space')) {
      // make it rain (temporarily lmao)
      this.currentScoreData.highScore += Constants.brickDestroyPoints;
    }

    switch (e.code) {
      case 'Escape':
        this.isPaused = true;
        this.pauseGame();
        break;
    }

    // this.player.processKeyboardDownInput(e);

    this.player.processKeyboardEvent(this.keyboard);
  }

  private static processKeyboardUpInput(e: KeyboardEvent): void {
    if (e.defaultPrevented || this.isPaused) {
      return;
    }

    this.keyboard.set(e.code, {
      pressed: false,
    });

    // this.player.processKeyboardUpInput(e);
    this.player.processKeyboardEvent(this.keyboard);
  }

  public static start(ctx: CanvasRenderingContext2D, pauseCallback: PauseGameCallback, highScoreData: HighScoreData, currentScoreData: HighScoreData) {
    this.ctx = ctx;
    this.isPaused = false;
    this.pauseGame = pauseCallback;
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;

    this.highScoreData = highScoreData;
    this.currentScoreData = currentScoreData;

    this.keyboard = new Keyboard();

    // Set up input handling.
    this.processKeyDownEventThunk = this.processKeyboardDownInput.bind(this);
    window.addEventListener('keydown', this.processKeyDownEventThunk);
    this.processKeyUpEventThunk = this.processKeyboardUpInput.bind(this);
    window.addEventListener('keyup', this.processKeyUpEventThunk);

    // Set up the level.
    this.currentLevel = 1;
    this.currentScoreData.highestLevelReached = this.currentLevel;
    this.level = LevelGenerationService.generate(this.currentLevel);
    this.background = new Background(this.ctx, 'background1', 'repeat');
    this.ball = new Ball(100, 100);
    this.player = new Player((this.canvasWidth - Constants.playerWidth) / 2, (this.canvasHeight / 1.5) - (Constants.playerHeight * 2));

    // Start rendering.
    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  public static stop() {
    this.keyboard.clear();

    window.removeEventListener('keydown', this.processKeyDownEventThunk);
    window.removeEventListener('keyup', this.processKeyUpEventThunk);
    window.cancelAnimationFrame(this.renderRequestId);
  }

  public static pause() {
    this.isPaused = true;
  }

  public static unpause() {
    this.isPaused = false;
  }

  public static getCurrentScoreData(): HighScoreData {
    return this.currentScoreData ?? {
      highScore: 0,
      highestLevelReached: 0,
    };
  }
}

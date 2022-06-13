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

interface LivesUpdateCallback {
  (lives: number): void;
}

interface GameOverCallback {
  (): void;
}

export abstract class GameplayService {
  private static ctx: CanvasRenderingContext2D;
  private static canvasWidth: number;
  private static canvasHeight: number;
  private static renderRequestId: number;
  private static processKeyDownEventThunk: (e: KeyboardEvent) => void;
  private static processKeyUpEventThunk: (e: KeyboardEvent) => void;
  private static isRunning: boolean;
  private static isPaused: boolean;
  private static pauseGame: PauseGameCallback;
  private static level: Level;
  private static currentLevel: number;
  private static highScoreData: HighScoreData;
  private static currentScoreData: HighScoreData;
  private static numLives: number;
  private static updateLivesCountCallback: LivesUpdateCallback;
  private static gameOverCallback: GameOverCallback;

  private static background: Background;
  private static ball: Ball;
  private static player: Player;

  private static nowTime: number;
  private static thenTime = performance.now();
  private static frameInterval = 1000 / Constants.targetFrameRate;
  private static deltaTime: number;
  private static keyboard: Keyboard;

  private static processFrame() {
    if (!this.isRunning) return;
    
    this.nowTime = performance.now();
    this.deltaTime = this.nowTime - this.thenTime;
    this.thenTime = this.nowTime;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.background.draw(this.ctx, this.canvasWidth, this.canvasHeight);

    if (!this.isPaused) {
      this.ball.update(1, this.canvasWidth, this.canvasHeight);
      this.player.update(1, this.canvasWidth);

      this.ball.handlePlayerCollision(this.player);

      if (this.ball.y + this.ball.dY + Constants.ballRadius >= this.player.y + this.ball.dY + (Constants.ballRadius * 2) + Constants.playerHeight) {
        this.numLives--;

        if (this.numLives < 0) {
          this.ball.isActive = false;
          this.ball.isVisible = false;
          this.player.isActive = false;
          this.player.isVisible = false;

          this.gameOverCallback();
        }

        this.ball.x = this.player.x + (Constants.playerWidth / 2) + (Constants.ballRadius / 2);
        this.ball.y = this.player.y - Constants.ballRadius - 1;
      }

      this.level.update(1, this.ball, this.currentScoreData);

      if (this.level.isComplete) {
        this.startNextLevel();
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

    // if (this.currentScoreData.highScore % Constants.extraLifePointsInterval == 0) {
    //   this.numLives++;
    // }

    this.ball.draw(this.ctx);
    this.player.draw(this.ctx);
    this.level.draw(this.ctx);

    this.updateLivesCountCallback(this.numLives);

    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  private static processKeyboardDownInput(e: KeyboardEvent): void {
    if (e.defaultPrevented || this.isPaused) {
      return;
    }

    this.keyboard.set(e.code, {
      pressed: true,
    });

    switch (e.code) {
      case 'Escape':
        this.isPaused = true;
        this.pauseGame();
        break;
    }

    this.player.processKeyboardEvent(this.keyboard);
  }

  private static processKeyboardUpInput(e: KeyboardEvent): void {
    if (e.defaultPrevented || this.isPaused) {
      return;
    }

    this.keyboard.set(e.code, {
      pressed: false,
    });

    this.player.processKeyboardEvent(this.keyboard);
  }

  private static startNextLevel() {
    this.currentLevel++;
    this.currentScoreData.highestLevelReached = this.currentLevel;
    this.level = LevelGenerationService.generate(this.currentLevel, this.canvasWidth, this.canvasHeight);
    this.background = new Background(this.ctx, 'background1', 'repeat');
    this.player = new Player((this.canvasWidth - Constants.playerWidth) / 2, (this.canvasHeight / 1.25) - (Constants.playerHeight * 2));
    this.ball = new Ball(this.player.x + (Constants.playerWidth / 2) + (Constants.ballRadius / 2), this.player.y - Constants.ballRadius - 1);
  }

  public static start(ctx: CanvasRenderingContext2D, pauseCallback: PauseGameCallback, highScoreData: HighScoreData, currentScoreData: HighScoreData, livesUpdateCallback: LivesUpdateCallback, gameOverCallback: GameOverCallback) {
    this.ctx = ctx;
    this.isPaused = false;
    this.pauseGame = pauseCallback;
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;

    this.highScoreData = highScoreData;
    this.currentScoreData = currentScoreData;

    this.numLives = Constants.numberOfLives;
    this.updateLivesCountCallback = livesUpdateCallback;
    livesUpdateCallback(this.numLives);

    this.gameOverCallback = gameOverCallback;

    this.keyboard = new Keyboard();

    // Set up input handling.
    this.processKeyDownEventThunk = this.processKeyboardDownInput.bind(this);
    window.addEventListener('keydown', this.processKeyDownEventThunk);
    this.processKeyUpEventThunk = this.processKeyboardUpInput.bind(this);
    window.addEventListener('keyup', this.processKeyUpEventThunk);

    this.currentLevel = 0;
    this.startNextLevel();

    this.isRunning = true;

    // Start rendering.
    this.renderRequestId = window.requestAnimationFrame(this.processFrame.bind(this));
  }

  public static stop() {
    this.isRunning = false;

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

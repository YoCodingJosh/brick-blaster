import { Constants } from "./Constants";
import type { Keyboard } from "./Keyboard";

export class Player {
  x: number;
  y: number;
  isMovingLeft = false;
  isMovingRight = false;
  isActive: boolean;
  isVisible: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.isActive = true;
    this.isVisible = true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.isVisible) return;
    
    ctx.beginPath();
    ctx.fillStyle = "#DADBC1";
    ctx.fillRect(this.x, this.y, Constants.playerWidth, Constants.playerHeight);
    ctx.closePath();
  }

  processKeyboardEvent(keyboard: Keyboard) {
    if (!this.isActive) return;

    if (keyboard.isKeyPressed('Right') || keyboard.isKeyPressed('ArrowRight')) {
      this.isMovingRight = true;
      this.isMovingLeft = false;
    } else if (keyboard.isKeyPressed('Left') || keyboard.isKeyPressed('ArrowLeft')) {
      this.isMovingLeft = true;
      this.isMovingRight = false;
    } else {
      this.isMovingLeft = false;
      this.isMovingRight = false;
    }
  }

  // processTouchEvent(e: TouchEvent) {
  // }

  // processMouseEvent(e: MouseEvent) {
  // }

  update(deltaTime: number, canvasWidth: number) {
    if (!this.isActive) return;

    if (this.isMovingRight) {
      this.x += Constants.playerMoveSpeed;

      if (this.x + (Constants.playerWidth + Constants.playerMoveSpeed) > canvasWidth) {
        this.x = canvasWidth - Constants.playerWidth;
      }
    } else if (this.isMovingLeft) {
      this.x -= Constants.playerMoveSpeed;

      if (this.x < 0) {
        this.x = 0;
      }
    }
  }
}

import type { Brick } from "./Brick";
import { Constants } from "./Constants";
import type { Player } from "./Player";

export class Ball {
  x: number;
  y: number;

  dX = Constants.ballSpeed;
  dY = -Constants.ballSpeed;

  isStuck: boolean;
  isActive: boolean;
  isVisible: boolean;

  readonly dXRange = Constants.ballSpeed * 2;

  constructor(x = 0, y = 0, stuck = false) {
    this.x = x;
    this.y = y;
    this.isStuck = stuck;

    this.isActive = true;
    this.isVisible = true;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.isVisible) return;

    ctx.beginPath();
    ctx.arc(this.x, this.y, Constants.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
  }

  public update(deltaTime: number, canvasWidth: number, canvasHeight: number) {
    if (this.isStuck || !this.isActive) return;

    if (this.x + this.dX > canvasWidth - Constants.ballRadius || this.x + this.dX < Constants.ballRadius) {
      this.dX = -this.dX;
    }

    if (this.y + this.dY > canvasHeight - Constants.ballRadius || this.y + this.dY < Constants.ballRadius) {
      this.dY = -this.dY;
    }

    this.x += this.dX * deltaTime;
    this.y += this.dY * deltaTime;
  }

  public handlePlayerCollision(player: Player, deltaTime: number) {
    if (this.x + Constants.ballRadius >= player.x &&
      this.x - Constants.ballRadius <= player.x + Constants.playerWidth &&
      this.y + Constants.ballRadius >= player.y) {
      // detects where on the paddle the ball has collided
      // and deflects the ball in the appropriate direction
      const percentage = (this.x - player.x) / Constants.playerWidth;
      this.dX = (percentage * this.dXRange) - (this.dXRange / 2);

      this.dY = -this.dY * deltaTime;
    }
  }

  public handleBrickCollision(brick: Brick, deltaTime: number): boolean {
    if (this.x - Constants.ballRadius <= brick.x + Constants.brickWidth &&
      this.x + Constants.ballRadius >= brick.x &&
      this.y - Constants.ballRadius <= brick.y + Constants.brickHeight &&
      this.y + Constants.ballRadius >= brick.y) {
      const percentage = (this.x - brick.x) / Constants.brickWidth;
      this.dX = (percentage * this.dXRange) - (this.dXRange / 2);

      this.dY = -this.dY;

      // So we don't accidentally break multiple bricks.
      this.x += this.dX * deltaTime;
      this.y += this.dY * deltaTime;

      return true
    }

    return false;
  }
}

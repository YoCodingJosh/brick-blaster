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

    if (
      this.x + this.dX > canvasWidth - Constants.ballRadius ||
      this.x + this.dX < Constants.ballRadius
    ) {
      this.dX = -this.dX;
    }

    if (
      this.y + this.dY > canvasHeight - Constants.ballRadius ||
      this.y + this.dY < Constants.ballRadius
    ) {
      this.dY = -this.dY;
    }

    this.x += this.dX * deltaTime;
    this.y += this.dY * deltaTime;
  }

  public handlePlayerCollision(player: Player, deltaTime: number) {
    const closestX = Math.max(
      player.x,
      Math.min(this.x, player.x + Constants.playerWidth)
    );
    const closestY = Math.max(
      player.y,
      Math.min(this.y, player.y + Constants.playerHeight)
    );

    const distanceX = this.x - closestX;
    const distanceY = this.y - closestY;

    if (
      distanceX * distanceX + distanceY * distanceY <
      Constants.ballRadius * Constants.ballRadius
    ) {
      const percentage = (this.x - player.x) / Constants.playerWidth;
      this.dX = percentage * this.dXRange - this.dXRange / 2;
      this.dY = -this.dY * deltaTime;
    }
  }

  public handleBrickCollision(brick: Brick, deltaTime: number): boolean {
    const closestX = Math.max(
      brick.x,
      Math.min(this.x, brick.x + Constants.brickWidth)
    );
    const closestY = Math.max(
      brick.y,
      Math.min(this.y, brick.y + Constants.brickHeight)
    );

    const distanceX = this.x - closestX;
    const distanceY = this.y - closestY;

    if (
      distanceX * distanceX + distanceY * distanceY <
      Constants.ballRadius * Constants.ballRadius
    ) {
      const percentage = (this.x - brick.x) / Constants.brickWidth;
      this.dX = percentage * this.dXRange - this.dXRange / 2;
      this.dY = -this.dY;

      this.x += this.dX * deltaTime;
      this.y += this.dY * deltaTime;

      return true;
    }

    return false;
  }
}

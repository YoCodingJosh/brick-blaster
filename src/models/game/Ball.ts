import { Constants } from "./Constants";
import type { Player } from "./Player";

export class Ball {
  x: number;
  y: number;

  dX = Constants.ballSpeed;
  dY = -Constants.ballSpeed;

  readonly dXRange = Constants.ballSpeed * 2;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Constants.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
  }

  public update(deltaTime: number, canvasWidth: number, canvasHeight: number, player: Player) {
    if (this.x + Constants.ballRadius >= player.x &&
      this.x - Constants.ballRadius <= player.x + Constants.playerWidth &&
      this.y + (Constants.ballRadius / 2) >= player.y) {
      // detects where on the paddle the ball has collided
      // and deflects the ball in the appropriate direction
      var percentage = (this.x - player.x) / Constants.playerWidth;
      this.dX = (percentage * this.dXRange) - (this.dXRange / 2);

      this.dY = -this.dY;
    }

    if (this.x + this.dX > canvasWidth - Constants.ballRadius || this.x + this.dX < Constants.ballRadius) {
      this.dX = -this.dX;
    }

    if (this.y + this.dY > canvasHeight - Constants.ballRadius || this.y + this.dY < Constants.ballRadius) {
      this.dY = -this.dY;
    }

    this.x += this.dX;
    this.y += this.dY;
  }
}

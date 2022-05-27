import { Constants } from "./Constants";
import type { Player } from "./Player";

export class Ball {
  x: number;
  y: number;

  dX = Constants.ballSpeed;
  dY = -Constants.ballSpeed;

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
    // TODO: flip dX depending on which side the ball hits
    if (this.y + this.dY + Constants.ballRadius >= player.y + Constants.ballSpeed && this.x + Constants.ballRadius > player.x && this.x + Constants.ballRadius < player.x + Constants.playerWidth) {
      this.dX = (Constants.playerWidth - (this.x - Constants.playerWidth) > Constants.playerWidth / 2) ? -Constants.ballSpeed : Constants.ballSpeed;
      this.dY *= -1;
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

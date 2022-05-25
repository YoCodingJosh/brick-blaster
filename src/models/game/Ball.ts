import { Constants } from "./Constants";

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

  public update(deltaTime: number, canvasWidth: number, canvasHeight: number) {
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
